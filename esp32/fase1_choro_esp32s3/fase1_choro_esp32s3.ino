// =========================================================
// BABÁ ELETRÔNICA: ESP32-S3 + MAX9814 + FASE 1 EMBARCADA

#include <WiFi.h>
#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <Preferences.h>
#include <math.h>

// =========================================================
// HEADERS GERADOS NO COLAB
// =========================================================

#include "modelo_fase1_sem_mfcc_int8.h"
#include "scaler_fase1_sem_mfcc.h"

// TensorFlow Lite Micro
#include "tensorflow/lite/micro/micro_interpreter.h"
#include "tensorflow/lite/micro/micro_mutable_op_resolver.h"
#include "tensorflow/lite/schema/schema_generated.h"

// =========================================================
// CONFIGURAÇÕES DO WI-FI
// =========================================================

WebServer server(80);
Preferences preferences;

bool wifiConfigurado = false;

const char* redeEsp32 = "ESP32-S3-Config";
const char* senhaEsp32 = "esp32config";

IPAddress ipEsp32(192, 168, 4, 1);
IPAddress gatewayEsp32(192, 168, 4, 1);
IPAddress mascaraEsp32(255, 255, 255, 0);

// =========================================================
// CONFIGURAÇÕES DO MICROFONE MAX9814
// =========================================================

// Ajuste conforme o pino ADC usado na ESP32-S3.
// No codigo_completo estava como GPIO 4.
// Se o MAX9814 estiver ligado em outro ADC, altere aqui.
const int pinoMicrofone = 4;

// ADC do ESP32-S3: 0 a 4095.
// O sinal é centralizado em torno de 2048.
const int ADC_CENTRO = 2048;

// Captura de áudio para a Fase 1 sem MFCC
const int SAMPLE_RATE = 16000;
const int DURACAO_SEGUNDOS = 1;
const int NUM_AMOSTRAS = SAMPLE_RATE * DURACAO_SEGUNDOS;

// Buffer de áudio: 16000 amostras x 2 bytes = 32 KB
int16_t audioBuffer[NUM_AMOSTRAS];

// Limiar simples para evitar rodar IA no silêncio.
// Pode precisar de ajuste no teste real.
float LIMIAR_ENERGIA = 80.0;

// Features iguais ao Colab:7 globais + 10 RMS por segmento + 9 diferenças = 26 features
const int NUM_SEGMENTOS = 10;

// =========================================================
// VARIÁVEIS DE STATUS
// =========================================================

int valorMic = 0;
String som = "sem leitura";
float probChoroAtual = 0.0;
float energiaAtual = 0.0;
bool audioDisponivel = false;

// =========================================================
// TENSORFLOW LITE MICRO
// =========================================================

const tflite::Model* model = nullptr;
tflite::MicroInterpreter* interpreter = nullptr;
TfLiteTensor* input = nullptr;
TfLiteTensor* output = nullptr;

// Para modelo Dense pequeno, 40 KB geralmente é suficiente.
// Se AllocateTensors falhar, aumentar para 60 * 1024 ou 80 * 1024.
constexpr int kTensorArenaSize = 60 * 1024;
uint8_t tensor_arena[kTensorArenaSize];

// =========================================================
// WI-FI CONFIGURÁVEL
// =========================================================

void iniciarRedeConfiguracao() {
  WiFi.mode(WIFI_AP);
  WiFi.softAPConfig(ipEsp32, gatewayEsp32, mascaraEsp32);
  WiFi.softAP(redeEsp32, senhaEsp32);

  Serial.println("Modo de configuracao Wi-Fi ativo.");
  Serial.print("Rede: ");
  Serial.println(redeEsp32);
  Serial.print("Senha: ");
  Serial.println(senhaEsp32);
  Serial.print("IP: ");
  Serial.println(WiFi.softAPIP());
}

