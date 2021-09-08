import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";

import Header from "../../components/header";
import navBar from "../../components/navBar";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { styles } from "../../css/styles.js";

export default function HelpCenterScreen(props) {
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
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
