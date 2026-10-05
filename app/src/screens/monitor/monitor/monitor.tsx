import { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Text,
  View,
} from "react-native";
import * as Localization from "expo-localization";
import { useFocusEffect } from "@react-navigation/native";

import { Nav } from "../../../components/nav/nav";
import { styles } from "./styles";

import {
  consultarStatusESP32,
  baixarAudioESP32,
  enviarAudioParaBackend,
} from "../../../services/api";

const TEXTO_MONITORAMENTO = "Monitorando o ambiente...";
const DETALHE_MONITORAMENTO = "Consultando status da ESP32...";

export default function Monitor({ navigation }: any) {
  const [mensagemPrincipal, setMensagemPrincipal] = useState(
    TEXTO_MONITORAMENTO
  );

  const [mensagemDetalhe, setMensagemDetalhe] = useState(
    DETALHE_MONITORAMENTO
  );

  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const executandoRef = useRef(false);
  const redirecionouRef = useRef(false);

  function mostrarMonitoramento() {
    setMensagemPrincipal(TEXTO_MONITORAMENTO);
    setMensagemDetalhe(DETALHE_MONITORAMENTO);
  }

  function obterHorarioLocal() {
    const timeZone =
      Localization.getCalendars()[0]?.timeZone ?? "America/Sao_Paulo";

    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
  }

  function formatarStatusESP32(status: string) {
    const mapaStatus: Record<string, string> = {
      "sem som": "sem som",
      "ruido ambiental": "ruído ambiental",
      "bebe chorando": "bebê chorando",
    };

    return mapaStatus[status] ?? status;
  }

  function navegarParaResultado(resultadoBackend: any) {
    const resultado = resultadoBackend.resultado_final.toLowerCase();

    const params = {
      resultadoBackend,
    };

    if (resultado.includes("fome")) {
      navigation.navigate("Hungry", params);
    } else if (resultado.includes("dor")) {
      navigation.navigate("Pain", params);
    } else if (resultado.includes("desconforto")) {
      navigation.navigate("Discomfort", params);
    } else if (
      resultado.includes("cansaço") ||
      resultado.includes("cansaco") ||
      resultado.includes("sono")
    ) {
      navigation.navigate("Sleepy", params);
    } else {
      navigation.navigate("Undefined", params);
    }
  }

  async function verificarChoro() {
    if (executandoRef.current || redirecionouRef.current) {
      return;
    }

    try {
      executandoRef.current = true;

      setCarregando(true);
      setErro("");
      mostrarMonitoramento();

      const statusESP32 = await consultarStatusESP32();

      if (statusESP32.status !== "bebe chorando") {
        setMensagemPrincipal("Nenhum choro detectado.");
        setMensagemDetalhe(
          `Status da ESP32: ${formatarStatusESP32(statusESP32.status)}`
        );
        return;
      }

      const horarioDeteccao = obterHorarioLocal();

      setMensagemPrincipal("Choro identificado.\nAnalisando possível causa...");
      setMensagemDetalhe(
        "Isso pode levar alguns segundos. Por favor, aguarde."
      );

      const uriAudio = await baixarAudioESP32();
      const respostaApi = await enviarAudioParaBackend(uriAudio);

      const resultadoBackend = {
        ...respostaApi.resultado,
        horario: horarioDeteccao,
      };

      redirecionouRef.current = true;

      navegarParaResultado(resultadoBackend);
    } catch (error: any) {
      setErro(error.message || "Erro inesperado");
      setMensagemPrincipal("Não foi possível verificar o monitoramento.");
      setMensagemDetalhe("Confira a conexão com a ESP32 e com o backend.");
    } finally {
      executandoRef.current = false;
      setCarregando(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      redirecionouRef.current = false;
      executandoRef.current = false;

      setErro("");
      mostrarMonitoramento();

      verificarChoro();

      const intervalId = setInterval(verificarChoro, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento</Text>

      <View style={styles.card}>
        <Text style={styles.mainStatus}>{mensagemPrincipal}</Text>

        <Text style={styles.detailStatus}>{mensagemDetalhe}</Text>

        {carregando && <ActivityIndicator size="large" color="#407888" />}

        {erro !== "" && <Text style={styles.error}>{erro}</Text>}
      </View>

      <Nav />
    </View>
  );
}