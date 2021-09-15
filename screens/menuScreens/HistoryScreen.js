import React, { useState } from "react";
import { SafeAreaView, View, Image, ScrollView } from "react-native";
import { Text, Button } from "react-native-paper";
import { views, buttons, texts, images } from "../../css/styles.js";
import Header from "../../components/header";
import navBar from "../../components/navBar";

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
export default function HistoryScreen(props) {
  const [history, setHistory] = useState(null);
  const [object, setObject] = useState({});

  function getData() {
    let historyArr = [];
    async function getHistory(user) {
      const historyRef = db.collection("users").doc(user).collection("history");
      const snapshot = await historyRef.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        snapshot.forEach((doc) => {
          let data = doc.data();
          historyArr.push(data);
        });
        return historyArr;
      }
    }
    firebase.auth().onAuthStateChanged((user) => {
      getHistory(user.uid).then((arr) => {
        let obj = {};
        arr.forEach((item) => {
          obj[item.date] = [];
        });
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].date].push(arr[i]);
        }
        setObject(obj);
        setHistory(arr);
      });
    });
  }
  if (history == null) {
    getData();
  }
  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; History</Text>
        </Button>
        {Object.keys(object).map((card) => {
          return (
            <View style={views.card}>
              <Text style={texts.gray}>{card}</Text>
              <View style={views.cardDevider}></View>
              {object[card].map((transaction) => {
                return (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        style={images.stockImageSmall}
                        source={{
                          uri: `https://storage.googleapis.com/iex/api/logos/${transaction.stock}.png`,
                        }}
                      />
                      <View style={{ alignSelf: "center", marginLeft: 5 }}>
                        <Text style={texts.white15}>{transaction.stock}</Text>
                        <Text style={texts.stockTicker}>
                          {transaction.type + " - " + transaction.amount}
                        </Text>
                      </View>
                      <View style={views.absoluteEnd}>
                        <Text style={texts.white20}>{transaction.cost}</Text>
                      </View>
                    </View>
                    <View style={views.cardDevider}></View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
