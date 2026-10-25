import { useState } from "react";
import {
  Alert,
  Image,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { salvarSessao } from "../../../services/configuracaoInicial";
import { styles } from "./styles";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [entrando, setEntrando] = useState(false);

  const handleLogin = async () => {
    if (entrando) return;

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTratado = email.trim();

    if (!emailTratado || !password.trim()) {
      Alert.alert("Oops!", "Preencha todos os campos para continuar.");
      return;
    }

    if (!emailFormat.test(emailTratado)) {
      Alert.alert(
        "E-mail inválido",
        "Digite um e-mail em formato válido para continuar."
      );
      return;
    }

    // Quando existir um serviço de autenticação, substitua por nome do usuário
    // retornado pelo backend após confirmar as credenciais.
    const nomeExibicao = emailTratado.split("@")[0];

    setEntrando(true);
    try {
      await salvarSessao(nomeExibicao);
      navigation.reset({ index: 0, routes: [{ name: "Welcome" }] });
    } catch {
      Alert.alert("Erro", "Não foi possível salvar sua sessão neste aparelho.");
    } finally {
      setEntrando(false);
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
        style={[styles.input, isEmailFocused && styles.inputFocused]}
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
        style={[styles.button, entrando && { opacity: 0.6 }]}
        onPress={handleLogin}
        disabled={entrando}
      >
        <Text style={styles.buttonText}>
          {entrando ? "Entrando..." : "Entrar"}
        </Text>
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
