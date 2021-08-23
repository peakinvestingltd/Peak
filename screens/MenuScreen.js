import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
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
import header from "../components/header.js";
import navBar from "../components/navBar.js";

import * as firebase from "firebase";
import "firebase/database";

const db = firebase.firestore();

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";

import { logout, user } from "../components/Firebase/firebase";

import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../css/styles.js";

export default function MenuScreen(props) {
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  function goToNextRegister(num) {
    props.navigation.navigate(`Register${num}`);
  }
  function goToRegister2() {
    props.navigation.navigate("Register2");
  }

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {header(props, props.route.params.funds)}
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              height: 40,
            }}
          >
            <Text style={styles.menuName}>Jhon Doe</Text>
            <Text style={styles.menuEmail}>Jhondoe@gmail.com</Text>
          </View>

          <View style={styles.settingsCard}>
            <Button
              color="white"
              style={styles.settingsButtonTop}
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
              style={styles.settingsButton}
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
              style={styles.settingsButton}
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
              style={styles.settingsButton}
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
              style={styles.settingsButtonBottom}
              onPress={() => {
                props.navigation.navigate("PeakStore", {
                  funds: props.route.params.funds,
                });
              }}
            >
              Peak Store
            </Button>
          </View>
          <View style={styles.settingsCard}>
            <Button
              color="white"
              style={styles.settingsButtonTop}
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
              style={styles.settingsButtonBottom}
              onPress={() => {
                props.navigation.navigate("HelpCenter", {
                  funds: props.route.params.funds,
                });
              }}
            >
              Help Center
            </Button>
          </View>
          <Button
            mode="outlined"
            style={styles.logout}
            onPress={() => {
              async function signUp(user) {
                const userRef = db
                  .collection("users")
                  .doc(user.uid)
                  .collection("userInfo")
                  .doc("signUp");
                const doc = await userRef.get();
                if (!doc.exists) {
                  console.log("No such document!");
                  goToRegister2();
                } else {
                  console.log("Document data:", doc.data().signUp);
                  if (signUp != "compleat") {
                    goToNextRegister(doc.data().signUp);
                  } else {
                    console.log("h");
                  }
                }
              }

              firebase.auth().onAuthStateChanged((user) => {
                signUp(user);
              });
            }}
          >
            <Text style={styles.logoutText}>Complete sign up</Text>
          </Button>
          <Button mode="outlined" style={styles.logout} onPress={handleSignOut}>
            <Text style={styles.logoutText}>Logout</Text>
          </Button>
          <View style={{ height: 30 }}></View>
        </ScrollView>

        <View style={styles.footer}></View>
        {navBar(props, props.route.params.funds, "menu")}
      </SafeAreaView>
    </PaperProvider>
  );
}
