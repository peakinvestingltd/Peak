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
import { ScrollView } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { ThemeConsumer } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default function ReviewScreen(props) {
  console.log("vvvvvvvvvv");
  console.log(props);

  const review = props.route.params;
  const balance = props.route.params.balance;
  const totalCost = props.route.params.totalPrice;
  let strAmount;
  const ticker = props.route.params.ticker;
  const amount = props.route.params.amount;
  const price = props.route.params.price;
  const type = props.route.params.type;
  const logo = props.route.params.logo;
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

      <Card style={styles.newsCard}>
        <Text style={styles.titleText}>{review.stockName}</Text>
        <View style={styles.box1}>
          <View style={styles.rowSpaced}>
            <Text style={styles.text}>price per share</Text>
            <Text style={styles.text}>{review.price}</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Commission</Text>
            <Text style={styles.text}>0%</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Amount of shares</Text>
            <Text style={styles.text}>{review.amount}</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Total cost</Text>
            <Text style={styles.text}>{review.totalPrice}</Text>
          </View>
        </View>
      </Card>
      <Button
        style={styles.button}
        onPress={() => {
          firebase.auth().onAuthStateChanged((user) => {
            console.log(user.email);

            db.collection("users")
              .doc(user.uid)
              .collection("funds")
              .doc("practiceBalance")
              .set({
                amount: balance - totalCost,
              });

            db.collection("users")
              .doc(user.uid)
              .collection("history")
              .doc(`${date}`)
              .set({
                type: type,
                stock: ticker,
                cost: totalCost,
                date: fullDate,
                amount: amount,
                timestamp: date,
                logo: logo,
              });

            db.collection("users")
              .doc(user.uid)
              .collection("practiceInvestments")
              .doc(ticker)
              .set({
                amount: amount,
                price: price,
              });

            props.navigation.navigate("Stock");
            console(props.navigation);
          });
        }}
      >
        <Text style={styles.buttonText}>Confirm</Text>
      </Button>
      <Button
        style={styles.button}
        onPress={() => {
          console.log(firebase.auth().uid);
          console.log(uid);

          firebase.auth().onAuthStateChanged((user) => {
            console.log(user.email);
            db.collection("users")
              .doc(user.uid)
              .collection("funds")
              .doc("practiceBalance")
              .set({
                amount: 60000,
              });
          });
        }}
      >
        <Text style={styles.buttonText}>test</Text>
      </Button>
    </SafeAreaView>
  );
}
