import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import { consultarStatusESP32, baixarAudioESP32, enviarAudioParaBackend } from "../services/api";
import { Nav } from "../components/nav";

export default function Monitor({ navigation }: any) {
  const [status, setStatus] = useState("Aguardando verificação...");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  function navegarParaResultado(resultadoFinal: string) {
    const resultado = resultadoFinal.toLowerCase();

    if (resultado.includes("fome")) {
      navigation.navigate("Hungry");
    } else if (resultado.includes("dor")) {
      navigation.navigate("Pain");
    } else if (resultado.includes("desconforto")) {
      navigation.navigate("Discomfort");
    } else if (
      resultado.includes("cansaço") ||
      resultado.includes("cansaco") ||
      resultado.includes("sono")
    ) {
      navigation.navigate("Sleepy");
    } else {
      navigation.navigate("Undefined");
    }
  }

  async function verificarChoro() {
    try {
      setCarregando(true);
      setErro("");
      setStatus("Consultando ESP32...");

      const statusESP32 = await consultarStatusESP32();

      if (statusESP32.status !== "bebe chorando") {
        setStatus(`Status atual: ${statusESP32.status}`);
        return;
      }

      setStatus("Choro detectado. Baixando áudio...");

      const uriAudio = await baixarAudioESP32();

      setStatus("Enviando áudio para análise...");

      const respostaBackend = await enviarAudioParaBackend(uriAudio);

      const resultadoFinal = respostaBackend.resultado.resultado_final;

      setStatus(`Resultado: ${resultadoFinal}`);

      navegarParaResultado(resultadoFinal);
    } catch (error: any) {
      setErro(error.message || "Erro inesperado");
      setStatus("Falha na verificação");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monitoramento</Text>

      <View style={styles.card}>
        <Text style={styles.status}>{status}</Text>

        {carregando && <ActivityIndicator size="large" color="#407888" />}

        {erro !== "" && <Text style={styles.error}>{erro}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={verificarChoro}
          disabled={carregando}
        >
          <Text style={styles.buttonText}>
            {carregando ? "Verificando..." : "Verificar agora"}
          </Text>
        </TouchableOpacity>
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
  button: {
    backgroundColor: "#407888",
    width: "80%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: "bold",
  },
});