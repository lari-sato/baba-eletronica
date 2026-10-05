import {
  View,
} from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { SleepyIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/nav/nav";
import { styles } from "./styles";

export default function Sleepy({ route }: any) {
  const { resultadoBackend } = route.params;

  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Sono"
        borderColor="#8D49A4"
        icon={<SleepyIcon size={160} color="#8D49A4" />}
      />
      <Nav />
    </View>
  );
}
