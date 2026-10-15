import type { ComponentType } from "react";
import { View, ScrollView } from "react-native";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { HistoryCard } from "../../../components/historyCard/historyCard";
import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { styles } from "./styles";

import {
  BabyBottle,
  SleepyIcon,
  DiscomfortIcon,
  PainIcon,
  UndefinedIcon,
} from "../../../components/babyIcons/babyIcons";

interface HistoryItem {
  message: string;
  result: string;
  hour: string;
  IconComponent: ComponentType<{ size?: number; color?: string }>;
  iconColor: string;
  iconSize: number;
}

const historyItems: HistoryItem[] = [
  {
    message: "Choro detectado há 10 horas",
    result: "84% de chance de ser: Fome",
    hour: "Às 23:00",
    IconComponent: BabyBottle,
    iconColor: "#E0B034",
    iconSize: 24,
  },
  {
    message: "Choro detectado há 12 horas",
    result: "67% de chance de ser: Sono",
    hour: "Às 21:00",
    IconComponent: SleepyIcon,
    iconColor: "#8C6BB1",
    iconSize: 32,
  },
  {
    message: "Choro detectado ontem",
    result: "75% de chance de ser: Dor",
    hour: "Às 17:00",
    IconComponent: PainIcon,
    iconColor: "#D9534F",
    iconSize: 30,
  },
  {
    message: "Choro detectado (01/05/2026)",
    result: "90% de chance de ser: Desconforto",
    hour: "Às 23:30",
    IconComponent: DiscomfortIcon,
    iconColor: "#E67E22",
    iconSize: 28,
  },
  {
    message: "Choro detectado (30/04/2026)",
    result: "O resultado foi: Indefinido",
    hour: "Às 21:07",
    IconComponent: UndefinedIcon,
    iconColor: "#95A5A6",
    iconSize: 27,
  },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <BackButton />

      <View style={styles.content}>
        <PageHeader title="Histórico" />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {historyItems.map((item) => (
            <HistoryCard key={item.message} {...item} />
          ))}
        </ScrollView>
      </View>

      <Nav activeTab="history" />
    </View>
  );
}