import { View} from "react-native";

import { ResultPage } from "../../../components/resultPage/resultPage";
import { DiscomfortIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";

export default function Discomfort({ route }: any) {
  const { resultadoBackend } = route.params;
  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Desconforto"
        borderColor="#ca420c"
        icon={<DiscomfortIcon size={150} color="#ca420c" />}
      />
      <ExplanationButton
        description="O choro classificado como desconforto pode estar associado a estímulos físicos ou ambientais que causam incômodo ao bebê, como temperatura inadequada, fralda suja, posição desconfortável, excesso de estímulos ou irritação geral."
        buttonColor="#ca420c"
      />
      <Nav activeTab="monitor" />
    </View>
  );
}