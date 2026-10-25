import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import * as Localization from "expo-localization";
import { useFocusEffect } from "@react-navigation/native";

import { Nav } from "../../../components/navBar/navBar";
import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { styles } from "./styles";
import {
  consultarStatusESP32,
  consultarStatusMonitoramento,
  consultarEventoMonitoramento,
  type StatusESP32,
  type ResultadoBackend,
  type StatusMonitoramento,
} from "../../../services/api";
import { obterEventoPendente, limparEventoPendente } from "../../../services/eventoPendente";

const TEXTO_MONITORAMENTO = "Monitorando o ambiente...";
const DETALHE_MONITORAMENTO = "Consultando status da ESP32...";
const TEXTO_CHORO = "Choro identificado.\nAnalisando possível causa...";
const INTERVALO_CONSULTA_MS = 3000;
const TEMPO_ANALISE_DEMORADA_MS = 120000;
const TEMPO_ERRO_VISIVEL_MS = 6000;

export default function Monitor({ navigation }: any) {
  const [mensagemPrincipal, setMensagemPrincipal] = useState(TEXTO_MONITORAMENTO);
  const [mensagemDetalhe, setMensagemDetalhe] = useState(DETALHE_MONITORAMENTO);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  // Evita abrir o mesmo resultado mais de uma vez.
  const ultimoEventoExibidoRef = useRef<string | null>(null);
  const primeiraConsultaBackendRef = useRef(true);

  // Uma vez detectado o choro, apenas a resposta do backend encerra a análise.
  const aguardandoBackendRef = useRef(false);
  const eventoEmAnaliseRef = useRef<string | null>(null);
  const inicioAnaliseRef = useRef<number | null>(null);

  // Evita considerar várias leituras consecutivas do mesmo choro como eventos novos.
  const choroAnteriorRef = useRef(false);
  const erroVisivelAteRef = useRef(0);

  function mostrarChoro(detalhe = "Isso pode levar alguns segundos. Por favor, aguarde.") {
    setMensagemPrincipal(TEXTO_CHORO);
    setMensagemDetalhe(detalhe);
    setCarregando(true);
    setErro("");
  }

  function mostrarEstadoDaPlaca(placa: StatusESP32) {
    const estado = placa.status
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

    if (estado === "bebe chorando") {
      // A ESP32 detecta o choro. A classificação ocorre no FastAPI.
      if (!choroAnteriorRef.current && !aguardandoBackendRef.current) {
        aguardandoBackendRef.current = true;
        inicioAnaliseRef.current = Date.now();
        mostrarChoro();
      }
      choroAnteriorRef.current = true;
      return;
    }

    choroAnteriorRef.current = false;

    // Silêncio ou ruído após o choro NÃO encerram a análise em andamento.
    if (aguardandoBackendRef.current || Date.now() < erroVisivelAteRef.current) return;

    if (estado === "sem som" || estado === "ruido ambiental") {
      setMensagemPrincipal("Nenhum choro detectado.");
      setMensagemDetalhe(
        estado === "sem som"
          ? "Status da ESP32: sem som."
          : "Status da ESP32: ruído ambiental."
      );
      setCarregando(false);
      setErro("");
    } else {
      setMensagemPrincipal(TEXTO_MONITORAMENTO);
      setMensagemDetalhe(
        estado === "sem leitura"
          ? DETALHE_MONITORAMENTO
          : `Status da ESP32: ${placa.status}.`
      );
      setCarregando(true);
      setErro("");
    }
  }

  function formatarHorario(horarioISO?: string): string {
    if (!horarioISO) return "--:--";
    const data = new Date(horarioISO);
    if (Number.isNaN(data.getTime())) return "--:--";

    const timeZone =
      Localization.getCalendars()[0]?.timeZone ?? "America/Sao_Paulo";

    return data.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
  }

  function navegarParaResultado(resultadoBackend: ResultadoBackend) {
    const resultado = resultadoBackend.resultado_final
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const params = { resultadoBackend };

    if (resultado.includes(" ou ")) {
      navigation.navigate("PossibleResults", params);
    } else if (resultado.includes("fome")) {
      navigation.navigate("Hungry", params);
    } else if (resultado.includes("dor")) {
      navigation.navigate("Pain", params);
    } else if (resultado.includes("desconforto")) {
      navigation.navigate("Discomfort", params);
    } else if (resultado.includes("cansaco") || resultado.includes("sono")) {
      navigation.navigate("Sleepy", params);
    } else {
      navigation.navigate("Undefined", params);
    }
  }

  useFocusEffect(
    useCallback(() => {
      let telaAtiva = true;
      let consultandoPlaca = false;
      let consultandoBackend = false;
      let consultandoNotificacao = false;
      let redirecionou = false;

      primeiraConsultaBackendRef.current = true;
      aguardandoBackendRef.current = false;
      eventoEmAnaliseRef.current = null;
      inicioAnaliseRef.current = null;
      choroAnteriorRef.current = false;
      erroVisivelAteRef.current = 0;

      setMensagemPrincipal(TEXTO_MONITORAMENTO);
      setMensagemDetalhe(DETALHE_MONITORAMENTO);
      setCarregando(true);
      setErro("");

      // A ESP32 fornece os estados sonoros: sem som, ruído ou bebê chorando.
      async function verificarESP32() {
        if (!telaAtiva || consultandoPlaca || redirecionou) return;
        consultandoPlaca = true;
        try {
          const placa = await consultarStatusESP32();
          if (!telaAtiva || redirecionou) return;
          console.log("Status ESP32:", placa.status);
          mostrarEstadoDaPlaca(placa);
        } catch (falha) {
          if (!telaAtiva || redirecionou) return;
          console.warn("Falha ao consultar ESP32:", falha);
          if (!aguardandoBackendRef.current && Date.now() >= erroVisivelAteRef.current) {
            setMensagemPrincipal(TEXTO_MONITORAMENTO);
            setMensagemDetalhe("Não foi possível consultar o status da ESP32.");
            setCarregando(true);
            setErro("Verifique a conexão com a placa.");
          }
        } finally {
          consultandoPlaca = false;
        }
      }

      async function verificarBackend() {
        if (!telaAtiva || consultandoBackend || redirecionou) return;
        consultandoBackend = true;
        try {
          let evento: StatusMonitoramento = await consultarStatusMonitoramento();
          if (!telaAtiva || redirecionou) return;

          const idAcompanhado = eventoEmAnaliseRef.current;
          if (idAcompanhado && evento.evento_id !== idAcompanhado) {
            evento = await consultarEventoMonitoramento(idAcompanhado);
            evento = { ...evento, evento_id: idAcompanhado };
            if (!telaAtiva || redirecionou) return;
          }

          const { evento_id: id, status } = evento;
          console.log("Status backend:", id, status);

          if (primeiraConsultaBackendRef.current) {
            primeiraConsultaBackendRef.current = false;
            if (id && (status === "concluido" || status === "erro")) {
              ultimoEventoExibidoRef.current = id;
              return;
            }
          }

          if (!id || status === "aguardando") {
            return;
          }
          if (id === ultimoEventoExibidoRef.current) return;

          if (status === "recebido" || status === "analisando") {
            aguardandoBackendRef.current = true;
            eventoEmAnaliseRef.current = id;
            if (inicioAnaliseRef.current === null) inicioAnaliseRef.current = Date.now();

            const demorando = Date.now() - inicioAnaliseRef.current > TEMPO_ANALISE_DEMORADA_MS;
            mostrarChoro(
              demorando
                ? "A análise está demorando. Aguardando resposta do backend..."
                : status === "recebido"
                ? "Áudio recebido. Iniciando a análise..."
                : "Isso pode levar alguns segundos. Por favor, aguarde."
            );
            return;
          }

          if (status === "erro") {
            ultimoEventoExibidoRef.current = id;
            aguardandoBackendRef.current = false;
            eventoEmAnaliseRef.current = null;
            inicioAnaliseRef.current = null;
            erroVisivelAteRef.current = Date.now() + TEMPO_ERRO_VISIVEL_MS;
            setMensagemPrincipal("Não foi possível concluir a análise.");
            setMensagemDetalhe(evento.erro || "Aguardando nova detecção.");
            setCarregando(false);
            setErro("");
            return;
          }

          if (status === "concluido") {
            if (!evento.resultado?.resultado_final) {
              mostrarChoro("Diagnóstico concluído sem resultado válido. Verifique o backend.");
              return;
            }
            ultimoEventoExibidoRef.current = id;
            aguardandoBackendRef.current = false;
            eventoEmAnaliseRef.current = null;
            inicioAnaliseRef.current = null;
            redirecionou = true;
            setCarregando(false);
            navegarParaResultado({
              ...evento.resultado,
              evento_id: id,
              horario: formatarHorario(evento.horario),
            });
          }
        } catch (falha) {
          if (!telaAtiva || redirecionou) return;
          console.warn("Falha ao consultar backend:", falha);
          if (aguardandoBackendRef.current) {
            mostrarChoro("Aguardando resposta do backend. Tentando novamente...");
          }
        } finally {
          consultandoBackend = false;
        }
      }

      async function verificarNotificacao() {
        if (!telaAtiva || redirecionou || consultandoNotificacao) return;
        const idPendente = obterEventoPendente();
        if (!idPendente || idPendente === ultimoEventoExibidoRef.current) return;
        consultandoNotificacao = true;
        try {
          const evento = await consultarEventoMonitoramento(idPendente);
          if (!telaAtiva || redirecionou) return;
          if (evento.status === "concluido" && evento.resultado?.resultado_final) {
            ultimoEventoExibidoRef.current = idPendente;
            aguardandoBackendRef.current = false;
            eventoEmAnaliseRef.current = null;
            limparEventoPendente(idPendente);
            redirecionou = true;
            navegarParaResultado({
              ...evento.resultado,
              evento_id: idPendente,
              horario: formatarHorario(evento.horario),
            });
          } else if (evento.status === "erro") {
            limparEventoPendente(idPendente);
          }
        } catch (falha) {
          console.warn("Não foi possível consultar a notificação:", falha);
        } finally {
          consultandoNotificacao = false;
        }
      }

      verificarESP32();
      verificarBackend();
      verificarNotificacao();
      const timer = setInterval(() => {
        verificarESP32();
        verificarBackend();
        verificarNotificacao();
      }, INTERVALO_CONSULTA_MS);

      return () => {
        telaAtiva = false;
        clearInterval(timer);
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PageHeader title="Monitoramento" />

        <View style={styles.cardArea}>
          <View style={styles.card}>
            <Text style={styles.mainStatus}>{mensagemPrincipal}</Text>
            <Text style={styles.detailStatus}>{mensagemDetalhe}</Text>
            {carregando && (
              <ActivityIndicator size="large" color="#2362a8" />
            )}
            {erro !== "" && <Text style={styles.error}>{erro}</Text>}
          </View>
        </View>
      </View>

      <Nav activeTab="monitor" />
      
    </View>
  );
}
