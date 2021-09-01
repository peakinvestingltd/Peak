import React from "react";
import { styles } from "../css/styles.js";
import { IconButton, Provider as PaperProvider } from "react-native-paper";
import { View, Button } from "react-native";

export default function navBar(props, funds, screen) {
  let stockColor = "white";
  let portfolioColor = "white";
  let newsColor = "white";
  let searchColor = "white";
  let menuColor = "white";

  if (screen === "stock") {
    stockColor = "#ff7f00";
  } else if (screen === "portfolio") {
    portfolioColor = "#ff7f00";
  } else if (screen === "news") {
    newsColor = "#ff7f00";
  } else if (screen === "search") {
    searchColor = "#ff7f00";
  } else if (screen === "menu") {
    menuColor = "#ff7f00";
  }
  return (
    <View style={styles.navBar}>
      <View>
        <IconButton
          icon={"newspaper"}
          style={styles.navButton}
          size={22}
          color={newsColor}
          onPress={() =>
            props.navigation.navigate("News", {
              funds: funds,
            })
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"account"}
          style={styles.navButton}
          size={22}
          color={portfolioColor}
          onPress={() =>
            props.navigation.navigate("Portfolio", {
              funds: funds,
            })
          }
        ></IconButton>
      </View>

      <View>
        <IconButton
          icon={require("../assets/newLogo.png")}
          color={stockColor}
          size={25}
          style={styles.navButton}
          onPress={() =>
            props.navigation.navigate("Stock", {
              funds: funds,
            })
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"magnify"}
          style={styles.navButton}
          size={22}
          color={searchColor}
          onPress={() =>
            props.navigation.navigate("Search", {
              funds: funds,
            })
          }
        ></IconButton>
      </View>
      <View>
        <IconButton
          icon={"menu"}
          style={styles.navButton}
          size={22}
          color={menuColor}
          onPress={() =>
            props.navigation.navigate("Home", {
              funds: funds,
            })
          }
        ></IconButton>
      </View>
    </View>
  );
}
