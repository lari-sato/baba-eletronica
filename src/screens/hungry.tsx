import {
  StyleSheet,
  View,
} from "react-native";

import { ResultPage } from "../components/resultPage";
import { BabyBottle } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Hungry() {
  return (
    <View style={styles.container}>
      <BackButton />
      <ResultPage
        time="14:30"
        percentage={70}
        result="Fome"
        borderColor="#E7BC0F"
        icon={<BabyBottle size={120} color="#E7BC0F" />}
      />
      <Nav 
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDE76D",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
  }
});
