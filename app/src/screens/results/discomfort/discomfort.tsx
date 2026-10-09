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
          title="O que é Dor?"
          description="O choro classificado como dor pode estar associado a dor no corpo ou cólica."
          buttonColor="#ca420c"
          titleColor="#ca420c"
        />
      <Nav activeTab="monitor" />
    </View>
  );
}