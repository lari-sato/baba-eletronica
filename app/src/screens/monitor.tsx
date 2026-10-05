import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Localization from "expo-localization";

import {
  consultarStatusESP32,
  baixarAudioESP32,
  enviarAudioParaBackend,
} from "../services/api";

import { Nav } from "../components/nav";

export default function Monitor({ navigation }: any) {
  const [status, setStatus] = useState("Aguardando verificação...");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const executandoRef = useRef(false);
  const redirecionouRef = useRef(false);

  function obterHorarioLocal() {
    const timeZone =
      Localization.getCalendars()[0]?.timeZone ?? "America/Sao_Paulo";

    return new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone,
    });
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
      setStatus("Consultando ESP32...");

      const statusESP32 = await consultarStatusESP32();

      if (statusESP32.status !== "bebe chorando") {
        setStatus(`Status atual: ${statusESP32.status}`);
        return;
      }

      const horarioDeteccao = obterHorarioLocal();

      setStatus("Choro detectado! Baixando áudio...");

      const uriAudio = await baixarAudioESP32();

      setStatus("Enviando áudio para análise...");

      const respostaApi = await enviarAudioParaBackend(uriAudio);

      const resultadoBackend = {
        ...respostaApi.resultado,
        horario: horarioDeteccao,
      };

      setStatus(`Resultado: ${resultadoBackend.resultado_final}`);

      redirecionouRef.current = true;

      navegarParaResultado(resultadoBackend);
    } catch (error: any) {
      setErro(error.message || "Erro inesperado");
      setStatus("Falha na verificação");
    } finally {
      executandoRef.current = false;
      setCarregando(false);
    }
  }

  useEffect(() => {
    verificarChoro();

    const intervalId = setInterval(verificarChoro, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento</Text>

      <View style={styles.card}>
        <Text style={styles.status}>{status}</Text>

        {carregando && <ActivityIndicator size="large" color="#407888" />}

        {erro !== "" && <Text style={styles.error}>{erro}</Text>}
      </View>

      <Nav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 70,
    paddingBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#407888",
  },

  card: {
    width: "80%",
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    padding: 24,
    alignItems: "center",
    gap: 20,
  },

  status: {
    fontSize: 18,
    color: "#454545",
    textAlign: "center",
    fontWeight: "600",
  },

  error: {
    color: "#c92023",
    fontSize: 14,
    textAlign: "center",
  },
});