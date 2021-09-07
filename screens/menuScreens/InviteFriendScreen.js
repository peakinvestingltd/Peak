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

import header from "../../components/header";
import navBar from "../../components/navBar";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { styles } from "../../css/styles.js";

export default function InviteFriendsScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Invite Friends</Text>
        </Button>
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
