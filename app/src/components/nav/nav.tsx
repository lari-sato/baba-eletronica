import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";

interface NavProps {
  onPressHistory?: () => void;
  onPressSettings?: () => void;
  activeTab?: "history" | "settings";
}

export function Nav({
  onPressHistory,
  onPressSettings,
  activeTab,
}: NavProps) {
  const navigation = useNavigation<any>();

  const isHistoryActive = activeTab === "history";
  const isSettingsActive = activeTab === "settings";

  const historyColor = isHistoryActive ? "#407888" : "#696969";
  const settingsColor = isSettingsActive ? "#407888" : "#696969";

  const handleHistoryPress = () => {
    if (onPressHistory) {
      onPressHistory();
      return;
    }

    navigation.navigate("History");
  };

  const handleSettingsPress = () => {
    if (onPressSettings) {
      onPressSettings();
      return;
    }

    navigation.navigate("Settings");
  };

  return (
    <View style={styles.nav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={handleHistoryPress}
        activeOpacity={0.4}
      >
        <Ionicons
          name={isHistoryActive ? "time" : "time-outline"}
          size={26}
          color={historyColor}
        />

        <Text style={[styles.navText, { color: historyColor }]}>
          Histórico
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={handleSettingsPress}
        activeOpacity={0.4}
      >
        <Ionicons
          name={isSettingsActive ? "settings" : "settings-outline"}
          size={26}
          color={settingsColor}
        />

        <Text style={[styles.navText, { color: settingsColor }]}>
          Configurações
        </Text>
      </TouchableOpacity>
    </View>
  );
}