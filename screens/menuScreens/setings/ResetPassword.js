import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, TextInput } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import header from "../../../components/header.js";
import navBar from "../../../components/navBar.js";
import { passwordReset } from "../../../components/Firebase/firebase.js";
export default function RestPassword(props) {
  let email = "1";
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Reset Password</Text>
        </Button>
        <View style={styles.card}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              onChangeText={(input) => {
                email = input;
              }}
            ></TextInput>
          </View>
          <Button
            color="white"
            uppercase={false}
            style={styles.orangeFillButton}
            onPress={() => {
              console.log(email);
              passwordReset(email).then((res) => {
                console.log(res);
              });
            }}
          >
            Reset Password
          </Button>
          <View style={{ height: 20 }} />
        </View>
      </ScrollView>

      <View style={styles.footer}></View>
    </SafeAreaView>
  );
}
