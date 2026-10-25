import { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { ResultadoBackend } from "../services/api";
import { iniciarNotificacoes } from "../services/notificacoes";

import Opening from "../screens/opening/opening";
import Register from "../screens/auth/register/register";
import Login from "../screens/auth/login/login";
import Welcome from "../screens/onboarding/welcome/welcome";
import Monitor from "../screens/monitor/monitor/monitor";
import Hungry from "../screens/results/hungry/hungry";
import Discomfort from "../screens/results/discomfort/discomfort";
import Sleepy from "../screens/results/sleepy/sleepy";
import Pain from "../screens/results/pain/pain";
import Undefined from "../screens/results/undefined/undefined";
import PossibleResults from "../screens/results/possibleResults/possibleResults";
import History from "../screens/history/history/history";
import Settings from "../screens/settings/settings/settings";
import WifiScreen from "../screens/settings/wifi/wifi";

type ParamsResultado = { resultadoBackend: ResultadoBackend };

export type RootStackParamList = {
  Opening: undefined;
  Register: undefined;
  Login: undefined;
  Welcome: undefined;
  Monitor: undefined;
  Hungry: ParamsResultado | undefined;
  Discomfort: ParamsResultado | undefined;
  Sleepy: ParamsResultado | undefined;
  Undefined: ParamsResultado | undefined;
  Pain: ParamsResultado | undefined;
  PossibleResults: ParamsResultado | undefined;
  History: undefined;
  Settings: undefined;
  WifiScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  useEffect(() => iniciarNotificacoes(), []);

  return (
    <Stack.Navigator
      initialRouteName="Opening"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Opening" component={Opening} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="Monitor" component={Monitor} />
      <Stack.Screen name="Hungry" component={Hungry} />
      <Stack.Screen name="Discomfort" component={Discomfort} />
      <Stack.Screen name="Sleepy" component={Sleepy} />
      <Stack.Screen name="Pain" component={Pain} />
      <Stack.Screen name="Undefined" component={Undefined} />
      <Stack.Screen name="PossibleResults" component={PossibleResults} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="WifiScreen" component={WifiScreen} />
    </Stack.Navigator>
  );
}
