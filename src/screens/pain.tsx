import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { PainIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Pain() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <View style={styles.header}>
        <Text style={styles.title}>Seu bebê está chorando</Text>
        <Text style={styles.subtitle}>Choro detectado às</Text>
      </View>
      <View style={styles.circle}>
        <PainIcon size={145} color="#8E0305" />
      </View>
      <View style={styles.card}>
        <Text style={styles.message}>70% de chance de ser:</Text>
        <Text style={styles.result}>Dor</Text>
      </View>
      <Nav 
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E35B5B",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 24,
    color: "#2D2C2C",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 18,
    color: "#454545",
    fontWeight: "500",
  },
  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    borderWidth: 5,
    borderColor: "#8E0305",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 18,
    color: "#454545",
    fontWeight: "400",
  },
  result: {
    fontSize: 26,
    color: "#454545",
    fontWeight: "700",
    marginTop: 6,
  },
});
