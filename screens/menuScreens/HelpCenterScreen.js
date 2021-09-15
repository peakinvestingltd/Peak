import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import Header from "../../components/header";
import navBar from "../../components/navBar";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { styles, texts, images, views, buttons } from "../../css/styles.js";

import { AppLoading } from "expo";
import { useFonts, NunitoSans_300Light } from "@expo-google-fonts/nunito-sans";

export default function HelpCenterScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Help Center</Text>
        </Button>
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
