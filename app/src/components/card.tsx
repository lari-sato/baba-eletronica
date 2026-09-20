import React from "react";
import { StyleSheet, View, Text } from "react-native";

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
  iconSize = 26, 
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

const styles = StyleSheet.create({
  card: {
    width: "90%",           
    alignSelf: "center",     
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",    
    justifyContent: "space-between",
  },
  cardContent: {
    flex: 1,
  },
  message: {
    fontSize: 14,
    color: "#454545",
    fontWeight: "600",
  },
  result: {
    fontSize: 12,
    color: "#666666",
    marginTop: 2,
  },
  hour: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  circle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    alignItems: "center",    
    justifyContent: "center",
    marginLeft: 10,
  },
});
