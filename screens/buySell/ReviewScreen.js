import React, { Component, useState } from "react";
import { styles, views, buttons, texts, images } from "../../css/styles.js";
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
import Header from "../../components/header.js";
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
  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Review Order</Text>
        </Button>
        <View style={views.defaultTop}>
          <View style={views.rowCenter}>
            <Image
              style={images.stockImageSmall}
              source={{
                uri: props.route.params.logo,
              }}
            />
          </View>

          <View style={views.rowCenter}>
            <Text style={texts.white13}>{review.stockName}</Text>
          </View>

          <View style={views.rowCenter}>
            <Text style={texts.stockTicker}>
              {ticker}-STOCK-{review.country}
            </Text>
          </View>
        </View>

        <View style={views.centerSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Order Type</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>{review.orderType}</Text>
          </View>
        </View>

        <View style={views.centerSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Number of Shares</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>{review.amount}</Text>
          </View>
        </View>

        <View style={views.centerSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Value</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>{review.totalPrice}</Text>
          </View>
        </View>

        <View style={views.centerSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Commision</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>0%</Text>
          </View>
        </View>

        <View style={views.centerSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>FX fee</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>0%</Text>
          </View>
        </View>

        <View style={views.bottomSection}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Total</Text>
          </View>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>{review.totalPrice}</Text>
          </View>
        </View>

        <View style={views.twoButtons}>
          <Button
            style={buttons.orangeFill}
            onPress={() => {
              //placeTrade(tradeObj);
              practiceTrade(tradeObj);
              props.navigation.navigate("Stock");
            }}
          >
            <Text style={texts.buttonText}>Confirm</Text>
          </Button>
          <Button
            style={buttons.noFill}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={texts.orangeButtonText}>Cancel</Text>
          </Button>
        </View>
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
