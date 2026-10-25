import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { BACKEND_URL } from "./api";
import { definirEventoPendente } from "./eventoPendente";
import { obterSessao } from "./configuracaoInicial";

// Precisa coincidir com backend/notificacoes.py.
export const CANAL_CHORO = "alertas-choro-v3";

// Mostra a notificação também quando o aplicativo está aberto.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let tokenEmMemoria: string | null = null;

export async function obterTokenPush(): Promise<string> {
  if (Platform.OS !== "android" || !Device.isDevice) {
    throw new Error("As notificações exigem um celular Android físico."); // Alerta para testes em emuladores. 
  }
  const permissao = await Notifications.getPermissionsAsync();
  if (!permissao.granted) {
    throw new Error("Autorize as notificações do Luz e Colo no Android.");
  }
  if (tokenEmMemoria) return tokenEmMemoria;

  const projectId =
    Constants.expoConfig?.extra?.eas?.projectId ??
    Constants.easConfig?.projectId;
  if (!projectId) {
    throw new Error("Push: configure o projeto EAS (eas init).");
  }
  const { data: token } = await Notifications.getExpoPushTokenAsync({
    projectId,
  });
  tokenEmMemoria = token;
  return token;
}

export async function registrarCelularPush() {
  if (Platform.OS !== "android" || !Device.isDevice) {
    console.log("Push: utilize um celular Android físico para testar.");
    return;
  }

  await Notifications.setNotificationChannelAsync(CANAL_CHORO, {
    name: "Alertas de choro",
    importance: Notifications.AndroidImportance.MAX,
    enableVibrate: true,
    vibrationPattern: [0, 850, 200, 850, 200, 900],
    lockscreenVisibility:
      Notifications.AndroidNotificationVisibility.PUBLIC,
  });

  let { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    const solicitacao = await Notifications.requestPermissionsAsync();
    status = solicitacao.status;
  }
  if (status !== "granted") {
    console.warn("Push: usuário não autorizou notificações.");
    return;
  }

  const token = await obterTokenPush();

  const resposta = await fetch(`${BACKEND_URL}/push/registrar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!resposta.ok) {
    throw new Error(`Push: erro ao registrar token (HTTP ${resposta.status}).`);
  }
  console.log("Push: celular cadastrado no backend.");
}

// Ao sair da conta, deixa de enviar alertas para este celular.
export async function cancelarRegistroPush(): Promise<void> {
  if (Platform.OS !== "android" || !Device.isDevice) return;
  const permissao = await Notifications.getPermissionsAsync();
  if (!permissao.granted) return;
  const token = await obterTokenPush();
  const resposta = await fetch(`${BACKEND_URL}/push/cancelar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  if (!resposta.ok) {
    throw new Error(`Não foi possível cancelar as notificações (HTTP ${resposta.status}).`);
  }
}

function guardarResposta(response: Notifications.NotificationResponse) {
  if (response.actionIdentifier !== Notifications.DEFAULT_ACTION_IDENTIFIER) {
    return;
  }
  const dados = response.notification.request.content.data;
  if (dados?.tipo !== "diagnostico") return;
  const eventoId = dados?.evento_id;
  if (typeof eventoId === "string" && /^[A-Za-z0-9_-]{3,90}$/.test(eventoId)) {
    // O Monitor abre o diagnóstico quando o usuário toca na notificação. 
    definirEventoPendente(eventoId);
  }
}

export function iniciarNotificacoes() {
  obterSessao()
    .then((sessao) => {
      if (sessao) return registrarCelularPush();
    })
    .catch((erro) => console.warn("Push:", erro));

  const respostaListener =
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      guardarResposta(resposta);
      Notifications.clearLastNotificationResponseAsync().catch(console.warn);
    });

  Notifications.getLastNotificationResponseAsync()
    .then((resposta) => {
      if (!resposta) return;
      guardarResposta(resposta);
      return Notifications.clearLastNotificationResponseAsync();
    })
    .catch((erro) => console.warn("Push ao iniciar:", erro));

  return () => respostaListener.remove();
}
