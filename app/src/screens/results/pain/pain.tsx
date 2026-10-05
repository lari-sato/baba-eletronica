import {
  View,
} from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { PainIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/nav/nav";
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
        borderColor="#8E0305"
        icon={<PainIcon size={160} color="#8E0305" />}
      />
      <Nav />
    </View>
  );
}
