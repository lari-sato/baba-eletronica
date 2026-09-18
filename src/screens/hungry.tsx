import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { BabyBottle } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Hungry() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <View style={styles.header}>
        <Text style={styles.title}>Seu bebê está chorando</Text>
        <Text style={styles.subtitle}>Choro detectado às</Text>
      </View>
      <View style={styles.circle}>
        <BabyBottle size={120} color="#E7BC0F" />
      </View>
      <View style={styles.card}>
        <Text style={styles.message}>70% de chance de ser:</Text>
        <Text style={styles.result}>Fome</Text>
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
    backgroundColor: "#FDE76D",
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
    borderColor: "#E7BC0F",
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
  }
});
