import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { views, buttons, texts, images, styles } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Header from "../../components/header.js";
import navBar from "../../components/navBar.js";
import {
  createAccount,
  getSecclId,
  getUserId,
  getToken,
  addAccountId,
} from "../../utils/functions";

export default function Peak(props) {
  return (
    <SafeAreaView style={views.container}>
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Peak Account</Text>
        </Button>
        <ScrollView>
          <View
            style={{
              width: ScreenWidth - 30,
              height: 500,
              backgroundColor: "gray",
              margin: 15,
              borderRadius: 10,
            }}
          >
            <Text>
              input info on the peak account and maybe on how to add and
              withdraw funds. add info on charged and subscription here?
            </Text>
          </View>
          <Button
            style={buttons.orangeFill}
            onPress={() => {
              let id;
              let user;
              getUserId()
                .then((res) => {
                  user = res;
                  return getSecclId(res);
                })
                .then((res) => {
                  id = res;
                  return getToken();
                })
                .then((res) => {
                  return createAccount("GIA", id, res, user);
                })
                .then((accountId) => {
                  console.log(accountId);
                  addAccountId(user, accountId, "peak");
                });
            }}
          >
            <Text style={texts.buttonText}>Activate</Text>
          </Button>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
