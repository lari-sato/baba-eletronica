import {View,} from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { BabyBottle } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";

export default function Hungry({ route }: any) {
  const { resultadoBackend } = route.params;
  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Fome"
        borderColor="#E7BC0F"
        icon={<BabyBottle size={120} color="#E7BC0F" />}
      />

      <ExplanationButton
        description="O choro classificado como fome pode indicar que o bebê precisa se alimentar. Alguns sinais associados incluem busca pelo peito ou mamadeira, levar as mãos à boca e inquietação."
        buttonColor="#E7BC0F"
      />

      <Nav activeTab="monitor" />
    </View>
  );
}
