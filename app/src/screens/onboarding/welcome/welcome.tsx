import { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { configurarWifiESP32 } from "../../../services/api";
import { obterSessao } from "../../../services/configuracaoInicial";
import { styles } from "./styles";

export default function Welcome({ navigation }: any) {
  const [nome, setNome] = useState("Usuário");
  const [confirmado, setConfirmado] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [conectando, setConectando] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let ativo = true;
      setConfirmado(false);
      obterSessao()
        .then((sessao) => {
          if (ativo) setNome(sessao?.nome ?? "Usuário");
        })
        .catch(() => {
          if (ativo) setNome("Usuário");
        });

      const voltar = BackHandler.addEventListener("hardwareBackPress", () => true);
      return () => {
        ativo = false;
        voltar.remove();
      };
    }, [])
  );

  function abrirConfiguracoesWifi() {
    Alert.alert(
      "Passo a passo",
      "1. Conecte-se na rede Wi-Fi chamada 'ESP32-S3-Config'.\n2. Use a senha 'esp32config'.\n3. Volte para este aplicativo para preencher seus dados.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Entendi, ir para Wi-Fi",
          onPress: () => {
            if (Platform.OS === "android") {
              Linking.sendIntent("android.settings.WIFI_SETTINGS").catch(() =>
                Linking.openSettings()
              );
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  }

  async function conectarWifi() {
    if (conectando) return;
    if (!ssid.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha o nome da rede e a senha.");
      return;
    }
    setConectando(true);
    try {
      await configurarWifiESP32(ssid.trim(), password);
      setPassword("");
      Alert.alert(
        "Configuração enviada",
        "As credenciais foram enviadas à babá eletrônica. Aguarde a conexão com a rede da sua casa."
      );
    } catch {
      Alert.alert(
        "Não foi possível configurar",
        "Para configurar uma placa nova, conecte o celular à rede 'ESP32-S3-Config'. Se sua placa já está conectada ao Wi-Fi da casa, não precisa repetir este passo."
      );
    } finally {
      setConectando(false);
    }
  }

  function abrirConfiguracoesFlash() {
    Alert.alert(
      "Notificações com flash",
      "Ative a permissão de notificações do Luz e Colo e procure 'Notificações com flash' nas configurações de Acessibilidade ou Notificações do Android. Habilite o flash da câmera.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Abrir configurações",
          onPress: () => {
            if (Platform.OS === "android") {
              Linking.sendIntent("android.settings.ACCESSIBILITY_SETTINGS").catch(
                () => Linking.openSettings()
              );
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  }

  function continuar() {
    if (!confirmado) return;
    navigation.reset({ index: 0, routes: [{ name: "Monitor" }] });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <PageHeader
          title={`Bem-vindo(a), ${nome}!`}
          subtitle="Siga os passos abaixo para utilizar o Luz e Colo: Babá Eletrônica Assistiva."
        />

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Passo 1: Conexão temporária</Text>
          <Text style={styles.stepDescription}>
            Conecte-se à rede do dispositivo para poder enviar os dados.
          </Text>
          <TouchableOpacity style={styles.settingsButton} onPress={abrirConfiguracoesWifi}>
            <Ionicons name="open-outline" size={20} color="#2362a8" />
            <Text style={styles.settingsButtonText}>Abrir Configurações de Wi-Fi</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Passo 2: Rede da sua casa</Text>
          <Text style={styles.stepDescription}>
            Insira o Wi-Fi que a babá eletrônica irá utilizar.
          </Text>
          <Text style={styles.hint}>
            Se a babá eletrônica já está conectada ao Wi-Fi da sua casa, não é necessário repetir a configuração.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da rede"
            placeholderTextColor="#696969"
            value={ssid}
            onChangeText={setSsid}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#696969"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword((anterior) => !anterior)}>
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#696969"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.connectButton, conectando && styles.buttonDisabled]}
            onPress={conectarWifi}
            disabled={conectando}
          >
            <Text style={styles.buttonText}>
              {conectando ? "Conectando..." : "Conectar"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>Passo 3: Notificações com flash</Text>
          <Text style={styles.stepDescription}>
            Ative as notificações com flash da câmera no Android para receber alertas visuais quando o bebê chorar.
          </Text>
          <TouchableOpacity style={styles.settingsButton} onPress={abrirConfiguracoesFlash}>
            <Ionicons name="open-outline" size={20} color="#2362a8" />
            <Text style={styles.settingsButtonText}>
              Abrir Configurações de Notificações com Flash
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.confirmRow}
          onPress={() => setConfirmado((anterior) => !anterior)}
          activeOpacity={0.7}
          accessibilityRole="checkbox"
          accessibilityLabel="Confirmo que realizei todos os passos acima"
          accessibilityState={{ checked: confirmado }}
        >
          <Ionicons
            name={confirmado ? "checkbox" : "square-outline"}
            size={26}
            color="#2362a8"
          />
          <Text style={styles.confirmText}>
            Confirmo que realizei todos os passos acima.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.readyButton, !confirmado && styles.buttonDisabled]}
          onPress={continuar}
          disabled={!confirmado}
          accessibilityRole="button"
          accessibilityState={{ disabled: !confirmado }}
        >
          <Text style={styles.buttonText}>Pronto</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
