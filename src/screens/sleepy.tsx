import {
  StyleSheet,
  View,
} from "react-native";
import { ResultPage } from "../components/resultPage";
import { SleepyIcon } from "../components/babyIcons";
import { BackButton } from "../components/backButton";
import { Nav } from "../components/nav";

export default function Sleepy() {
  return (
    <View style={styles.container}>
      <BackButton />
      <ResultPage
        time="14:30"
        percentage={70}
        result="Sono"
        borderColor="#8D49A4"
        icon={<SleepyIcon size={160} color="#8D49A4" />}
      />
      <Nav 
        onPressHistory={() => navigation.navigate("History")}
        onPressSettings={() => console.log("Ir para Configurações")}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E4C9F4",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingBottom: 30,
    paddingTop: 45
  }
});
