import {
  StyleSheet,
  View,
} from "react-native";

import { ResultPage } from "../components/resultPage";
import { UndefinedIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Undefined() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <ResultPage
        time="14:30"
        percentage={70}
        result="Indefinido"
        borderColor="#878787"
        icon={<UndefinedIcon size={140} color="#878787" />}
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
    backgroundColor: "#DADADA",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
  }
});
