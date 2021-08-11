import React, { useState } from "react";
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

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

export default function InviteFriendsScreen({ navigation }) {
  const selected = {
    height: 200,
    width: ScreenWidth / 4,
    backgroundColor: "orange",
    margin: 15,
  };
  const unselected = {
    height: 200,
    width: ScreenWidth / 4,
    backgroundColor: "red",
    margin: 15,
  };
  const [selectedBox, setSelectedBox] = useState("one");

  function setStyle(box) {
    if (box == selectedBox) {
      return selected;
    } else {
      return unselected;
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
              onPress={() => this.props.navigation.navigate("Chat")}
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
          <Button style={styles.pageButton} onPress={() => navigation.goBack()}>
            <Text style={styles.pageButtonText}>&lt; Invite Friends</Text>
          </Button>

          <View style={{ flexDirection: "row" }}>
            <Button
              onPress={() => setSelectedBox("one")}
              style={setStyle("one")}
            >
              1
            </Button>
            <Button
              onPress={() => setSelectedBox("two")}
              style={setStyle("two")}
            >
              2
            </Button>
            <Button
              onPress={() => setSelectedBox("three")}
              style={setStyle("three")}
            >
              3
            </Button>
          </View>
        </ScrollView>

        <View style={styles.footer}></View>
        <View style={styles.navBar}>
          <IconButton
            icon={"chart-line-variant"}
            color={"white"}
            size={35}
            style={styles.navButton}
            onPress={() => navigation.navigate("Stock")}
          ></IconButton>
          <IconButton
            icon={"account"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Portfolio")}
          ></IconButton>
          <IconButton
            icon={"newspaper"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("News")}
          ></IconButton>
          <IconButton
            icon={"magnify"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Search")}
          ></IconButton>
          <IconButton
            icon={"menu"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Home")}
          ></IconButton>
        </View>
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
