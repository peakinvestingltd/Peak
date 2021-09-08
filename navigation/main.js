import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, View, ScrollView, Text, StatusBar } from "react-native";
import { ScreenHeight, ScreenWidth } from "react-native-elements/dist/helpers";
import { auth } from "../components/Firebase/firebase";
import navigationTheme from "./navigationTheme";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AuthUserContext } from "./AuthUserProvider";
import Spinner from "../components/Spinner";
import header from "../components/header";
export default function Main() {
  return (
    <View
      style={{
        height: ScreenHeight,
        width: ScreenWidth,
        backgroundColor: "#172041",
      }}
    >
      {/* {header()} */}
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </View>
  );
}
