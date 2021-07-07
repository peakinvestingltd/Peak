import React, { useEffect, useState } from "react";
import {
  Avatar,
  DefaultTheme,
  IconButton,
  Colors,
  Title,
  Button,
  Card,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { user } from "../components/Firebase/firebase";

import { styles } from "../css/styles.js";

import * as firebase from "firebase";
import "firebase/database";

const db = firebase.firestore();

const portfolioChart = () => {
  let portfolioArr = [];
  async function getHistory(user) {
    const historyRef = db
      .collection("users")
      .doc(user)
      .collection("practiceInvestments");

    const snapshot = await historyRef.get();
    if (snapshot.empty) {
      console.log("No matching documents.");
    } else {
      snapshot.forEach((doc) => {
        let data = doc.data();
        portfolioArr.push(data);
      });
      return portfolioArr;
    }
  }

  firebase.auth().onAuthStateChanged((user) => {
    getHistory(user.uid).then((arr) => {});
  });
};
