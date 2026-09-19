import React, { ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";

interface ResultPageProps {
  title?: string;
  subtitle?: string;
  time?: string;
  percentage: string | number;
  result: string;
  borderColor?: string;
  icon?: ReactNode;
}

export function ResultPage({
  title = "Seu bebê está chorando",
  subtitle = "Choro detectado às ",
  time = "9:41",
  percentage,
  result,
  borderColor = "#2D2D2D",
  icon,
}: ResultPageProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {subtitle}
          {time}
        </Text>
      </View>

      <View style={[styles.circle, { borderColor }]}>{icon}</View>

      <View style={styles.card}>
        <Text style={styles.message}>
            {result === "Indefinido"
            ? "O resultado foi:" : `${percentage}% de chance de ser:`}
  </Text>
        <Text style={styles.result}>{result}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
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
});
