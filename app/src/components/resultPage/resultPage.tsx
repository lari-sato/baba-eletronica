import React, { ReactNode } from "react";
import { View, Text } from "react-native";

import { PageHeader } from "../pageHeader/pageHeader";
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
  title = "Análise Concluída",
  subtitle = "Choro detectado às ",
  time = "--:--",
  percentage,
  result,
  borderColor = "#2D2D2D",
  icon,
}: ResultPageProps) {
  const mensagemResultado =
    result === "Indefinido"
      ? "Não foi possível identificar o choro:"
      : `${percentage}% de chance de ser:`;

  return (
  <View style={styles.cardContainer}>
    <PageHeader
      title={title}
      subtitle={`${subtitle}${time}`}
      titleColor="#373737"
      subtitleColor="#414141"
      dividerColor="#00000026"
    />

    <View style={[styles.circle, { borderColor }]}>{icon}</View>

    <Text style={styles.disclaimerText}>
      Análise feita por IA. Os resultados são estimativas e podem conter
      imprecisões.
    </Text>

    <View style={styles.card}>
      <Text style={styles.message}>{mensagemResultado}</Text>
      <Text style={styles.result}>{result}</Text>
    </View>
  </View>
  );
}