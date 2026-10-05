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
  title = "Análise concluída:",
  subtitle = "Choro detectado às ",
  time = "--:--",
  percentage,
  result,
  borderColor = "#2D2D2D",
  icon,
}: ResultPageProps) {
  const mensagemResultado =
    result === "Indefinido"
      ? "Não foi possível identificar uma causa predominante:"
      : `${percentage}% de chance de ser:`;

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
        <Text style={styles.message}>{mensagemResultado}</Text>

        <Text style={styles.result}>{result}</Text>
      </View>
    </View>
  );
}