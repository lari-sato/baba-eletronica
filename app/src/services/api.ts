// URL do computador que executa o backend FastAPI (:8000)
// Android Emulator: 10.0.2.2 acessa o computador host.
// Celular fisico: substituir pelo IP do computador 
export const BACKEND_URL = "http://10.0.2.2:8000";

// IP do ESP32 quando conectada à rede Wi-Fi doméstica
export const ESP32_URL = "http://192.168.68.71"; // IP visto no ultimo log; confirme na placa.

// Rede temporária da ESP32 para configurar o Wi-Fi
export const ESP32_CONFIG_URL = "http://192.168.4.1";
export interface Fase3Diagnostico {
  classe_mais_provavel: string;
  segunda_classe: string;
  prob_classe_1: number;
  prob_classe_2: number;
  diferenca: number;
}

export interface ResultadoBackend {
  fase2: string;
  resultado_final: string;
  prob_fome: number;
  prob_outros: number;
  fase3: Fase3Diagnostico | null;
  confianca: number;
  pre_processamento?: string;
  horario?: string;
  evento_id?: string;
}

// GET /status da ESP32-S3.
export interface StatusESP32 {
  status: string;
  wifiConfigurado?: boolean;
  modelo?: string;
  [chave: string]: unknown;
}

// GET /monitoramento/status 
export interface StatusMonitoramento {
  evento_id?: string;
  status: "aguardando" | "recebido" | "analisando" | "concluido" | "erro";
  horario?: string; 
  atualizado_em?: string;
  erro?: string | null;
  resultado: ResultadoBackend | null;
}

// Consulta direta do estado atual da placa 
export async function consultarStatusESP32(): Promise<StatusESP32> {
  const resposta = await fetch(`${ESP32_URL}/status`, {
    headers: { Accept: "application/json" },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao consultar a ESP32 (HTTP ${resposta.status})`);
  }

  const dados: unknown = await resposta.json();
  if (
    typeof dados !== "object" ||
    dados === null ||
    !("status" in dados) ||
    typeof dados.status !== "string"
  ) {
    throw new Error("Resposta invalida da ESP32");
  }

  return dados as StatusESP32;
}

export async function consultarStatusMonitoramento(): Promise<StatusMonitoramento> {
  const resposta = await fetch(`${BACKEND_URL}/monitoramento/status`, {
    headers: { Accept: "application/json" },
  });

  if (!resposta.ok) {
    throw new Error(`Erro ao consultar o backend (HTTP ${resposta.status})`);
  }

  const dados: StatusMonitoramento = await resposta.json();
  if (!dados || typeof dados.status !== "string") {
    throw new Error("Resposta invalida do backend");
  }

  return dados;
}

export async function consultarEventoMonitoramento(
  eventoId: string
): Promise<StatusMonitoramento> {
  const resposta = await fetch(
    `${BACKEND_URL}/monitoramento/eventos/${encodeURIComponent(eventoId)}`,
    { headers: { Accept: "application/json" } }
  );
  if (!resposta.ok) {
    throw new Error(`Erro ao obter diagnóstico (HTTP ${resposta.status})`);
  }
  return resposta.json();
}

export async function configurarWifiESP32(ssid: string, password: string) {
  const resposta = await fetch(`${ESP32_CONFIG_URL}/wifi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ssid, password }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.erro || "Erro ao configurar Wi-Fi");
  }

  return dados;
}
