import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../../css/styles.js";
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";
import { AppLoading } from "expo";
//fonts
import {
  useFonts,
  NunitoSans_200ExtraLight,
} from "@expo-google-fonts/nunito-sans";
export default function InviteFriendsScreen(props) {
  const [fontLoading, error] = useFonts({
    NunitoSans_200ExtraLight,
  });
  if (!fontLoading) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Invite Friends</Text>
        </Button>
        <Text
          style={{
            textTransform: "none",
            color: "white",
            fontSize: 30,
            fontFamily: "NunitoSans_200ExtraLight",
          }}
        >
          testing font
        </Text>
        <Text
          style={{
            textTransform: "none",
            color: "white",
            fontSize: 30,
          }}
        >
          testing font
        </Text>
      </ScrollView>
      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
