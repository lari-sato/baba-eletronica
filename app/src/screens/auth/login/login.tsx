import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BabyIcon from "../../../components/babyIcons/babyIcons";
import { styles } from "./styles";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <BabyIcon size={120} color="#407888" />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#696969"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        placeholderTextColor="#696969"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
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

        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? "eye-off" : "eye"}
            size={24}
            color="#696969"
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Monitor")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}