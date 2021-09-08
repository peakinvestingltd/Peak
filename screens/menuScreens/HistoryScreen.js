import React, { useState } from "react";
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

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

import Header from "../../components/header";
import navBar from "../../components/navBar";

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

export default function HistoryScreen(props) {
  useStatusBar("light-content");

  const [history, setHistory] = useState(null);
  const [object, setObject] = useState({});
  // const [load, setLoad] = useState(true);

  function getData() {
    let historyArr = [];
    let obj = {};
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
      console.log(user.uid);
      getHistory(user.uid).then((arr) => {
        let obj = {};
        arr.forEach((item) => {
          console.log(item.date);
          obj[item.date] = [];
        });
        console.log(obj);
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].date].push(arr[i]);
        }
        setObject(obj);
        setHistory(arr);
        console.log(obj);
      });
    });
  }

  if (history == null) {
    getData();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; History</Text>
        </Button>
        {/* {cardItem()} */}
        {Object.keys(object).map((card) => {
          return (
            <View style={styles.cardHistory}>
              <Text style={styles.cardHeader}>{card}</Text>
              <View style={styles.cardDevider}></View>
              {object[card].map((transaction) => {
                return (
                  <View>
                    <View style={{ flexDirection: "row" }}>
                      {/* add image url to firebase when buying or selling stock */}

                      <Image
                        style={styles.image}
                        source={{
                          uri: `https://storage.googleapis.com/iex/api/logos/${transaction.stock}.png`,
                        }}
                      />

                      <View style={{ alignSelf: "center", marginLeft: 5 }}>
                        <Text style={styles.historyName}>
                          {transaction.stock}
                        </Text>
                        <Text style={styles.historyAction}>
                          {transaction.type + " - " + transaction.amount}
                        </Text>
                      </View>

                      <View style={styles.historyValueBox}>
                        <Text style={styles.historyValue}>
                          {transaction.cost}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.cardDevider}></View>
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
