import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
    <Routes/>
    </NavigationContainer>
  );
}
// <Routes/>
// <Sleepy/>
// <Pain/>
// <Discomfort/>
// <History/>
// <Hungry/>
// <Undefined/>
// <WifiScreen />;
// <Login/>
// <Settings/>


//import Sleepy from './src/screens/sleepy';
//import Pain from './src/screens/pain';
//import Discomfort from './src/screens/discomfort';
//import History from './src/screens/history';
//import Hungry from './src/screens/hungry';
//import Undefined from './src/screens/undefined';
//import WifiScreen from "./src/screens/wifiScreen";
//import Login from "./src/screens/login";
//import Settings from "./src/screens/settings";