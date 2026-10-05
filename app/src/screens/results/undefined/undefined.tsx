import {
  View,
} from "react-native";

import { ResultPage } from "../../../components/resultPage/resultPage";
import { UndefinedIcon } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/nav/nav";
import { styles } from "./styles";

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