import {
  StyleSheet,
  View,
} from "react-native";
import { ResultPage } from "../components/resultPage";
import { PainIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Pain() {
  return (
    <View style={styles.container}>
      <BackButton />
      <ResultPage
        time="14:30"
        percentage={70}
        result="Dor"
        borderColor="#8E0305"
        icon={<PainIcon size={160} color="#8E0305" />}
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
    backgroundColor: "#E35B5B",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
  }
});
