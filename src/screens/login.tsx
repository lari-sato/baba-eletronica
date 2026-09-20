import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BabyIcon from "../components/babyIcons";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <BabyIcon size={120} color="#407888" />
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#696969"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Senha"
          placeholderTextColor="#696969"
          secureTextEntry={!showPassword}/>
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeIcon}>
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={22}
            color="#696969"/>
        </TouchableOpacity>
      </View>
      <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("History")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    alignItems: "center",
    justifyContent: "center",
    gap: 25,
  },
  forgotPassword: {
    width: "80%",
    fontSize: 12,
    color: "#407888",
    fontWeight: "500",
    marginTop: -7,
    paddingLeft: 10,
  },
  input: {
    width: "80%",
    height: 45,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 10,
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
  },
  buttonText: {
    color: "#F6F6F6",
    fontSize: 16,
    fontWeight: "bold",
  },
});
