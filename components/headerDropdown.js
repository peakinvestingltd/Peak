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
  getSignUpProgress,
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
  Linking,
} from "react-native";

import { ScreenWidth, ScreenHeight } from "react-native-elements/dist/helpers";

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

const screenWidth = Dimensions.get("window").width;

export let userBalance = "Wallet";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Change />
    <Transition.Out type="fade" duration={400} />
  </Transition.Together>
);

export default function HeaderDropDown(props) {
  const ref = React.useRef();
  const [headerStyle, setHeaderStyle] = useState(styles.topCard);
  const [expanded, setExpanded] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("practice");

  function setStyle(box, selected, unselected) {
    if (box == selectedBox) {
      return selected;
    } else {
      return unselected;
    }
  }
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
  const [GIASelected, setGIASelected] = useState(styles.GIACardUnselected);
  const [ISASelected, setISASelected] = useState(styles.ISACardUnselected);
  const [practiceSelected, setPracticeSelected] = useState(styles.practiceCard);
  const [selectedFunds, setSelectedFunds] = useState("0");
  const [practiceFunds, setPracticeFunds] = useState(null);
  const [account, setAccount] = useState("practice account");
  const [signUp, setSignUp] = useState("done");
  function triggerGetBalance() {
    if (selectedBox == "one") {
      firebase.auth().onAuthStateChanged((user) => {
        getBalance(user).then((bal) => {
          setSelectedFunds(bal.toFixed(2));
          setPracticeFunds(
            `£${bal.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}`
          );
        });
      });
    }
  }
  function setCardBalance(account) {
    return practiceFunds;
  }

  function setFunds() {
    if (selectedFunds == "loading...") {
      triggerGetBalance();
      return selectedFunds;
    }

    return `£${selectedFunds.replace(/\d(?=(\d{3})+\.)/g, "$&,")}`;
  }

  function signUpProgress() {
    firebase.auth().onAuthStateChanged((user) => {
      getSignUpProgress(user.uid).then((res) => {
        setSignUp(res);
      });
    });
    if (signUp != "done") {
      return (
        <TouchableOpacity onPress={() => {}}>
          <View
            style={{
              height: 100,
              width: ScreenWidth - 20,
              margin: 10,
              backgroundColor: "gray",
            }}
          >
            <Text>Sign up progress {(signUp - 1) * 20}%</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          {signUpProgress()}
          <ScrollView horizontal={true}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => setSelectedBox("one")}>
                <View
                  style={setStyle(
                    "one",
                    styles.GIACard,
                    styles.GIACardUnselected
                  )}
                >
                  <View style={{ height: 50, width: 50, margin: 5 }}>
                    <View
                      style={{
                        position: "absolute",
                        height: 50,
                        width: 50,
                        backgroundColor: "black",
                        borderRadius: 25,
                        opacity: 0.1,
                      }}
                    />
                    <Image
                      source={require("../assets/wallet.png")}
                      style={{
                        width: 40,
                        height: 40,
                        margin: 5,
                        borderRadius: 25,
                      }}
                    />
                  </View>

                  <View
                    style={{
                      height: ScreenHeight / 3.4 - 40,
                      width: "100%",
                      justifyContent: "center",
                      marginLeft: 15,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 25,
                          fontWeight: "bold",
                        }}
                      >
                        {setCardBalance("practice")}
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          marginTop: 10,
                        }}
                      >
                        Practice account
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBox("two")}>
                <View
                  style={setStyle(
                    "two",
                    styles.ISACard,
                    styles.ISACardUnselected
                  )}
                >
                  <View style={{ height: 50, width: 50, margin: 5 }}>
                    <View
                      style={{
                        position: "absolute",
                        height: 50,
                        width: 50,
                        backgroundColor: "black",
                        borderRadius: 25,
                        opacity: 0.1,
                      }}
                    />
                    <Image
                      source={require("../assets/wallet.png")}
                      style={{
                        width: 40,
                        height: 40,
                        margin: 5,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      height: ScreenHeight / 3.4 - 40,
                      width: "100%",
                      justifyContent: "center",
                      marginLeft: 15,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 30,
                          fontWeight: "bold",
                          letterSpacing: 1.2,
                        }}
                      >
                        Coming soon!
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          marginTop: 10,
                        }}
                      >
                        ISA account
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSelectedBox("three")}>
                <View
                  style={setStyle(
                    "three",
                    styles.practiceCard,
                    styles.practiceCardUnselected
                  )}
                >
                  <View style={{ height: 50, width: 50, margin: 5 }}>
                    <View
                      style={{
                        position: "absolute",
                        height: 50,
                        width: 50,
                        backgroundColor: "black",
                        borderRadius: 25,
                        opacity: 0.1,
                      }}
                    />
                    <Image
                      source={require("../assets/wallet.png")}
                      style={{
                        width: 40,
                        height: 40,
                        margin: 5,
                        borderRadius: 25,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      height: ScreenHeight / 3.4 - 40,
                      width: "100%",
                      justifyContent: "center",
                      marginLeft: 15,
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 30,
                          fontWeight: "bold",
                          letterSpacing: 1.2,
                        }}
                      >
                        Coming soon!
                      </Text>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 20,
                          marginTop: 10,
                        }}
                      >
                        Peak account
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginLeft: 15,
              marginRight: 15,
              marginTop: 30,
              //   justifyContent: "space-around",
            }}
          >
            <Button
              onPress={() => {
                console.log("deposit");
              }}
              //  width={screenWidth / 2 - 50}
              style={styles.orangeFillButton}
              mode="contained"
            >
              Deposit
            </Button>
            <Button
              marginLeft={10}
              color={"#ff7f00"}
              style={styles.FavouriteButton}
              onPress={() => {
                console.log("withdraw");
              }}
            >
              Withdraw
            </Button>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}></View>
      {/* {navBar(props, props.route.params.funds)} */}
    </SafeAreaView>
  );
}
