import React, { useState } from "react";
import { SafeAreaView, View, Image, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import Header from "../../components/header.js";
import navBar from "../../components/navBar.js";
import * as firebase from "firebase";
import "firebase/database";
import { Provider as PaperProvider } from "react-native-paper";
import { logout } from "../../components/Firebase/firebase";
import { views, buttons, texts, images } from "../../css/styles.js";

export default function MenuScreen(props) {
  const [email, setEmail] = useState(null);
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  if (!email) {
    firebase.auth().onAuthStateChanged((user) => {
      setEmail(user.email);
    });
  }
  return (
    <PaperProvider>
      <SafeAreaView style={views.container}>
        <Header />
        <ScrollView>
          <View style={images.peakLogo}>
            <Image
              source={require("../../assets/newLogo.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View style={images.peakLogo}>
            <Text style={texts.white30}>Peak Investing</Text>
          </View>
          <Text style={texts.center}>{email}</Text>
          <Button
            color="white"
            style={buttons.settingsButtonTop}
            onPress={() => {
              props.navigation.navigate("History", {
                funds: props.route.params.funds,
              });
            }}
          >
            History
          </Button>
          <Button
            color="white"
            style={buttons.settingsButton}
            disabled={true}
            onPress={() => {
              props.navigation.navigate("NotificationSettings", {
                funds: props.route.params.funds,
              });
            }}
          >
            Notifacation Settings
          </Button>
          <Button
            color="white"
            style={buttons.settingsButton}
            disabled={true}
            onPress={() => {
              props.navigation.navigate("ManageFunds", {
                funds: props.route.params.funds,
              });
            }}
          >
            Manage Funds
          </Button>
          <Button
            color="white"
            style={buttons.settingsButton}
            onPress={() => {
              props.navigation.navigate("InviteFriends", {
                funds: props.route.params.funds,
              });
            }}
          >
            Invite Friends
          </Button>
          <Button
            color="white"
            style={buttons.settingsButtonBottom}
            onPress={() => {
              props.navigation.navigate("PeakStore", {
                funds: props.route.params.funds,
              });
            }}
          >
            Peak Store
          </Button>
          <Button
            color="white"
            style={buttons.settingsButtonTop}
            onPress={() => {
              props.navigation.navigate("SettingPrivacy", {
                funds: props.route.params.funds,
              });
            }}
          >
            Settings and Privacy
          </Button>
          <Button
            color="white"
            style={buttons.settingsButtonBottom}
            onPress={() => {
              props.navigation.navigate("HelpCenter", {
                funds: props.route.params.funds,
              });
            }}
          >
            Help Center
          </Button>
          <Button style={buttons.noFill} onPress={handleSignOut}>
            <Text style={texts.orangeButtonText}>Logout</Text>
          </Button>
        </ScrollView>
        {navBar(props, props.route.params.funds, "menu")}
      </SafeAreaView>
    </PaperProvider>
  );
}
