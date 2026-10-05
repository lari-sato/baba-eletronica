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
        onPress={() => navigation.navigate("Monitor")}
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
