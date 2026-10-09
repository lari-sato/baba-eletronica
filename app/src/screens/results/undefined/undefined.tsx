import { View } from "react-native";
import { ResultPage } from "../../../components/resultPage/resultPage";
import { UndefinedIcon } from "../../../components/babyIcons/babyIcons";
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { styles } from "./styles";

export default function Undefined({ route }: any) {
  const { resultadoBackend } = route.params;

  const horario = resultadoBackend?.horario ?? "--:--";
  const porcentagem = Math.round(
    Number(resultadoBackend?.confianca ?? 0) * 100,
  );

  return (
    <View style={styles.container}>
      <BackButton />

      <ResultPage
        time={horario}
        percentage={porcentagem}
        result="Indefinido"
        borderColor="#878787"
        icon={<UndefinedIcon size={150} color="#878787" />}
      />
      <ExplanationButton
        title="O que isso significa?"
        description="A causa do choro não pôde ser estimada com confiança. Verifique o bebê e acompanhe os próximos alertas."
        buttonColor="#878787"
        titleColor="#353535"
      />

      <Nav activeTab="monitor" />
    </View>
  );
}
