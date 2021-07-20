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
import navBar from "../components/navBar";

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";

import { logout, user } from "../components/Firebase/firebase";

import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../css/styles.js";

export default function MenuScreen(props) {
  useStatusBar("light-content");

  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Card style={styles.topCard}>
          {/* --------------header------------------------------ */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onPress={() => props.navigation.navigate("Chat")}
              icon="chat-outline"
              color={Colors.orange500}
              size={30}
            />
            <View>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <Button mode="contained" style={styles.headerBall}>
                <Text style={{ color: "white" }}>£add funds</Text>
              </Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>
        {/* --------------header------------------------------ */}
        <ScrollView>
          <Image
            style={styles.avatar}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSO6BJZGYecexQmJTsc-OPa4IFiyJsOUP7Hw&usqp=CAU",
            }}
          />
          <Text style={styles.menuName}>Jhon Doe</Text>
          <Text style={styles.menuEmail}>Jhondoe@gmail.com</Text>

          <Button
            style={styles.button}
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Text style={styles.buttonText}>View Profille</Text>
          </Button>
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
              style={styles.settingsButton}
              onPress={() => {
                props.navigation.navigate("NotificationSettings");
              }}
            >
              Notifacation Settings
            </Button>
            <Button
              style={styles.settingsButton}
              onPress={() => {
                props.navigation.navigate("ManageFunds");
              }}
            >
              Manage Funds
            </Button>
            <Button
              style={styles.settingsButton}
              onPress={() => {
                props.navigation.navigate("InviteFriends");
              }}
            >
              Invite Friends
            </Button>
            <Button
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
              style={styles.settingsButtonBottom}
              onPress={() => {
                props.navigation.navigate("HelpCenter");
              }}
            >
              Help Center
            </Button>
          </View>

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

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    accent: "#95ff55",
  },
};

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