bool conectarWiFi(const String& ssid, const String& password) {
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), password.c_str());

  Serial.print("Conectando ao Wi-Fi");

  const unsigned long inicio = millis();

  while (WiFi.status() != WL_CONNECTED && millis() - inicio < 15000) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();

  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("Falha ao conectar ao Wi-Fi.");
    return false;
  }

  Serial.print("Rede Wi-Fi conectada: ");
  Serial.println(WiFi.SSID());
  Serial.print("IP da rede Wi-Fi: ");
  Serial.println(WiFi.localIP());

  return true;
}

bool extrairCampoJson(const String& json, const String& campo, String& valor) {
  const String chave = "\"" + campo + "\"";

  int inicio = json.indexOf(chave);

  if (inicio < 0) {
    return false;
  }

  inicio = json.indexOf(':', inicio + chave.length());

  if (inicio < 0) {
    return false;
  }

  inicio = json.indexOf('"', inicio + 1);

  if (inicio < 0) {
    return false;
  }

  valor = "";
  bool escapado = false;

  for (int indice = inicio + 1; indice < json.length(); indice++) {
    const char caractere = json[indice];

    if (escapado) {
      valor += caractere;
      escapado = false;
    } else if (caractere == '\\') {
      escapado = true;
    } else if (caractere == '"') {
      return true;
    } else {
      valor += caractere;
    }
  }

  return false;
}

void handleWifiConfig() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"erro\":\"Envie um JSON com ssid e password\"}");
    return;
  }

  String novoSsid;
  String novaSenha;
  const String json = server.arg("plain");

  if (!extrairCampoJson(json, "ssid", novoSsid) || !extrairCampoJson(json, "password", novaSenha)) {
    server.send(400, "application/json", "{\"erro\":\"JSON invalido ou campos ausentes\"}");
    return;
  }

  if (novoSsid.isEmpty()) {
    server.send(400, "application/json", "{\"erro\":\"ssid nao pode ser vazio\"}");
    return;
  }

  preferences.begin("wifi", false);
  preferences.putString("ssid", novoSsid);
  preferences.putString("password", novaSenha);
  preferences.end();

  server.send(200, "application/json", "{\"mensagem\":\"Credenciais salvas. Reiniciando...\"}");

  delay(1000);
  ESP.restart();
}

void handleWifiReset() {
  preferences.begin("wifi", false);
  preferences.clear();
  preferences.end();

  server.send(200, "application/json", "{\"mensagem\":\"Credenciais apagadas. Reiniciando em modo configuracao...\"}");

  delay(1000);
  ESP.restart();
}

// =========================================================
// SERVIDOR WEB
// =========================================================

void escreverCabecalhoWav(uint8_t* header, uint32_t sampleRate, uint16_t bitsPerSample, uint16_t channels, uint32_t dataSize) {
  uint32_t byteRate = sampleRate * channels * bitsPerSample / 8;
  uint16_t blockAlign = channels * bitsPerSample / 8;
  uint32_t chunkSize = 36 + dataSize;

  header[0] = 'R'; header[1] = 'I'; header[2] = 'F'; header[3] = 'F';
  header[4] = chunkSize & 0xff;
  header[5] = (chunkSize >> 8) & 0xff;
  header[6] = (chunkSize >> 16) & 0xff;
  header[7] = (chunkSize >> 24) & 0xff;
  header[8] = 'W'; header[9] = 'A'; header[10] = 'V'; header[11] = 'E';

  header[12] = 'f'; header[13] = 'm'; header[14] = 't'; header[15] = ' ';
  header[16] = 16; header[17] = 0; header[18] = 0; header[19] = 0;
  header[20] = 1; header[21] = 0;
  header[22] = channels & 0xff;
  header[23] = (channels >> 8) & 0xff;
  header[24] = sampleRate & 0xff;
  header[25] = (sampleRate >> 8) & 0xff;
  header[26] = (sampleRate >> 16) & 0xff;
  header[27] = (sampleRate >> 24) & 0xff;
  header[28] = byteRate & 0xff;
  header[29] = (byteRate >> 8) & 0xff;
  header[30] = (byteRate >> 16) & 0xff;
  header[31] = (byteRate >> 24) & 0xff;
  header[32] = blockAlign & 0xff;
  header[33] = (blockAlign >> 8) & 0xff;
  header[34] = bitsPerSample & 0xff;
  header[35] = (bitsPerSample >> 8) & 0xff;

  header[36] = 'd'; header[37] = 'a'; header[38] = 't'; header[39] = 'a';
  header[40] = dataSize & 0xff;
  header[41] = (dataSize >> 8) & 0xff;
  header[42] = (dataSize >> 16) & 0xff;
  header[43] = (dataSize >> 24) & 0xff;
}

