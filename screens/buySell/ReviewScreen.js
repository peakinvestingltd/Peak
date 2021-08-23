import React, { Component, useState } from "react";
import { styles } from "../../css/styles.js";
import { uid, user } from "../../components/Firebase/firebase";
import { practiceTrade, placeTrade } from "../../utils/functions";
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
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";
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
  let ownedShares = review.ownedShares;
  if (!ownedShares) {
    ownedShares = 0;
  }
  const tradeObj = {
    totalCost: review.totalPrice,
    ticker: review.ticker,
    price: Number(review.price),
    type: review.type,
    logo: review.logo,
    ownedShares: ownedShares,
    fullDate: fullDate,
    date: date,
    balance: Number(review.balance),
    strAmount: strAmount,
    amount: review.amount,
    account: "GIA",
    currency: review.currency,
    stockType: "practiceStock",
    name: review.stockName,
  };
  console.log(review.type);
  console.log("fsda");
  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
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
              //placeTrade(tradeObj);
              practiceTrade(tradeObj);
              props.navigation.navigate("Stock");
              // firebase.auth().onAuthStateChanged((user) => {
              //   console.log(type);

              //   db.collection("users")
              //     .doc(user.uid)
              //     .collection("history")
              //     .doc(`${date}`)
              //     .set({
              //       type: type,
              //       stock: ticker,
              //       cost: strAmount,
              //       date: fullDate,
              //       amount: amount,
              //       timestamp: date,
              //       logo: logo,
              //     });

              //   if (type == "Bought") {
              //     db.collection("users")
              //       .doc(user.uid)
              //       .collection("funds")
              //       .doc("practiceBalance")
              //       .set({
              //         amount: Number(balance) - Number(totalCost),
              //       });

              //     db.collection("users")
              //       .doc(user.uid)
              //       .collection("practiceInvestments")
              //       .doc(ticker)
              //       .set({
              //         amount: Number(ownedShares) + Number(amount),
              //         price: price,
              //         investment: (
              //           (Number(ownedShares) + Number(amount)) *
              //           Number(price)
              //         ).toFixed(2),
              //         ticker: ticker,
              //         logo: logo,
              //       });
              //   } else {
              //     db.collection("users")
              //       .doc(user.uid)
              //       .collection("funds")
              //       .doc("practiceBalance")
              //       .set({
              //         amount: Number(balance) + Number(totalCost),
              //       });

              //     if (Number(ownedShares) - Number(amount) == 0) {
              //       db.collection("users")
              //         .doc(user.uid)
              //         .collection("practiceInvestments")
              //         .doc(ticker)
              //         .delete()
              //         .then(() => console.log("user deleted"));
              //     } else {
              //       console.log(Number(ownedShares) - Number(amount));
              //       db.collection("users")
              //         .doc(user.uid)
              //         .collection("practiceInvestments")
              //         .doc(ticker)
              //         .set({
              //           amount: Number(ownedShares) - Number(amount),
              //           price: price,
              //           investment:
              //             (Number(ownedShares) - Number(amount)) *
              //             Number(price).toFixed(2),
              //           ticker: ticker,
              //           logo: logo,
              //         });
              //     }
              //   }

              //   props.navigation.navigate("Stock");
              //   console(props.navigation);
              // });
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
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
