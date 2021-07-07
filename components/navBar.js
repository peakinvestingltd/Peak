import React from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View } from "react-native";

export default function navBar(props, funds) {
  return (
    <View style={styles.navBar}>
      <IconButton
        icon={"chart-line-variant"}
        color={"#ff7f00"}
        size={35}
        style={styles.navButton}
        onPress={() =>
          props.navigation.navigate("Stock", {
            funds: funds,
          })
        }
      ></IconButton>
      <IconButton
        icon={"account"}
        style={styles.navButton}
        size={35}
        color={"white"}
        onPress={() =>
          props.navigation.navigate("Portfolio", {
            funds: funds,
          })
        }
      ></IconButton>
      <IconButton
        icon={"newspaper"}
        style={styles.navButton}
        size={35}
        color={"white"}
        onPress={() =>
          props.navigation.navigate("News", {
            funds: funds,
          })
        }
      ></IconButton>
      <IconButton
        icon={"magnify"}
        style={styles.navButton}
        size={35}
        color={"white"}
        onPress={() =>
          props.navigation.navigate("Search", {
            funds: funds,
          })
        }
      ></IconButton>
      <IconButton
        icon={"menu"}
        style={styles.navButton}
        size={35}
        color={"white"}
        onPress={() =>
          props.navigation.navigate("Home", {
            funds: funds,
          })
        }
      ></IconButton>
    </View>
  );
}
