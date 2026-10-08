import { useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BabyIcon from "../../../components/babyIcons/babyIcons";
import { styles } from "./styles";

export default function Login({ navigation }: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  return (
    <View style={styles.container}>
      <BabyIcon size={120} color="#407888" />

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
        onPress={() => navigation.navigate("Monitor")}
      >
        
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
