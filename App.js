import React from "react";
import { SafeAreaView, View, ScrollView, Text, StatusBar } from "react-native";

import header from "./components/header";
import navBar from "./components/navBar";
import Providers from "./navigation";

export default function App() {
  return <Providers />;
}
