import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Linking,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { configurarWifiESP32 } from "../../../services/api";
import { styles } from "./styles";

export default function WifiScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [conectando, setConectando] = useState(false);
  const [isSsidFocused, setIsSsidFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  function abrirConfiguracoesWifi() {
    Alert.alert(
      "Passo a Passo",
      "1. Conecte-se na rede Wi-Fi chamada 'ESP32-S3-Config'.\n2. Use a senha 'esp32config'.\n3. Volte para este aplicativo para preencher seus dados.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Entendi, ir para Wi-Fi",
          onPress: () => {
            if (Platform.OS === "android") {
              Linking.sendIntent(
                "android.settings.WIFI_SETTINGS"
              ).catch(() => Linking.openSettings());
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
      Alert.alert(
        "Atenção",
        "Preencha o nome da rede e a senha."
      );
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
              Linking.sendIntent(
                "android.settings.ACCESSIBILITY_SETTINGS"
              ).catch(() => Linking.openSettings());
            } else {
              Linking.openSettings();
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{
          paddingTop: 30,
          paddingBottom: 30,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <PageHeader
          title="Tutorial de Uso"
          subtitle="Realize os passos abaixo para utilizar o Luz e Colo: Babá Eletrônica Assistiva."
        />

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            Passo 1: Conexão temporária
          </Text>

          <Text style={styles.stepDescription}>
            Conecte-se à rede do dispositivo para poder enviar os dados.
          </Text>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={abrirConfiguracoesWifi}
          >
            <Ionicons
              name="open-outline"
              size={20}
              color="#2362a8"
            />

            <Text style={styles.settingsButtonText}>
              Abrir Configurações de Wi-Fi
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            Passo 2: Rede da sua casa
          </Text>

          <Text style={styles.stepDescription}>
            Insira o Wi-Fi que a babá eletrônica irá utilizar.
          </Text>

          <Text style={styles.hint}>
            Se a babá eletrônica já está conectada ao Wi-Fi da sua casa,
            não é necessário repetir a configuração.
          </Text>

          <TextInput
            style={[
              styles.input,
              isSsidFocused && styles.inputFocused,
            ]}
            placeholder="Nome da rede"
            placeholderTextColor="#696969"
            value={ssid}
            onChangeText={setSsid}
            onFocus={() => setIsSsidFocused(true)}
            onBlur={() => setIsSsidFocused(false)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View
            style={[
              styles.passwordContainer,
              isPasswordFocused && styles.inputFocused,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Senha"
              placeholderTextColor="#696969"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? "eye" : "eye-off"}
                size={22}
                color="#696969"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              conectando && { opacity: 0.6 },
            ]}
            onPress={conectarWifi}
            disabled={conectando}
          >
            <Text style={styles.buttonText}>
              {conectando ? "Conectando..." : "Conectar"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.stepContainer}>
          <Text style={styles.stepTitle}>
            Passo 3: Notificações com flash
          </Text>

          <Text style={styles.stepDescription}>
            Ative as notificações com flash da câmera no Android
            para receber alertas visuais quando o bebê chorar.
          </Text>

          <TouchableOpacity
            style={styles.settingsButton}
            onPress={abrirConfiguracoesFlash}
          >
            <Ionicons
              name="open-outline"
              size={20}
              color="#2362a8"
            />

            <Text style={styles.settingsButtonText}>
              Abrir Configurações de Notificações com Flash
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Nav activeTab="settings" />
    </View>
  );
}
