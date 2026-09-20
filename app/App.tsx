import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { Routes } from "./src/routes";

import Discomfort from './src/screens/discomfort';
export default function App() {
  return (
    <NavigationContainer>
    <Discomfort/>
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