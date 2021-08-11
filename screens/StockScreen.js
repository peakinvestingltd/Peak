import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { styles } from "../css/styles.js";
import { Transitioning, Transition } from "react-native-reanimated";
import Logo from "../assets/Peak-App-Logo.svg";

import {
  getBalance,
  getFinnhubPrices,
  getFinnhubChart,
  getFinnhubCompanyProfile,
  getToken,
  getSecclStock,
  bankTransferIn,
  createOrder,
  getAccountInfo,
  getUserInfo,
  getUserId,
  currentStock,
} from "../utils/functions";

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
import {
  SafeAreaView,
  Dimensions,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  Linking,
  StatusBar,
} from "react-native";
import header from "../components/header.js";
import navBar from "../components/navBar.js";
import * as firebase from "firebase";
import "firebase/database";
import assetUnivers from "../utils/assetUniverse.js";

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();

export let userBalance = "loading...";

let count = 1;

export default function StockScreen(props) {
  const [justLoaded, setJustLoaded] = useState(true);
  const [loaded, setLoaded] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [stockList, setStockList] = useState([
    "VOD",
    "SHOP",
    "WTB.L",
    "NXT.L",
    "FB",
  ]);
  const [catagory, setCatagory] = useState("Watchlist");

  function triggerGetBalance() {
    firebase.auth().onAuthStateChanged((user) => {
      getBalance(user).then((bal) => {
        userBalance = bal.toFixed(2);
      });
    });
  }

  async function callApi(stockList) {
    let loaded = [];
    let stockData = {
      price: {},
      data: {},
      chart: {},
    };
    stockList.forEach((stock) => {
      getFinnhubPrices(stock)
        .then((priceList) => {
          let priceChange = priceList.c - priceList.pc;
          let percentage = (100 / priceList.pc) * priceChange;
          let color;
          let profit;
          if (priceChange > 0) {
            color = "0,151,50,";
            profit = "green";
          } else {
            color = "231,24,0,";
            profit = "red";
          }

          stockData.price[stock] = {
            currentPrice: priceList.c.toFixed(2),
            open: priceList.o,
            low: priceList.l,
            high: priceList.h,
            previousClose: priceList.pc,
            priceChange: priceChange,
            percentage: percentage,
            color: color,
            stockColor: profit,
          };
        })
        .then(() => {
          getFinnhubChart(stock, from, to, "30")
            .then((chartData) => {
              stockData.chart[stock] = {
                open: chartData.o,
              };
              if (chartData.s == "no_data" || chartData.o == null) {
                stockData.chart[stock] = {
                  open: [0, 0],
                };
              }
            })
            .then(() => {
              getFinnhubCompanyProfile(stock)
                .then((stocksList) => {
                  let symbol;
                  if (stocksList.currency == "USD") {
                    symbol = "$";
                  } else {
                    symbol = "£";
                  }

                  stockData.data[stock] = {
                    name: stocksList.name,
                    country: stocksList.country,
                    currency: symbol,
                    ticker: stocksList.ticker,
                    shareOutstanding: stocksList.shareOutstanding,
                    logo: `https://storage.googleapis.com/iex/api/logos/${stocksList.ticker}.png`,
                    // write logic to check if logo exists and to input placeholder logo if it doesnt
                    exchange: stocksList.exchange,
                    industry: stocksList.finnhubIndustry,
                    desc: stocksList.description,
                    address: stocksList.address,
                    city: stocksList.city,
                    state: stocksList.state,
                    employeeTotal: stocksList.employeeTotal,
                    group: stocksList.ggroup,
                    sector: stocksList.gsector,
                    marketCap: stocksList.marketCapitalization,
                    shareOutstanding: stocksList.shareOutstanding,
                  };
                })
                .then(() => {
                  loaded.push(stock);
                  if (stockList.length == loaded.length) {
                    setStockData(stockData);
                    setLoaded(loaded);
                  }
                })
                .then(() => {})
                .catch((err) => {
                  console.log("error in getData");
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }
  triggerGetBalance();
  if (justLoaded) {
    callApi(stockList);
    setJustLoaded(false);
  }
  const isFocused = useIsFocused();

  useEffect(() => {
    count = count + 1;
    console.log(props);
    console.log("look here!!!");
    if (props.route.params) {
      if (props.route.params.cat) {
        console.log(props.route.params.cat);

        setCatagory(props.route.params.cat);
        setStockList(props.route.params.assets);

        console.log(stockList);

        callApi(stockList);
      }
    } else {
      console.log("dosnt exist");
    }
  }, [isFocused]);

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#1b2855" />
        {header(props, userBalance)}
        <ScrollView style={{ marginTop: 0 }}>
          <Button
            style={styles.pageButton}
            onPress={() =>
              props.navigation.navigate("Search", {
                funds: userBalance,
              })
            }
          >
            <Text style={styles.pageButtonText}>&lt; {catagory}</Text>
          </Button>
          {currentStock(loaded, stockData, props, userBalance)}
        </ScrollView>

        <View style={styles.footer}></View>
        {navBar(props, userBalance, "stock")}
      </SafeAreaView>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#222948",
    accent: "#f1c40f",
  },
};
