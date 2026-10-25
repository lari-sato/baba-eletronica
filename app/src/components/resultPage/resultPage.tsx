
import React, { ReactNode } from "react";
import { View, Text, ScrollView } from "react-native";

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
  footer?: ReactNode;
}

export function ResultPage({
  title = "Análise Concluída",
  subtitle = "Choro detectado às ",
  time = "--:--",
  percentage,
  result,
  borderColor = "#2D2D2D",
  icon,
  footer,
}: ResultPageProps) {
  const mensagemResultado = `${percentage}% de chance de ser:`;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.headerOffset}>
        <PageHeader
          title={title}
          subtitle={`${subtitle}${time}`}
          titleColor="#373737"
          subtitleColor="#414141"
          dividerColor="#113e7a26"
        />
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.circle, { borderColor }]}>
          {icon}
        </View>

        <Text style={styles.disclaimerText}>
          Análise feita por IA. Os resultados são estimativas e podem conter
          imprecisões.
        </Text>

        <View style={styles.card}>
          <Text style={styles.message}>{mensagemResultado}</Text>
          <Text style={styles.result}>{result}</Text>
        </View>

        {footer && (
          <View style={styles.buttonArea}>
            {footer}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
