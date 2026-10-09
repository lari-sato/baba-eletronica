import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

interface NavProps {
  activeTab?: "monitor" | "history" | "settings";
}

export function Nav({ activeTab }: NavProps) {
  const navigation = useNavigation<any>();

  const activeColor = "#407888";
  const inactiveColor = "#696969";

  const monitorColor = activeTab === "monitor" ? activeColor : inactiveColor;
  const historyColor = activeTab === "history" ? activeColor : inactiveColor;
  const settingsColor = activeTab === "settings" ? activeColor : inactiveColor;

  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Monitor")}
        activeOpacity={0.5}
      >
        <Ionicons
          name={activeTab === "monitor" ? "radio" : "radio-outline"}
          size={25}
          color={monitorColor}
        />

        <Text style={[styles.navText, { color: monitorColor }]}>
          Monitoramento
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("History")}
        activeOpacity={0.5}
      >
        <Ionicons
          name={activeTab === "history" ? "time" : "time-outline"}
          size={25}
          color={historyColor}
        />

        <Text style={[styles.navText, { color: historyColor }]}>
          Histórico
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigation.navigate("Settings")}
        activeOpacity={0.5}
      >
        <Ionicons
          name={activeTab === "settings" ? "settings" : "settings-outline"}
          size={25}
          color={settingsColor}
        />

        <Text style={[styles.navText, { color: settingsColor }]}>
          Configurações
        </Text>
      </TouchableOpacity>
    </View>
  );
}