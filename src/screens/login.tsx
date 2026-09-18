import React from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BabyIcon from "../components/babyIcons";
export default function App() {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={styles.container}>
        <BabyIcon size={120} color="#407888" />
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          placeholderTextColor="#696969"
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          placeholderTextColor="#696969"
          secureTextEntry={true}
        />
        <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: "#BFDDF3",
  },
  container: {
    flex: 1,
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
