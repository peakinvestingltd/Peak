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

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1b2855" />
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
              onPress={() => {
                props.navigation.navigate("NotificationSettings");
              }}
            >
              Notifacation Settings
            </Button>
            <Button
              color="white"
              style={styles.settingsButton}
              onPress={() => {
                props.navigation.navigate("ManageFunds");
              }}
            >
              Manage Funds
            </Button>
            <Button
              color="white"
              style={styles.settingsButton}
              onPress={() => {
                props.navigation.navigate("InviteFriends");
              }}
            >
              Invite Friends
            </Button>
            <Button
              color="white"
              style={styles.settingsButtonBottom}
              onPress={() => {
                props.navigation.navigate("PeakStore");
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
                  funds: 1000,
                });
              }}
            >
              Settings and Privacy
            </Button>

            <Button
              color="white"
              style={styles.settingsButtonBottom}
              onPress={() => {
                props.navigation.navigate("HelpCenter");
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
            <Text style={styles.logoutText}>Logout</Text>
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

// const [expanded, setExpanded] = React.useState(true);

// const handlePress = () => setExpanded(!expanded);

// const [index, setIndex] = React.useState(0);
// const [routes] = React.useState([
//   {
//     key: "stock",
//     title: "Home",
//     icon: "details",
//     color: navBarColor,
//     params: { navigation },
//   },
//   {
//     key: "home",
//     title: "Portfolio",
//     icon: "account",
//     params: { navigation },
//     color: navBarColor,
//   },
//   {
//     key: "news",
//     title: "News",
//     icon: "newspaper",
//     params: { navigation },
//     color: navBarColor,
//   },
//   {
//     key: "recents",
//     title: "Settings",
//     icon: "menu",
//     params: { navigation },
//     color: navBarColor,
//   },
// ]);

// const renderScene = BottomNavigation.SceneMap({
//   home: MenuScreen,
//   news: NewsRoute,
//   stock: StockScreen,
//   recents: RecentsRoute,
// });

// useStatusBar("light-content");
