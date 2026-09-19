import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,

} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Settings({ navigation }: any) {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <Text style={styles.title}>Configurações</Text>
      <View style={styles.divider} />

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.optionButton}
        >
          <View style={styles.optionContent}>
            <Ionicons name="wifi" size={24}color="#696969"/>
            <Text style={styles.optionText}>Conectar Wi-Fi</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#696969" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
        >
          <View style={styles.optionContent}>
            <Ionicons name="log-out" size={24} color="#c92023"/>
            <Text style={[styles.optionText, styles.logoutText]}>
              Sair da conta
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#696969" />
        </TouchableOpacity>
      </View>

      <Nav
        activeTab="settings"
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Já está nas configurações")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BFDDF3",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingTop: 45,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#407888",
    marginTop: 10,
  },
   divider: {
    height: 2,
    backgroundColor: "#8FB2CA",
    width: "88%",
    alignSelf: "center",
    marginTop: -50,
    marginBottom: 15,
  },
  menuContainer: {
    width: "100%",
    gap: 20,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionButton: {
    width: "90%",
    height: 55,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  logoutText: {
    color: "#c92023",
  },
});