int16_t limitarInt16(int32_t valor) {
  if (valor > 32767) return 32767;
  if (valor < -32768) return -32768;
  return (int16_t)valor;
}

void handleAudio() {
  if (!audioDisponivel) {
    server.send(503, "application/json", "{\"erro\":\"audio ainda nao disponivel\"}");
    return;
  }

  const uint16_t channels = 1;
  const uint16_t bitsPerSample = 16;
  const uint32_t dataSize = NUM_AMOSTRAS * sizeof(int16_t);
  const uint32_t totalSize = 44 + dataSize;

  uint8_t header[44];
  escreverCabecalhoWav(header, SAMPLE_RATE, bitsPerSample, channels, dataSize);

  server.sendHeader("Content-Disposition", "attachment; filename=audio_choro.wav");
  server.setContentLength(totalSize);
  server.send(200, "audio/wav", "");

  WiFiClient client = server.client();
  client.write(header, 44);

  const int GANHO_WAV = 16;
  const int AMOSTRAS_POR_BLOCO = 256;
  uint8_t bloco[AMOSTRAS_POR_BLOCO * 2];

  for (int i = 0; i < NUM_AMOSTRAS; i += AMOSTRAS_POR_BLOCO) {
    int qtd = AMOSTRAS_POR_BLOCO;

    if (i + qtd > NUM_AMOSTRAS) {
      qtd = NUM_AMOSTRAS - i;
    }

    for (int j = 0; j < qtd; j++) {
      int16_t amostra = limitarInt16((int32_t)audioBuffer[i + j] * GANHO_WAV);
      bloco[2 * j] = amostra & 0xff;
      bloco[2 * j + 1] = (amostra >> 8) & 0xff;
    }

    client.write(bloco, qtd * 2);
  }
}

void handleRoot() {
  String html = "";
  html += "<html>";
  html += "<head>";
  html += "<meta charset='UTF-8'>";
  html += "<meta http-equiv='refresh' content='2'>";
  html += "</head>";
  html += "<body>";
  html += "<h2>Baba Eletronica - ESP32-S3</h2>";

  if (wifiConfigurado) {
    html += "<p><b>Wi-Fi:</b> conectado</p>";
    html += "<p><b>Rede:</b> " + WiFi.SSID() + "</p>";
    html += "<p><b>IP:</b> " + WiFi.localIP().toString() + "</p>";
  } else {
    html += "<p><b>Wi-Fi:</b> modo configuracao</p>";
    html += "<p>Conecte na rede ESP32-S3-Config e envie POST /wifi com ssid e password.</p>";
  }

  html += "<p><b>Status:</b> " + som + "</p>";
  html += "<p><b>Valor atual do microfone:</b> " + String(valorMic) + "</p>";
  html += "<p><b>Energia do audio:</b> " + String(energiaAtual, 2) + "</p>";
  html += "<p><b>Probabilidade de choro:</b> " + String(probChoroAtual * 100.0, 1) + "%</p>";
  html += "<p><b>Modelo:</b> Fase 1 sem MFCC - features simples</p>";
  html += "<p><b>Audio:</b> <a href='/audio'>baixar ultimo audio captado</a></p>";
  html += "</body>";
  html += "</html>";

  server.send(200, "text/html", html);
}

