import { useState } from "react";
import { Alert, Image, View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./styles";
import { salvarSessao } from "../../../services/configuracaoInicial";

export default function Register({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [salvando, setSalvando] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] =
    useState(false);

  const handleRegister = async () => {
    if (salvando) return;

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nomeTratado = username.trim();

    if (
      !nomeTratado ||
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

    if (password !== confirmPassword) {
      Alert.alert("Senhas diferentes", "A confirmação de senha deve ser igual à senha digitada.");
      return;
    }

    // Cadastro local do protótipo: guarda SOMENTE o nome de exibição.
    // Quando houver autenticação real, salve a sessão após a resposta de sucesso do backend.
    setSalvando(true);
    try {
      await salvarSessao(nomeTratado);
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    } catch {
      Alert.alert("Erro", "Não foi possível concluir o cadastro neste aparelho.");
    } finally {
      setSalvando(false);
    }
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
        style={[styles.button, salvando && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={salvando}
      >
        <Text style={styles.buttonText}>{salvando ? "Salvando..." : "Cadastrar"}</Text>
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