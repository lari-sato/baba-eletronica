import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function WifiScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <View style={styles.header}>
        <Ionicons name="wifi" size={100} color="#407888" />
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Conectar</Text>
      </TouchableOpacity>
      <Nav
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
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
  },
  buttonText: {
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
