import { ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BackButton } from "../../../components/backButton/backButton";
import { Nav } from "../../../components/navBar/navBar";
import { PageHeader } from "../../../components/pageHeader/pageHeader";
import { ExplanationButton } from "../../../components/explanationButton/explanationButton";
import { styles } from "./styles";

export default function PossibleResults({ route }: any) {
  const { resultadoBackend } = route.params;
  const fase3 = resultadoBackend?.fase3;

  const classe1 = fase3?.classe_mais_provavel ?? "Primeira hipótese";
  const classe2 = fase3?.segunda_classe ?? "Segunda hipótese";

  const porcentagem1 = Math.round(
    Number(fase3?.prob_classe_1 ?? 0) * 100
  );

  const porcentagem2 = Math.round(
    Number(fase3?.prob_classe_2 ?? 0) * 100
  );

  const horario = resultadoBackend?.horario ?? "--:--";

  return (
    <View style={styles.container}>
      <View style={styles.backButtonWrapper}>
        <BackButton />
      </View>

      <View style={styles.mainContent}>
        <PageHeader
          title="Análise Inconclusiva"
          subtitle={`Choro detectado às ${horario}`}
          titleColor="#373737"
          subtitleColor="#696969"
          dividerColor="#113e7a26"
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.circle}>
            <Ionicons name="remove-circle-outline" size={130} color="#E8A6B8" />
          </View>

          <Text style={styles.disclaimer}>
            Análise feita por IA. Os resultados são estimativas e podem conter imprecisões.
          </Text>

          <View style={styles.card}>
            <View style={styles.option}>
              <Text style={styles.percentage}>
                {porcentagem1}%
              </Text>
              <Text style={styles.result}>
                {classe1}
              </Text>
            </View>

            <View style={styles.option}>
              <Text style={styles.percentage}>
                {porcentagem2}%
              </Text>
              <Text style={styles.result}>
                {classe2}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <ExplanationButton
        description="O choro analisado apresentou características próximas de duas causas diferentes. Verifique o bebê e acompanhe os próximos alertas."
        buttonColor="#E8A6B8"
      />

      <Nav activeTab="monitor" />
    </View>
  );
}
