import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../css/styles.js";
import { Transitioning, Transition } from "react-native-reanimated";
import Logo from "../assets/Peak-App-Logo.svg";

import navBar from "../components/navBar.js";
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
import * as firebase from "firebase";
import "firebase/database";
//import { Transition } from "react-transition-group";
const db = firebase.firestore();

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export let userBalance = "loading...";

const transition = (
  <Transition.Together>
    <Transition.In type="fade" duration={400} />
    <Transition.Change />
    <Transition.Out type="fade" duration={400} />
  </Transition.Together>
);

export default function StockScreen(props) {
  const [GIASelected, setGIASelected] = useState(styles.GIACardUnselected);
  const [ISASelected, setISASelected] = useState(styles.ISACardUnselected);
  const [practiceSelected, setPracticeSelected] = useState(styles.practiceCard);

  const ref = React.useRef();
  const [headerStyle, setHeaderStyle] = useState(styles.topCard);
  const [expanded, setExpanded] = useState(false);
  const [justLoaded, setJustLoaded] = useState(true);
  const [loaded, setLoaded] = useState([]);
  const [data, setData] = useState([]);
  const [candles, setCandles] = useState([]);
  const [price, setPrice] = useState([]);
  const [stockList, setStockList] = useState([
    "CCL",
    "NFLX",
    "WTB.L",
    "NXT.L",
    "FB",
  ]);
  const [stockObject, setStockObject] = useState({
    CCL: {
      id: "285FM",
    },
    NFLX: {
      id: "2921C",
    },
    "NXT.L": {
      id: "284nl",
    },
    "WTB.L": {
      id: "284NL",
    },
  });
  const [currentAccount, setCurrentAccount] = useState("practice");

  function triggerGetBalance() {
    firebase.auth().onAuthStateChanged((user) => {
      //  signupUpdate({ test: 123, test2: "one" });
      getBalance(user).then((bal) => {
        userBalance = bal.toFixed(2);
        //   setFunds(bal.toFixed(2));
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
          getFinnhubChart(stock, from, to)
            .then((chartData) => {
              stockData.chart[stock] = {
                open: chartData.o,
              };
              if (chartData.s == "no_data" || chartData.o == null) {
                stockCandle[stock] = {
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
                    setPrice(stockData.price);
                    setCandles(stockData.chart);
                    setData(stockData.data);
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
    getToken().then((token) => {
      console.log(token);
      getSecclStock("US30303M1027", token);
    });

    callApi(stockList);
    setJustLoaded(false);
  }

  const listItems = loaded.map((stock) => (
    <TouchableOpacity
      key={stock}
      onPress={() => {
        props.navigation.navigate("Details", {
          stock: stock,
          price: price[stock],
          logo: `https://storage.googleapis.com/iex/api/logos/${stock}.png`,
          name: data[stock].name,
          priceChange: price[stock].priceChange.toFixed(2),
          percentChange: price[stock].percentage.toFixed(2),
          chartData: candles[stock].open,
          funds: userBalance,
          chartColor: price[stock].color,
          stockColor: price[stock].stockColor,
          desc: data[stock].desc,
          country: data[stock].country,
          color: price[stock].stockColor,
          currency: data[stock].currency,
          industry: data[stock].industry,
          address: data[stock].address,
          city: data[stock].city,
          state: data[stock].state,
          employeeTotal: data[stock].employeeTotal,
          group: data[stock].group,
          sector: data[stock].sector,
          marketCap: data[stock].marketCap,
          shareOutstanding: data[stock].shareOutstanding,
          exchange: data[stock].exchange,
        });
      }}
    >
      <Card style={styles.card}>
        <View
          style={{
            display: "flex",
            marginRight: 30,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Image
            style={styles.image}
            source={{
              uri: `https://storage.googleapis.com/iex/api/logos/${stock}.png`,
            }}
          />

          <View style={styles.stockNameView}>
            <Text style={styles.stockName}>{data[stock].name}</Text>
            <Text style={styles.stockTicker}>
              {stock}-{data[stock].country}
            </Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {data[stock].currency}
              {price[stock].currentPrice}
            </Text>

            <Text style={styles[price[stock].stockColor]}>
              {price[stock].priceChange.toFixed(2)}
              {"("}
              {price[stock].percentage.toFixed(2)}%{")"}
            </Text>
          </View>
        </View>
        <LineChart
          bezier
          hideLegend={true}
          segments={1}
          withHorizontalLabels={false}
          data={{
            datasets: [
              {
                data: candles[stock].open,
              },
            ],
          }}
          width={screenWidth - 25} // from react-native
          height={65}
          withHorizontalLabels={false}
          chartConfig={{
            withDots: false,
            strokeWidth: 1.5,
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(${price[stock].color}1)`,
            fillShadowGradientOpacity: 1,
            //  fillShadowGradient: priceData[stock].stockColor,

            propsForBackgroundLines: {
              stroke: "transparent",
            },
            propsForDots: {
              r: "0",
              strokeWidth: "5",
              stroke: "#fff",
            },
          }}
          style={{
            paddingRight: 0,
            margin: 5,
            borderRadius: 20,
            marginRight: 0,
            bottom: 1,
            position: "absolute",
          }}
        />
      </Card>
    </TouchableOpacity>
  ));

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <StatusBar style={styles.statusBar} />
        {header()}
        <ScrollView style={{ marginTop: 0 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          ></View>
          {listItems}
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
