import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { DiscomfortIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Discomfort() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <View style={styles.header}>
        <Text style={styles.title}>Seu bebê está chorando</Text>
        <Text style={styles.subtitle}>Choro detectado às</Text>
      </View>
      <View style={styles.circle}>
        <DiscomfortIcon size={120} color="#ca420c" />
      </View>
      <View style={styles.card}>
        <Text style={styles.message}>70% de chance de ser:</Text>
        <Text style={styles.result}>Desconforto</Text>
      </View>
      <TouchableOpacity style={styles.infoButton}>
        <Ionicons name="help-outline" size={35} color="#454545" />
        <Text style={styles.infoButtonText}>ajuda</Text>
      </TouchableOpacity>
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
    backgroundColor: "#EA8E3D",
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
    fontSize: 27,
    color: "#2D2C2C",
    fontWeight: "500",
  },
  subtitle: {
    fontSize: 23,
    color: "#444040",
    fontWeight: "600",
  },
  circle: {
    width: 200,
    height: 200,
    backgroundColor: "#F6F6F6",
    borderRadius: 100,

    borderWidth: 5,
    borderColor: "#ca420c",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "75%",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#F6F6F6",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  message: {
    fontSize: 20,
    color: "#454545",
    fontWeight: "500",
  },
  result: {
    fontSize: 27,
    color: "#454545",
    fontWeight: "700",
    marginTop: 6,
  },
  infoButton: {
    backgroundColor: "#f7f9fa",
    width: "20%",
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -20,

    elevation: 6,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    borderWidth: 3.3,
    borderColor: "#454545",
  },
  infoButtonText: {
    fontSize: 16,
    color: "#454545",
    marginTop: -5,
    fontWeight: "500",
  },
});
