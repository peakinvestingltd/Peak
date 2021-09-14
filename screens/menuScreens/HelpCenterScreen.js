import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import Header from "../../components/header";
import navBar from "../../components/navBar";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { styles } from "../../css/styles.js";

import { AppLoading } from "expo";
import { useFonts, NunitoSans_300Light } from "@expo-google-fonts/nunito-sans";

export default function HelpCenterScreen(props) {
  let [fontsLoaded, error] = useFonts({
    NunitoSans_300Light,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Help Center</Text>
        </Button>

        <Text style={{ color: "white", fontSize: 30 }}>testing fonts</Text>
        <Text
          style={{
            color: "white",
            fontFamily: "NunitoSans_300Light",
            fontSize: 30,
          }}
        >
          testing fonts
        </Text>
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
