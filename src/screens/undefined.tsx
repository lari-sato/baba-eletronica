import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

import { UndefinedIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Undefined() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />

      <View style={styles.header}>
        <Text style={styles.title}>Seu bebê está chorando</Text>
        <Text style={styles.subtitle}>Choro detectado às</Text>
      </View>
      <View style={styles.circle}>
        <UndefinedIcon size={130} color="#878787" />
      </View>
      <View style={styles.card}>
        <Text style={styles.message}>O resultado foi:</Text>
        <Text style={styles.result}>Indefindo</Text>
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
    backgroundColor: "#DADADA",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
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
    borderColor: "#878787",
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
