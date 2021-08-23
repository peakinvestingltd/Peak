import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";

export default function ManageFundsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Manage Funds</Text>
        </Button>
      </ScrollView>

      <View style={styles.footer}></View>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
