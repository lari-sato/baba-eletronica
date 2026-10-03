import * as FileSystem from "expo-file-system";

const ESP32_URL = "http://192.168.0.50";
const BACKEND_URL = "http://192.168.0.25:8000";
const ESP32_CONFIG_URL = "http://192.168.4.1";

export async function consultarStatusESP32() {
  const resposta = await fetch(`${ESP32_URL}/status`);

  if (!resposta.ok) {
    throw new Error("Erro ao consultar status da ESP32");
  }

  return await resposta.json();
}

export async function baixarAudioESP32() {
  const destino = FileSystem.cacheDirectory + "audio_choro.wav";

  const download = await FileSystem.downloadAsync(
    `${ESP32_URL}/audio`,
    destino
  );

  if (download.status !== 200) {
    throw new Error("Erro ao baixar áudio da ESP32");
  }

  return download.uri;
}

export async function enviarAudioParaBackend(uriDoAudio: string) {
  const formData = new FormData();

  formData.append("file", {
    uri: uriDoAudio,
    name: "audio_choro.wav",
    type: "audio/wav",
  } as any);

  const resposta = await fetch(`${BACKEND_URL}/classificar`, {
    method: "POST",
    body: formData,
  });

  if (!resposta.ok) {
    throw new Error("Erro ao enviar áudio para o backend");
  }

  return await resposta.json();
}

export async function configurarWifiESP32(ssid: string, password: string) {
  const resposta = await fetch(`${ESP32_CONFIG_URL}/wifi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ssid,
      password,
    }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Erro ao configurar Wi-Fi");
  }

  return dados;
}