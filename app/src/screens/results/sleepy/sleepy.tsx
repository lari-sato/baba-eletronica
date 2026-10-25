import { View } from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { SleepyIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";

export default function Sleepy({ route }: any) {
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
        result="Sono"
        borderColor="#8D49A4"
        icon={<SleepyIcon size={160} color="#8D49A4" />}
      />

      <ExplanationButton
        description="O choro classificado como sono pode indicar que o bebê está cansado ou com dificuldade para adormecer. Alguns sinais associados incluem bocejos, irritabilidade, movimentos agitados e esfregar os olhos."
        buttonColor="#8D49A4"
      />

      <Nav activeTab="monitor" />
    </View>
  );
}