void handleStatus() {
  String json = "{";
  json += "\"status\":\"" + som + "\",";
  json += "\"valorMic\":" + String(valorMic) + ",";
  json += "\"energia\":" + String(energiaAtual, 2) + ",";
  json += "\"probChoro\":" + String(probChoroAtual, 4) + ",";
  json += "\"modelo\":\"fase1_sem_mfcc\",";
  json += "\"wifiConfigurado\":" + String(wifiConfigurado ? "true" : "false") + ",";
  json += "\"audioDisponivel\":" + String(audioDisponivel ? "true" : "false");
  json += "}";

  server.send(200, "application/json", json);
}

void handleNotFound() {
  String message = "Arquivo nao encontrado\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMetodo: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArgumentos: ";
  message += server.args();
  message += "\n";

  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }

  server.send(404, "text/plain", message);
}

// =========================================================
// INICIALIZAÇÃO DO MODELO
// =========================================================

void iniciarModelo() {
  Serial.println("Carregando modelo Fase 1 sem MFCC...");

  model = tflite::GetModel(modelo_fase1_sem_mfcc_int8);

  if (model->version() != TFLITE_SCHEMA_VERSION) {
    Serial.println("ERRO: versao do modelo TFLite incompativel.");
    return;
  }

  static tflite::MicroMutableOpResolver<8> resolver;

  resolver.AddFullyConnected();
  resolver.AddLogistic();
  resolver.AddReshape();
  resolver.AddQuantize();
  resolver.AddDequantize();

  static tflite::MicroInterpreter static_interpreter(
    model,
    resolver,
    tensor_arena,
    kTensorArenaSize
  );

  interpreter = &static_interpreter;

  TfLiteStatus allocate_status = interpreter->AllocateTensors();

  if (allocate_status != kTfLiteOk) {
    Serial.println("ERRO: falha ao alocar tensores.");
    Serial.println("Tente aumentar kTensorArenaSize para 80 * 1024.");
    return;
  }

  input = interpreter->input(0);
  output = interpreter->output(0);

  Serial.println("Modelo carregado com sucesso.");

  Serial.print("Formato da entrada: ");
  for (int i = 0; i < input->dims->size; i++) {
    Serial.print(input->dims->data[i]);
    Serial.print(" ");
  }
  Serial.println();

  Serial.print("Bytes da entrada: ");
  Serial.println(input->bytes);

  Serial.print("Formato da saida: ");
  for (int i = 0; i < output->dims->size; i++) {
    Serial.print(output->dims->data[i]);
    Serial.print(" ");
  }
  Serial.println();

  Serial.print("Bytes da saida: ");
  Serial.println(output->bytes);
}

// =========================================================
// CAPTURA DE ÁUDIO PELO MAX9814
// =========================================================

void capturarAudio() {
  unsigned long intervaloMicros = 1000000 / SAMPLE_RATE;
  unsigned long proximaLeitura = micros();

  for (int i = 0; i < NUM_AMOSTRAS; i++) {
    while (micros() < proximaLeitura) {
      // aguarda próxima amostra
    }

    int leitura = analogRead(pinoMicrofone);
    valorMic = leitura;

    // Centraliza em torno de zero
    audioBuffer[i] = leitura - ADC_CENTRO;

    proximaLeitura += intervaloMicros;
  }

  audioDisponivel = true;
}

// =========================================================
// CÁLCULO DE ENERGIA DO ÁUDIO
// =========================================================

float calcularEnergia() {
  double soma = 0.0;

  for (int i = 0; i < NUM_AMOSTRAS; i++) {
    soma += abs(audioBuffer[i]);
  }

  return soma / NUM_AMOSTRAS;
}

