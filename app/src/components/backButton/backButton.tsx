import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.backButton}
      activeOpacity={0.4} 
      onPress={onPress ? onPress : () => navigation.goBack()}
      >
      <Ionicons name="chevron-back" size={24} color="#454545" />
    </TouchableOpacity>
  );
}