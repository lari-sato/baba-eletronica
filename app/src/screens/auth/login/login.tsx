import { useState } from "react";
import { Alert, Image, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim() || !password.trim()) {
      Alert.alert("Oops!", "Preencha todos os campos para continuar.");
      return;
    }

    if (!emailFormat.test(email.trim())) {
      Alert.alert("E-mail inválido", "Digite um e-mail em formato válido para continuar.");
      return;
    }

    navigation.navigate("Monitor");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/blue-logo.png")}
        style={styles.logo}
        resizeMode="contain"
        accessibilityLabel="Logo Luz e Colo"
      />

      <TextInput
        style={[
          styles.input,
          isEmailFocused && styles.inputFocused, 
        ]}
        placeholder="E-mail"
        placeholderTextColor="#696969"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
        onFocus={() => setIsEmailFocused(true)}
        onBlur={() => setIsEmailFocused(false)}
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

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#696969"
          />
        </TouchableOpacity>
      </View>
      
  
      <TouchableOpacity 
        style={styles.forgotPasswordContainer} 
        activeOpacity={0.7} 
      >
        <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Ainda não tem uma conta?{" "}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}
          >
            Cadastrar
          </Text>
        </Text>
      </View>
    </View>
  );
}
