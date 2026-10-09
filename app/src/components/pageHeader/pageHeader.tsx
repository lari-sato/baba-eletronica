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
  titleColor = "#407888",
  subtitleColor = "#696969",
  dividerColor = "#8FB2CA",
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