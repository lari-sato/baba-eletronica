import { ReactNode } from "react";
import { View, Text } from "react-native";

import { styles } from "./styles";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  titleColor?: string;
  subtitleColor?: string;
  dividerColor?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  titleColor = "#2362a8",
  subtitleColor = "#696969",
  dividerColor = "#113e7a26",
}: PageHeaderProps) {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}

      <Text style={[styles.title, { color: titleColor }]}>{title}</Text>

      <View style={[styles.divider, { backgroundColor: dividerColor }]} />

      {subtitle && (
        <Text style={[styles.subtitle, { color: subtitleColor }]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}