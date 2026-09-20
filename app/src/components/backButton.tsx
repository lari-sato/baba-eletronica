import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

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

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#F6F6F6",
    width: 47,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 20,
    marginTop: 10,
  },
});