import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";

import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";
import { HistoryCard } from "../components/card";

import { 
  BabyBottle, 
  SleepyIcon, 
  DiscomfortIcon, 
  PainIcon, 
  UndefinedIcon,
} from "../components/babyIcons"; 

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <Text style={styles.title}>Histórico</Text>
      <View style={styles.divider} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <HistoryCard
          message="Choro detectado há 10 horas"
          result="84% de chance de ser: Fome"
          hour="Às 23:00"
          IconComponent={BabyBottle}
          iconColor="#E0B034"
          iconSize={24}
        />

        <HistoryCard
          message="Choro detectado há 12 horas"
          result="67% de chance de ser: Sono"
          hour="Às 21:00"
          IconComponent={SleepyIcon}
          iconColor="#8C6BB1"
          iconSize={32}
        />

        <HistoryCard
          message="Choro detectado ontem"
          result="75% de chance de ser: Dor"
          hour="Às 17:00"
          IconComponent={PainIcon}
          iconColor="#D9534F"
          iconSize={30}
        />

        <HistoryCard
          message="Choro detectado 01/05/2026"
          result="90% de chance de ser: Desconforto"
          hour="Às 23:30"
          IconComponent={DiscomfortIcon}
          iconColor="#E67E22"
          iconSize={28}
        />

        <HistoryCard
          message="Choro detectado 30/04/2026"
          result="O resultado foi: Indefinido"
          hour="Às 21:07"
          IconComponent={UndefinedIcon}
          iconColor="#95A5A6"
          iconSize={24}
        />
      </ScrollView>

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
    backgroundColor: "#BFDDF3",
    paddingTop: 45,
  },
  title: {
    fontSize: 23,
    color: "#407888",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: -30,
  },
  divider: {
    height: 2,
    backgroundColor: "#8FB2CA",
    width: "88%",
    alignSelf: "center",
    marginTop: 4,
    marginBottom: 15,
  },
  scroll: {
    flex: 1,
    width: "100%",
  },
  scrollContent: {
    paddingBottom: 15,
    alignItems: "center", 
  },
});
