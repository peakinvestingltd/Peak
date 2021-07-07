import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../css/styles.js";

import navBar from "../components/navBar.js";

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

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export let userBalance = "loading...";

export default function StockScreen(props) {
  const [justLoaded, setJustLoaded] = useState(true);
  const [loaded, setLoaded] = useState([]);
  const [dataPrice, setDataPrice] = useState([]);
  const [dataCandle, setDataCandle] = useState([]);
  const [data, setData] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [candles, setCandles] = useState([]);
  const [price, setPrice] = useState([]);
  const [funds, setFunds] = useState([]);
  const [stockList, setStockList] = useState([
    "AAPL",
    "TSLA",
    "GOOG",
    "FB",
    "BP",
    "TWTR",
    "AMZN",
    "BAC",
    "BA",
    "AXS",
    "ADCT",
    "ATR",
    "ALV",
    "ALK",
    "AU",
    "ASPN",
    "AAT",
    "SPOT",
    "AMC",
    "NFLX",
    "PK",
  ]);

  function getBalance() {
    async function adddata(user) {
      const userRef = db
        .collection("users")
        .doc(user.uid)
        .collection("funds")
        .doc("practiceBalance");
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("No such document!");

        db.collection("users")
          .doc(user.uid)
          .collection("funds")
          .doc("practiceBalance")
          .set({
            amount: 60000,
          });
        let bal = 60000;
        return bal;
      } else {
        let bal = doc.data()["amount"];
        console.log("Document data:", bal);
        return bal;
      }
    }

    firebase.auth().onAuthStateChanged((user) => {
      adddata(user).then((bal) => {
        userBalance = bal.toFixed(2);
        setFunds(bal.toFixed(2));
      });
    });
  }

  function callApi(stockList) {
    let loaded = [];
    let stockData = {
      price: {},
      data: {},
      chart: {},
    };

    stockList.forEach((stock) => {
      fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${apiKey}`)
        .then((response) => response.json())
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
          fetch(
            `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=60&from=${from}&to=${to}&token=${apiKey}`
          )
            .then((response) => response.json())
            .then((chartData) => {
              stockData.chart[stock] = {
                open: chartData.o,
                high: chartData.h,
                low: chartData.l,
                close: chartData.c,
                volume: chartData.v,
                timestamp: chartData.t,
                status: chartData.s,
              };
              if (chartData.s == "no_data" || chartData.o == null) {
                stockCandle[stock] = {
                  open: [0, 0],
                  high: [0, 0],
                  low: [0, 0],
                  close: [0, 0],
                  volume: [0, 0],
                };
              }
            })
            .then(() => {
              fetch(
                `https://finnhub.io/api/v1/stock/profile?symbol=${stock}&token=c29d3o2ad3ib4ac2prkg`
              ) // hide api key from
                .then((response) => response.json())
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

  if (justLoaded) {
    getBalance();
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
          funds: funds,
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
        <StatusBar
          style={styles.statusBar}
          // backgroundColor="red"
        />
        <Card style={styles.topCard}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onPress={() => props.navigation.navigate("Chat")}
              icon="chat-outline"
              color={Colors.orange500}
              size={30}
            />
            <View>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <Button
                mode="contained"
                style={{
                  backgroundColor: Colors.orange500,
                  borderRadius: 20,
                }}
              >
                £{userBalance}
              </Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>

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
        {navBar(props, funds)}
        {/* <View style={styles.navBar}>
          <IconButton
            icon={"chart-line-variant"}
            color={"#ff7f00"}
            size={35}
            style={styles.navButton}
            onPress={() =>
              props.navigation.navigate("Stock", {
                funds: funds,
              })
            }
          ></IconButton>
          <IconButton
            icon={"account"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() =>
              props.navigation.navigate("Portfolio", {
                funds: funds,
              })
            }
          ></IconButton>
          <IconButton
            icon={"newspaper"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() =>
              props.navigation.navigate("News", {
                funds: funds,
              })
            }
          ></IconButton>
          <IconButton
            icon={"magnify"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() =>
              props.navigation.navigate("Search", {
                funds: funds,
              })
            }
          ></IconButton>
          <IconButton
            icon={"menu"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() =>
              props.navigation.navigate("Home", {
                funds: funds,
              })
            }
          ></IconButton>
        </View> */}
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
