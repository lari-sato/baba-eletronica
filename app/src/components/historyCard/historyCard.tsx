import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

interface BabyIconsProps {
  size?: number;
  color?: string;
}

interface HistoryCardProps {
  message: string;
  result: string;
  hour: string;
  IconComponent?: React.ComponentType<BabyIconsProps>;
  iconColor?: string;
  iconSize?: number; 
}

export function HistoryCard({
  message,
  result,
  hour,
  IconComponent,
  iconColor = "#2D2D2D",
  iconSize = 29, 
}: HistoryCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.result}>{result}</Text>
        <Text style={styles.hour}>{hour}</Text>
      </View>

      <View style={[styles.circle, { borderColor: iconColor }]}>
        {IconComponent && <IconComponent size={iconSize} color={iconColor} />}
      </View>
    </View>
  );
}
