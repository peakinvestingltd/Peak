import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Text,
  List,
  Paragraph,
  Colors,
  Title,
  Menu,
  Divider,
  Card,
  Button,
  BottomNavigation,
  IconButton,
} from "react-native-paper";

import Header from "../../components/header";
import navBar from "../../components/navBar";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { styles, views, texts, buttons, images } from "../../css/styles.js";

export default function InviteFriendsScreen(props) {
  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Invite Friends</Text>
        </Button>
      </ScrollView>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
