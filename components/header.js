import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../css/styles.js";
import { Transitioning, Transition } from "react-native-reanimated";
import {
  getBalance,
  getFinnhubPrices,
  getFinnhubChart,
  getFinnhubCompanyProfile,
  getToken,
  getSecclStock,
  getUserId,
  getUserInfo,
  getAccountInfo,
} from "../utils/functions";

import {
  Button,
  Colors,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Dimensions,
  Image,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

const screenWidth = Dimensions.get("window").width;

export let userBalance = "Wallet";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" duration={0} />
    <Transition.Change />
    <Transition.Out type="fade" duration={100} />
  </Transition.Together>
);

export default function header(props, funds) {
  const ref = React.useRef();
  const [headerStyle, setHeaderStyle] = useState(styles.topCard);
  const [expanded, setExpanded] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("practice");

  const [GIASelected, setGIASelected] = useState(styles.GIACardUnselected);
  const [ISASelected, setISASelected] = useState(styles.ISACardUnselected);
  const [practiceSelected, setPracticeSelected] = useState(styles.practiceCard);

  function triggerGetBalance() {
    firebase.auth().onAuthStateChanged((user) => {
      getBalance(user).then((bal) => {
        userBalance = bal.toFixed(2);
      });
    });
  }

  const portfolio = () => {
    const profile = (
      <View>
        <View style={styles.logoSegment}>
          <Image
            source={require("../assets/newLogo.png")}
            style={{ width: 50, height: 50 }}
          />
        </View>
        <View style={styles.logoSegment}>
          <Text style={{ fontSize: 30, color: "white", fontWeight: "700" }}>
            Peak Wallet
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={GIASelected}
              onPress={() => {
                console.log("press");
                if (GIASelected == styles.GIACardUnselected) {
                  setGIASelected(styles.GIACard);
                  if (practiceSelected == styles.practiceCard) {
                    setPracticeSelected(styles.practiceCardUnselected);
                  } else {
                    setISASelected(styles.ISACardUnselected);
                  }
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                GIA Account
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                {userBalance}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={ISASelected}
              onPress={() => {
                if (ISASelected == styles.ISACardUnselected) {
                  setISASelected(styles.ISACard);
                  if (practiceSelected == styles.practiceCard) {
                    setPracticeSelected(styles.practiceCardUnselected);
                  } else {
                    setGIASelected(styles.GIACardUnselected);
                  }
                }
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                ISA Account
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                  textTransform: "none",
                }}
              >
                {userBalance}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={practiceSelected} onPress={() => {}}>
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                }}
              >
                Practice Account
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 26,
                  fontWeight: "700",
                  marginLeft: 15,
                  marginBottom: 15,
                  textTransform: "none",
                }}
              >
                {userBalance}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View></View>
      </View>
    );
    if (expanded == true) {
      return profile;
    }
  };

  return (
    <Transitioning.View ref={ref} transition={transition} style={headerStyle}>
      {/* <Title style={styles.titleText}>Portfolio balance</Title> */}
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
          <Button
            mode="contained"
            style={styles.ballButton}
            onPress={() => {
              getToken().then((token) => {
                getUserId().then((user) => {
                  getUserInfo(user.uid).then((doc) => {
                    let data = doc.data();
                    getAccountInfo(token, data.GIA).then((res) => {
                      console.log(res);
                    });
                  });
                });
                // createOrder(token, "2921C", 2);
              });

              if (userBalance == "loading...") triggerGetBalance();
              ref.current.animateNextTransition();
              if (headerStyle == styles.topCard) {
                setHeaderStyle(styles.topCardExpanded);
                setExpanded(true);
              } else {
                setHeaderStyle(styles.topCard);
                setExpanded(false);
              }
            }}
          >
            {userBalance}
          </Button>
        </View>
        <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
      </View>
      {portfolio()}
    </Transitioning.View>
  );
}
