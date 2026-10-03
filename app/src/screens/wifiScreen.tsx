import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  Alert,
  Linking,
  Platform,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function WifiScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");

  const handleConnect = async () => {
    if (!ssid.trim() || !password.trim()) {
      Alert.alert("Atenção", "Preencha o nome da rede e a senha.");
      return;
    }

    try {
      const response = await fetch("http://192.168.4.1/wifi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ssid: ssid,
          password: password,
        }),
      });

      if (response.ok) {
        setModalVisible(true);
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível salvar as credenciais na babá eletrônica."
        );
      }
    } catch (error) {
      Alert.alert(
        "Erro de Conexão",
        "Certifique-se de que seu celular está conectado na rede 'ESP32-S3-Config' antes de enviar."
      );
    }
  };

  const abrirConfiguracoesWifi = () => {
    Alert.alert(
      "Passo a Passo",
      "1. Conecte-se na rede Wi-Fi chamada 'ESP32-S3-Config'.\n2. Use a senha 'esp32config'.\n3. Volte para este aplicativo para preencher seus dados.",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Entendi, ir para Wi-Fi",
          onPress: () => {
            if (Platform.OS === "ios") {
              Linking.openURL("App-Prefs:root=WIFI");
            } else {
              Linking.sendIntent("android.settings.WIFI_SETTINGS");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>

      {/* Botão voltar */}
      <BackButton />

      {/* Conteúdo central */}
      <View style={styles.content}>

        <View style={styles.header}>
          <Ionicons name="wifi" size={60} color="#407888" />

          <Text style={styles.title}>
            Conectar Wi-Fi
          </Text>

          <Text style={styles.subtitle}>
            Siga os passos abaixo para conectar a babá eletrônica à internet.
          </Text>
        </View>

        {/* Passo 1 */}
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
              color="#407888"
            />

            <Text style={styles.settingsButtonText}>
              Abrir Configurações de Wi-Fi
            </Text>
          </TouchableOpacity>

        </View>

        {/* Passo 2 */}
        <View style={styles.stepContainer}>

          <Text style={styles.stepTitle}>
            Passo 2: Rede da sua casa
          </Text>

          <Text style={styles.stepDescription}>
            Insira o Wi-Fi que a babá eletrônica irá utilizar.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Nome da rede"
            placeholderTextColor="#696969"
            value={ssid}
            onChangeText={setSsid}
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
            style={styles.button}
            onPress={handleConnect}
          >
            <Text style={styles.buttonText}>
              Conectar
            </Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* Navegação inferior */}
      <Nav
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />

      {/* Modal de sucesso */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>

          <View style={styles.modalContent}>

            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={() => setModalVisible(false)}
              activeOpacity={0.6}
            >
              <Ionicons
                name="close"
                size={24}
                color="#696969"
              />
            </TouchableOpacity>

            <Ionicons
              name="checkmark-circle"
              size={35}
              color="#407888"
              style={styles.iconSuccess}
            />

            <Text style={styles.modalTitle}>
              Conectado!
            </Text>

            <Text style={styles.modalText}>
              Sua rede foi conectada com sucesso.
            </Text>

          </View>

        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    paddingTop: 45,
    paddingBottom: 20,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  header: {
    alignItems: "center",
    gap: 10,
    marginBottom: 30,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#407888",
  },

  subtitle: {
    fontSize: 14,
    color: "#696969",
    textAlign: "center",
    fontWeight: "500",
  },

  stepContainer: {
    width: "80%",
    alignItems: "center",
    marginBottom: 32,
  },

  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#407888",
    alignSelf: "flex-start",
    marginBottom: 7,
  },

  stepDescription: {
    fontSize: 13,
    color: "#454545",
    alignSelf: "flex-start",
    marginBottom: 13,
    textAlign: "left",
  },

  settingsButton: {
    backgroundColor: "#C9E4F7",
    width: "100%",
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    gap: 8,
  },

  settingsButtonText: {
    color: "#407888",
    fontSize: 15,
    fontWeight: "bold",
  },

  input: {
    width: "100%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontWeight: "600",
    marginBottom: 10,
  },

  passwordContainer: {
    width: "100%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 10,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    fontWeight: "600",
  },

  eyeIcon: {
    paddingLeft: 10,
  },

  button: {
    backgroundColor: "#407888",
    width: "80%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: "bold",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "#00000080",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },

  modalContent: {
    width: "50%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    alignItems: "center",
    position: "relative",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  closeIconButton: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    zIndex: 1,
  },

  iconSuccess: {
    marginTop: -10,
    marginBottom: -2,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#407888",
    marginBottom: 8,
  },

  modalText: {
    fontSize: 16,
    color: "#696969",
    textAlign: "center",
  },

});