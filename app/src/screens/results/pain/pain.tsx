import { View } from "react-native";

import { ResultPage } from "../../../components/resultPage/resultPage";
import { PainIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton"
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";

export default function Pain({ route }: any) {  
  const { resultadoBackend } = route.params;
  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Dor"
        borderColor="#b8191c"
        icon={<PainIcon size={160} color="#b8191c" />}
      />
      <ExplanationButton
          title="O que é Dor?"
          description="O choro classificado como dor pode estar associado a dor física em geral ou cólicas."
          buttonColor="#b8191c"
          titleColor="#bb0a0d"
        />

      <Nav activeTab="monitor" />
    </View>
  );
}
