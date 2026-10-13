import { useEffect } from "react";
import { Image, View } from "react-native";
import { styles } from "./styles";

export default function Opening({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/splash.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}