import {
  StyleSheet,
  View,
} from "react-native";

import { ResultPage } from "../components/resultPage";
import { UndefinedIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Undefined({ route }: any) {
  const { resultadoBackend } = route.params;

  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Indefinido"
        borderColor="#878787"
        icon={<UndefinedIcon size={140} color="#878787" />}
      />

      <Nav />
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
    paddingTop: 45,
  },
});