// =========================================================
// EXTRAÇÃO DE FEATURES SIMPLES
// =========================================================

float normalizarAmostra(int16_t amostra) {
  float valor = (float)amostra / (float)ADC_CENTRO;

  if (valor > 1.0) valor = 1.0;
  if (valor < -1.0) valor = -1.0;

  return valor;
}

int sinalAmostra(float valor) {
  if (valor > 0.0) return 1;
  if (valor < 0.0) return -1;
  return 0;
}

void extrairFeaturesSimples(float features[NUM_FEATURES]) {
  double somaAbs = 0.0;
  double soma = 0.0;
  double somaQuadrados = 0.0;

  float maxAbs = 0.0;
  float valorMin = 9999.0;
  float valorMax = -9999.0;

  int cruzamentosZero = 0;

  float valorAnterior = normalizarAmostra(audioBuffer[0]);
  int sinalAnterior = sinalAmostra(valorAnterior);

  for (int i = 0; i < NUM_AMOSTRAS; i++) {
    float valor = normalizarAmostra(audioBuffer[i]);

    float absValor = fabs(valor);

    somaAbs += absValor;
    soma += valor;
    somaQuadrados += valor * valor;

    if (absValor > maxAbs) {
      maxAbs = absValor;
    }

    if (valor < valorMin) {
      valorMin = valor;
    }

    if (valor > valorMax) {
      valorMax = valor;
    }

    if (i > 0) {
      int sinalAtual = sinalAmostra(valor);

      if (sinalAtual != sinalAnterior) {
        cruzamentosZero++;
      }

      sinalAnterior = sinalAtual;
    }
  }

  float mediaAbs = somaAbs / NUM_AMOSTRAS;
  float media = soma / NUM_AMOSTRAS;
  float mediaQuadrados = somaQuadrados / NUM_AMOSTRAS;

  float variancia = mediaQuadrados - (media * media);

  if (variancia < 0.0) {
    variancia = 0.0;
  }

  float desvioPadrao = sqrt(variancia);
  float rms = sqrt(mediaQuadrados);
  float energia = mediaQuadrados;
  float picoAPico = valorMax - valorMin;
  float zcr = (float)cruzamentosZero / (float)(NUM_AMOSTRAS - 1);

  features[0] = mediaAbs;
  features[1] = maxAbs;
  features[2] = desvioPadrao;
  features[3] = rms;
  features[4] = energia;
  features[5] = picoAPico;
  features[6] = zcr;

  float rmsSegmentos[NUM_SEGMENTOS];

  for (int s = 0; s < NUM_SEGMENTOS; s++) {
    int inicio = (s * NUM_AMOSTRAS) / NUM_SEGMENTOS;
    int fim = ((s + 1) * NUM_AMOSTRAS) / NUM_SEGMENTOS;

    double somaSegmento = 0.0;
    int totalSegmento = fim - inicio;

    for (int i = inicio; i < fim; i++) {
      float valor = normalizarAmostra(audioBuffer[i]);
      somaSegmento += valor * valor;
    }

    rmsSegmentos[s] = sqrt(somaSegmento / totalSegmento);
    features[7 + s] = rmsSegmentos[s];
  }

  for (int s = 0; s < NUM_SEGMENTOS - 1; s++) {
    features[17 + s] = fabs(rmsSegmentos[s + 1] - rmsSegmentos[s]);
  }
}

// =========================================================
// PREPARAÇÃO DA ENTRADA DO MODELO
// features -> StandardScaler -> quantização INT8
// =========================================================

