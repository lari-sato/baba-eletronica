import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import { ResultPage } from "../components/resultPage";
import { DiscomfortIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Discomfort() {
  return (
    <View style={styles.container}>
      <BackButton onPress={() => console.log("Voltar")} />
      <ResultPage
        time="14:30"
        percentage={70}
        result="Fome"
        borderColor="#ca420c"
        icon={<DiscomfortIcon size={130} color="#ca420c" />}
      />
      <TouchableOpacity style={styles.infoButton}>
        <Ionicons name="help-outline" size={35} color="#454545" />
        <Text style={styles.infoButtonText}>ajuda</Text>
      </TouchableOpacity>
      <Nav
        onPressHistory={() => console.log("Ir para Histórico")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EA8E3D",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45,
  },
  infoButton: {
    backgroundColor: "#f7f9fa",
    width: "20%",
    height: 70,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -10,

    elevation: 6,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,

    borderWidth: 3.3,
    borderColor: "#454545",
  },
  infoButtonText: {
    fontSize: 16,
    color: "#454545",
    marginTop: -5,
    fontWeight: "500",
  },
});
