import { useState } from "react";
import { Alert, Image, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Register({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const handleRegister = () => {
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !username.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Oops!", "Preencha todos os campos para continuar.");
      return;
    }

    if (!emailFormat.test(email.trim())) {
      Alert.alert("E-mail inválido", "Digite um e-mail em formato válido para continuar.");
      return;
    }

    navigation.navigate("Login");
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
          isUsernameFocused && styles.inputFocused,
        ]}
        placeholder="Nome Completo"
        placeholderTextColor="#696969"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
        onFocus={() => setIsUsernameFocused(true)}
        onBlur={() => setIsUsernameFocused(false)}
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

        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#696969"
          />
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.passwordContainer,
          isConfirmPasswordFocused && styles.inputFocused,
        ]}
      >
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirmar Senha"
          placeholderTextColor="#696969"
          secureTextEntry={!showConfirmPassword}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onFocus={() => setIsConfirmPasswordFocused(true)}
          onBlur={() => setIsConfirmPasswordFocused(false)}
        />

        <TouchableOpacity
          onPress={() =>
            setShowConfirmPassword(!showConfirmPassword)
          }
        >
          <Ionicons
            name={showConfirmPassword ? "eye-off" : "eye"}
            size={24}
            color="#696969"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.registerText}>
          <Text style={styles.registerPrompt}>Já possui uma conta? </Text>
          <Text style={styles.registerLink}>Entrar</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}