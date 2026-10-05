import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Monitor from "../screens/monitor/monitor/monitor";
import Sleepy from '../screens/results/sleepy/sleepy';
import Pain from '../screens/results/pain/pain';
import Discomfort from '../screens/results/discomfort/discomfort';
import History from '../screens/history/history/history';
import Hungry from '../screens/results/hungry/hungry';
import Undefined from '../screens/results/undefined/undefined';
import WifiScreen from "../screens/settings/wifi/wifi";
import Login from "../screens/auth/login/login";
import Settings from "../screens/settings/settings/settings";

export type RootStackParamList = {
  Login: undefined;
  Monitor: undefined;
  Hungry: undefined;
  Discomfort: undefined;
  Sleepy: undefined;
  Undefined: undefined;
  Pain: undefined;
  History: undefined;
  Settings: undefined;
  WifiScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
  return (
    <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} 
        >
        <Stack.Screen name="Monitor" component={Monitor} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Hungry" component={Hungry} />
        <Stack.Screen name="Discomfort" component={Discomfort} />
        <Stack.Screen name="Sleepy" component={Sleepy} />
        <Stack.Screen name="Pain" component={Pain} />
        <Stack.Screen name="Undefined" component={Undefined} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="WifiScreen" component={WifiScreen} />
        </Stack.Navigator>
  );
}