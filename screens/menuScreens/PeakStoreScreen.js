import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { views, buttons, texts, images, styles } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Header from "../../components/header.js";
import navBar from "../../components/navBar.js";

export default function PeakStoreScreen(props) {
  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Peak Store</Text>
        </Button>
      </ScrollView>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
