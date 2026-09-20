import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import Sleepy from '../screens/sleepy';
import Pain from '../screens/pain';
import Discomfort from '../screens/discomfort';
import History from '../screens/history';
import Hungry from '../screens/hungry';
import Undefined from '../screens/undefined';
import WifiScreen from "../screens/wifiScreen";
import Login from "../screens/login";
import Settings from "../screens/settings";

export type RootStackParamList = {
  Login: undefined;
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