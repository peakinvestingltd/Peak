import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../../css/styles.js";
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";
export default function NotificationSettingsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Notification Settings</Text>
        </Button>
      </ScrollView>
      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
