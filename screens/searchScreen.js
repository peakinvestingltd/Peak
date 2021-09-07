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
import assetUnivers from "../utils/assetUniverse.js";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../css/styles.js";
import header from "../components/header.js";
import navBar from "../components/navBar.js";

export default function SearchScreen(props) {
  function searchButton(catagory, asset) {
    return (
      <TouchableOpacity
        onPress={() => {
          let assets = Object.keys(asset);

          props.navigation.navigate("Stock2", {
            funds: props.route.params.funds,
            cat: catagory,
            assets: assets,
          });
        }}
      >
        <View style={styles.infoSection}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: 10,
            }}
          >
            <Text style={styles.infoTopText}>{catagory}</Text>
          </View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <EvilIcons name="chevron-right" size={40} color="white" />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Search </Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            let assets = Object.keys(
              assetUnivers.assetUnivers.communicationServices
            );

            props.navigation.navigate("Stock2", {
              funds: props.route.params.funds,
              cat: "Communication Services",
              assets: assets,
            });
          }}
        >
          <View style={styles.infoCardTop}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.infoTopText}>Communication Services</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <EvilIcons name="chevron-right" size={40} color="white" />
            </View>
          </View>
        </TouchableOpacity>
        {searchButton(
          "Consumer Discretionary",
          assetUnivers.assetUnivers.consumerDiscretionary
        )}
        {searchButton(
          "Consumer Staples",
          assetUnivers.assetUnivers.consumerStaples
        )}
        {searchButton("Energy", assetUnivers.assetUnivers.energy)}
        {searchButton("Financials", assetUnivers.assetUnivers.financials)}
        {searchButton("Healthcare", assetUnivers.assetUnivers.healthcare)}
        {searchButton("Industrials", assetUnivers.assetUnivers.industrials)}
        {searchButton(
          "Information Technology",
          assetUnivers.assetUnivers.informationTechnology
        )}
        {searchButton("Materials", assetUnivers.assetUnivers.materials)}
        {searchButton("Real Estate", assetUnivers.assetUnivers.realEstate)}
        <TouchableOpacity
          onPress={() => {
            let assets = Object.keys(assetUnivers.assetUnivers.utilities);
            props.navigation.navigate("Stock2", {
              funds: props.route.params.funds,
              cat: "Utilities",
              assets: assets,
            });
          }}
        >
          <View style={styles.infoCardBottom}>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginLeft: 10,
              }}
            >
              <Text style={styles.infoTopText}>Utilities</Text>
            </View>
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                marginRight: 10,
              }}
            >
              <EvilIcons name="chevron-right" size={40} color="white" />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ height: 15 }}></View>
      </ScrollView>

      {navBar(props, props.route.params.funds, "search")}
    </SafeAreaView>
  );
}
