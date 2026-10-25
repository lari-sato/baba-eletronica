// Armazena em memória qual evento o usuário selecionou na notificação.
let eventoPendente: string | null = null;

export function definirEventoPendente(id: string) {
  eventoPendente = id;
}

export function obterEventoPendente() {
  return eventoPendente;
}

export function limparEventoPendente(id: string) {
  if (eventoPendente === id) eventoPendente = null;
}
