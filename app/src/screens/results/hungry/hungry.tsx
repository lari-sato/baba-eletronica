import {View,} from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { BabyBottle } from "../../../components/babyIcons/babyIcons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";

export default function Hungry({ route }: any) {
  const { resultadoBackend } = route.params;

  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(Number(resultadoBackend?.confianca ?? 0) * 100);

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Fome"
        borderColor="#E7BC0F"
        icon={<BabyBottle size={120} color="#E7BC0F" />}
      />
      
      <Nav activeTab="monitor" />
    </View>
  );
}
