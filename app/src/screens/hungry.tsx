import {
  StyleSheet,
  View,
} from "react-native";

import { ResultPage } from "../components/resultPage";
import { BabyBottle } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Hungry({ route }: any) {
  const { respostaBackend } = route.params;

  return (
    <View style={styles.container}>
      <BackButton />
      <ResultPage
        time="14:30"
        percentage={Math.round(Number(respostaBackend.resultado.confianca) * 100)}
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
    backgroundColor: "#feef9a",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
  }
});
