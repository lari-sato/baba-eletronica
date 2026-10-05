import React, { ReactNode } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

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
