import React, { Component, useState } from "react";
import { styles } from "../../css/styles.js";
import { uid, user } from "../../components/Firebase/firebase";

//-----------------------------------------------------

import * as firebase from "firebase";
import "firebase/database";

const db = firebase.firestore();

//------------------------------------------------------

import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
//import { Title, Button, Card } from "react-native-paper";
import {
  DefaultTheme,
  Card,
  Chip,
  Button,
  Searchbar,
  Colors,
  IconButton,
  Title,
  Provider as PaperProvider,
} from "react-native-paper";
import { Value } from "react-native-reanimated";
import { ThemeConsumer } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default function ReviewScreen(props) {
  console.log("vvvvvvvvvv");
  console.log(props);

  const review = props.route.params;
  const balance = review.balance;
  const totalCost = review.totalPrice;
  let strAmount;
  const ticker = review.ticker;
  const amount = review.amount;
  const price = review.price;
  const type = review.type;
  const logo = review.logo;
  const ownedShares = review.ownedShares;

  if (type == "Bought") {
    strAmount = `-£${props.route.params.totalPrice}`;
  } else if (type == "Sold") {
    strAmount = `+£${props.route.params.totalPrice}`;
  }
  const date = Date.now();
  const mounths = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const newDate = new Date(date);
  const DD = newDate.getDate();
  const MMnum = newDate.getMonth();
  const YYYY = newDate.getFullYear();
  const MM = mounths[MMnum];
  const fullDate = DD + " " + MM + " " + YYYY;
  console.log(ticker);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.topCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
          <View>
            <Title style={styles.titleText}>Portfolio Balance</Title>
            <Button
              mode="contained"
              style={{ backgroundColor: Colors.orange500, borderRadius: 20 }}
            >
              £{balance}
            </Button>
          </View>
          <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
        </View>
      </Card>
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Review Order</Text>
        </Button>
        <View style={styles.defaultTop}>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: props.route.params.logo,
              }}
            />
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Text style={styles.stockName}>{review.stockName}</Text>
          </View>

          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
            <Text style={styles.stockTicker}>
              {ticker}-STOCK-{review.country}
            </Text>
          </View>
        </View>

        <View style={styles.defaultView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Order Type</Text>
            <Text style={styles.listText2}>{review.orderType}</Text>
          </View>
        </View>

        <View style={styles.defaultView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Number of Shares</Text>
            <Text style={styles.listText2}>{review.amount}</Text>
          </View>
        </View>

        <View style={styles.defaultView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Value</Text>
            <Text style={styles.listText2}>{review.totalPrice}</Text>
          </View>
        </View>

        <View style={styles.defaultView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Commision</Text>
            <Text style={styles.listText2}>0%</Text>
          </View>
        </View>

        <View style={styles.defaultView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>FX fee</Text>
            <Text style={styles.listText2}>0%</Text>
          </View>
        </View>
        <View style={styles.defaultEndView}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Total</Text>
            <Text style={styles.listText2}>{review.totalPrice}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 15,
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          <Button
            style={styles.tradeReviewButton}
            onPress={() => {
              firebase.auth().onAuthStateChanged((user) => {
                console.log(type);

                if (type == "Bought") {
                  db.collection("users")
                    .doc(user.uid)
                    .collection("funds")
                    .doc("practiceBalance")
                    .set({
                      amount: Number(balance) - Number(totalCost),
                    });

                  db.collection("users")
                    .doc(user.uid)
                    .collection("practiceInvestments")
                    .doc(ticker)
                    .set({
                      amount: Number(ownedShares) + Number(amount),
                      price: price,
                      investment: (
                        (Number(ownedShares) + Number(amount)) *
                        Number(price)
                      ).toFixed(2),
                      ticker: ticker,
                      logo: logo,
                    });
                } else {
                  db.collection("users")
                    .doc(user.uid)
                    .collection("funds")
                    .doc("practiceBalance")
                    .set({
                      amount: Number(balance) + Number(totalCost),
                    });

                  db.collection("users")
                    .doc(user.uid)
                    .collection("history")
                    .doc(`${date}`)
                    .set({
                      type: type,
                      stock: ticker,
                      cost: strAmount,
                      date: fullDate,
                      amount: amount,
                      timestamp: date,
                      logo: logo,
                    });

                  if (Number(ownedShares) - Number(amount) == 0) {
                    db.collection("users")
                      .doc(user.uid)
                      .collection("practiceInvestments")
                      .doc(ticker)
                      .delete()
                      .then(() => console.log("user deleted"));
                  } else {
                    console.log(Number(ownedShares) - Number(amount));
                    db.collection("users")
                      .doc(user.uid)
                      .collection("practiceInvestments")
                      .doc(ticker)
                      .set({
                        amount: Number(ownedShares) - Number(amount),
                        price: price,
                        investment:
                          (Number(ownedShares) - Number(amount)) *
                          Number(price).toFixed(2),
                        ticker: ticker,
                        logo: logo,
                      });
                  }
                }

                props.navigation.navigate("Stock");
                console(props.navigation);
              });
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
          </Button>
          <Button
            style={styles.tradeCancleButton}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={styles.orangeButtonText}>Cancel</Text>
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
          onPress={() => props.navigation.navigate("Stock")}
        ></IconButton>
        <IconButton
          icon={"account"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Portfolio")}
        ></IconButton>
        <IconButton
          icon={"newspaper"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("News")}
        ></IconButton>
        <IconButton
          icon={"magnify"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Search")}
        ></IconButton>
        <IconButton
          icon={"menu"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Home")}
        ></IconButton>
      </View>
    </SafeAreaView>
  );
}
