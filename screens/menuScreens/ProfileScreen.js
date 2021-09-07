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

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

export default function ProfileScreen({ navigation }) {
  useStatusBar("light-content");

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Button style={styles.pageButton} onPress={() => navigation.goBack()}>
            <Text style={styles.pageButtonText}>&lt; Profile</Text>
          </Button>
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
