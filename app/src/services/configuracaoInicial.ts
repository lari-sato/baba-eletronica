import * as FileSystem from "expo-file-system/legacy";

// Dados locais de interface. Nao armazena senha nem token de acesso.
export type SessaoUsuario = { nome: string };

const SESSAO = "luz_e_colo_sessao.json";

function arquivo(nome: string): string {
  if (!FileSystem.documentDirectory) {
    throw new Error("Armazenamento local indisponível.");
  }
  return `${FileSystem.documentDirectory}${nome}`;
}

export async function obterSessao(): Promise<SessaoUsuario | null> {
  try {
    const conteudo = await FileSystem.readAsStringAsync(arquivo(SESSAO));
    const sessao: unknown = JSON.parse(conteudo);
    if (
      typeof sessao === "object" &&
      sessao !== null &&
      "nome" in sessao &&
      typeof sessao.nome === "string" &&
      sessao.nome.trim().length > 0
    ) {
      return { nome: sessao.nome.trim() };
    }
  } catch {
    // Primeiro acesso, sessão encerrada ou arquivo inexistente.
  }
  return null;
}

export async function salvarSessao(nome: string): Promise<void> {
  const nomeTratado = nome.trim();
  if (!nomeTratado) throw new Error("Informe o nome do usuário.");
  await FileSystem.writeAsStringAsync(
    arquivo(SESSAO),
    JSON.stringify({ nome: nomeTratado })
  );
}

export async function removerSessao(): Promise<void> {
  await FileSystem.deleteAsync(arquivo(SESSAO), { idempotent: true });
}
