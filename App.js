import Providers from "./navigation";
import React, { Component, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./css/styles.js";
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
} from "./utils/functions";

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

export default function App() {
  return <Providers />;
}
