import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NavProps {
  onPressHistory?: () => void;
  onPressSettings?: () => void;
}

export function Nav({ onPressHistory, onPressSettings }: NavProps) {
  return (
    <View style={styles.nav}>
      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onPressHistory}
        activeOpacity={0.4}
      >
        <Ionicons name="time-outline" size={26} color="#696969" />
        <Text style={styles.navText}>Histórico</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.navItem} 
        onPress={onPressSettings}
        activeOpacity={0.4}
      >
        <Ionicons name="settings-outline" size={26} color="#696969" />
        <Text style={styles.navText}>Configurações</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    width: "45%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#F6F6F6",
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "flex-end",
    marginRight: 20,
    marginBottom: 20,
    elevation: 6,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    fontSize: 12,
    color: "#696969",
    marginTop: 4,
    fontWeight: "700",
  },
});