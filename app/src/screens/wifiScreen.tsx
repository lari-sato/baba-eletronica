import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function WifiScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleConnect = () => {
    setModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.header}>
        <Ionicons name="wifi" size={60} color="#407888" />
        <Text style={styles.title}>Conectar Wi-Fi</Text>
        <Text style={styles.subtitle}>
          Insira os dados da sua rede para conectar a babá eletrônica
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nome da rede"
        placeholderTextColor="#696969"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#696969"
          secureTextEntry={!showPassword}
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
      <TouchableOpacity style={styles.button} onPress={handleConnect}>
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
      <Nav
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
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
              activeOpacity={0.6}>
              <Ionicons name="close" size={24} color="#696969" />
            </TouchableOpacity>
            <Ionicons
              name="checkmark-circle"
              size={35}
              color="#407888"
              style={styles.iconSuccess}
            />
            <Text style={styles.modalTitle}>Conectado!</Text>
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
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingTop: 45,
  },
  header: {
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
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
  input: {
    width: "80%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontWeight: "600",
  },
  passwordContainer: {
    width: "80%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
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
    width: "60%",
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
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
    shadowOffset: { width: 0, height: 2 },
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
    marginTop:-10,
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