void prepararEntradaModeloFeatures() {
  if (input == nullptr) {
    return;
  }

  float features[NUM_FEATURES];

  extrairFeaturesSimples(features);

  int limite = NUM_FEATURES;

  if (input->bytes < NUM_FEATURES) {
    limite = input->bytes;
  }

  for (int i = 0; i < limite; i++) {
    float scale = scaler_scale[i];

    if (scale == 0.0) {
      scale = 1.0;
    }

    float valorNormalizado = (features[i] - scaler_mean[i]) / scale;

    if (input->type == kTfLiteInt8) {
      int valorQuantizado = round(valorNormalizado / input->params.scale + input->params.zero_point);

      if (valorQuantizado < -128) valorQuantizado = -128;
      if (valorQuantizado > 127) valorQuantizado = 127;

      input->data.int8[i] = (int8_t)valorQuantizado;
    } else if (input->type == kTfLiteFloat32) {
      input->data.f[i] = valorNormalizado;
    }
  }
}

// =========================================================
// RODAR INFERÊNCIA DA FASE 1
// =========================================================

float rodarInferenciaFase1() {
  if (interpreter == nullptr || input == nullptr || output == nullptr) {
    Serial.println("ERRO: modelo nao inicializado.");
    return 0.0;
  }

  prepararEntradaModeloFeatures();

  TfLiteStatus invoke_status = interpreter->Invoke();

  if (invoke_status != kTfLiteOk) {
    Serial.println("ERRO: falha ao executar inferencia.");
    return 0.0;
  }

  float probChoro = 0.0;

  if (output->type == kTfLiteInt8) {
    int8_t saidaInt8 = output->data.int8[0];
    probChoro = (saidaInt8 - output->params.zero_point) * output->params.scale;
  } else if (output->type == kTfLiteFloat32) {
    probChoro = output->data.f[0];
  }

  if (probChoro < 0.0) probChoro = 0.0;
  if (probChoro > 1.0) probChoro = 1.0;

  return probChoro;
}

// =========================================================
// SETUP
// =========================================================

void setup() {
  Serial.begin(115200);
  delay(2000);

  Serial.println();
  Serial.println("Iniciando Baba Eletronica no ESP32-S3...");

  pinMode(pinoMicrofone, INPUT);

  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);

  iniciarModelo();

  preferences.begin("wifi", true);
  const String ssidSalvo = preferences.getString("ssid", "");
  const String passwordSalvo = preferences.getString("password", "");
  preferences.end();

  if (!ssidSalvo.isEmpty() && conectarWiFi(ssidSalvo, passwordSalvo)) {
    wifiConfigurado = true;

    if (MDNS.begin("esp32-s3")) {
      Serial.println("mDNS iniciado: esp32-s3.local");
    }
  } else {
    wifiConfigurado = false;
    iniciarRedeConfiguracao();
  }

  server.on("/", handleRoot);
  server.on("/status", handleStatus);
  server.on("/audio", HTTP_GET, handleAudio);
  server.on("/wifi", HTTP_POST, handleWifiConfig);
  server.on("/wifi/reset", HTTP_POST, handleWifiReset);
  server.onNotFound(handleNotFound);

  server.begin();

  Serial.println("Servidor HTTP iniciado.");
}

// =========================================================
// LOOP PRINCIPAL
// =========================================================

void loop() {
  server.handleClient();

  capturarAudio();

  energiaAtual = calcularEnergia();

  Serial.println("----------------------------------------");
  Serial.print("Valor atual do microfone: ");
  Serial.println(valorMic);

  Serial.print("Energia do audio: ");
  Serial.println(energiaAtual, 2);

  if (energiaAtual < LIMIAR_ENERGIA) {
    som = "sem som";
    probChoroAtual = 0.0;

    Serial.println("Status: sem som");
  } else {
    Serial.println("Som detectado. Rodando modelo Fase 1 sem MFCC...");

    probChoroAtual = rodarInferenciaFase1();

    Serial.print("Probabilidade de choro: ");
    Serial.println(probChoroAtual, 4);

    if (probChoroAtual >= 0.50) {
      som = "bebe chorando";
      Serial.println("Status: bebe chorando");
    } else {
      som = "ruido ambiental";
      Serial.println("Status: ruido ambiental");
    }
  }

  delay(500);
}
