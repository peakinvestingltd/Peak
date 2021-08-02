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

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../css/styles.js";
import header from "../components/header.js";
import navBar from "../components/navBar.js";

export default function SearchScreen(props) {
  useStatusBar("light-content");

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {header()}
        {/* --------------header------------------------------ */}
        <ScrollView>
          <Button
            style={styles.pageButton}
            onPress={() => props.navigation.goBack()}
          >
            <Text style={styles.pageButtonText}>&lt; Search </Text>
          </Button>

          <View style={styles.settingsCard}>
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
              <View style={styles.settingsButtonTop}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Communication Services
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(
                  assetUnivers.assetUnivers.consumerDiscretionary
                );

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Consumer Discretionary",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Consumer Discretionary
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(
                  assetUnivers.assetUnivers.consumerStaples
                );

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Consumer Staples ",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Consumer Staples
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.energy);

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Energy",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Energy
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.financials);

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Financials",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Financials
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.healthcare);

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Healthcare",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Healthcare
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.industrials);

                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Industrials",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Industrials
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(
                  assetUnivers.assetUnivers.informationTechnology
                );
                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Information Technology",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Information Technology
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.materials);
                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Materials",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Materials
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                let assets = Object.keys(assetUnivers.assetUnivers.realEstate);
                props.navigation.navigate("Stock2", {
                  funds: props.route.params.funds,
                  cat: "Real Estate",
                  assets: assets,
                });
              }}
            >
              <View style={styles.settingsButton}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Real Estate
                </Text>
              </View>
            </TouchableOpacity>
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
              <View style={styles.settingsButtonBottom}>
                <Text
                  style={{
                    textTransform: "none",
                    color: "white",
                    flexDirection: "row",
                  }}
                >
                  Utilities
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={styles.footer}></View>
        {navBar(props, props.route.params.funds, "search")}
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
