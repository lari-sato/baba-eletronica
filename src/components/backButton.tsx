import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={onPress}
      activeOpacity={0.4} 
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