import axios from "axios";
import React, { Component, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../css/styles.js";

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
} from "react-native";
import Spinner from "../components/Spinner";

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export class StockScreen extends React.Component {
  constructor(props) {
    super(props);
    const { navigation } = this.props;
    this.state = {
      loadingPrice: true,
      loadingData: true,
      loadingCandle: true,
      loaded: [],
      datePrice: [],
      dataCandle: [],
      data: [],
      stocks: [],
      candles: [],
      price: [],
      funds: 60000,
      stockList: [
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
      ],
    };
  }
  callApi(stockList) {
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
                  };
                })
                .then(() => {
                  loaded.push(stock);
                  if (this.state.stockList.length == loaded.length) {
                    this.setState({
                      price: stockData.price,
                      candles: stockData.chart,
                      stocks: stockData.data,
                      loaded: loaded,
                    });
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

  componentDidMount() {
    this.callApi(this.state.stockList);
  }

  render() {
    const candles = this.state.candles;
    const stockData = this.state.stocks;
    const loaded = this.state.loaded;
    const priceData = this.state.price;
    const listItems = loaded.map((stock) => (
      <TouchableOpacity
        key={stock}
        onPress={() =>
          this.props.route.next.navigation.navigate("Details", {
            stock: stock,
            price: priceData[stock],
            logo: `https://storage.googleapis.com/iex/api/logos/${stockData[stock].ticker}.png`,
            name: stockData[stock].name,
            priceChange: priceData[stock].priceChange.toFixed(2),
            percentChange: priceData[stock].percentage.toFixed(2),
            chartData: candles[stock].open,
            funds: this.state.funds,
            chartColor: priceData[stock].color,
            stockColor: priceData[stock].stockColor,
            desc: stockData[stock].desc,
          })
        }
      >
        <Card style={styles.card}>
          <View style={styles.stockNameView}>
            <Text style={styles.stockName}>{stockData[stock].name}</Text>
            <Text style={styles.stockTicker}>
              {stockData[stock].ticker}-{stockData[stock].country}
            </Text>
          </View>

          <Text style={styles.price}>
            {stockData[stock].currency}
            {priceData[stock].currentPrice}
          </Text>
          <Text style={styles[priceData[stock].stockColor]}>
            {priceData[stock].priceChange.toFixed(2)}
            {"("}
            {priceData[stock].percentage.toFixed(2)}%{")"}
          </Text>
          <View
            style={{
              display: "flex",
              marginRight: 30,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                width: 40,
                height: 40,
                borderRadius: 20,
                shadowColor: "black",
                shadowOffset: { height: 5 },
                shadowOpacity: 1,
              }}
            >
              <Image
                style={styles.image}
                source={{
                  uri: `https://storage.googleapis.com/iex/api/logos/${stockData[stock].ticker}.png`,
                }}
              />
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
              color: (opacity = 1) => `rgba(${priceData[stock].color}1)`,
              fillShadowGradientOpacity: 1,
              fillShadowGradient: priceData[stock].stockColor,

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

    if (this.state.loaded.length == 0) {
      return <Spinner />;
    }

    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Card style={styles.topCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                onPress={() =>
                  this.props.route.next.navigation.navigate("Chat")
                }
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
                  £{this.state.funds}
                </Button>
              </View>
              <IconButton
                icon="bell-outline"
                color={Colors.orange500}
                size={30}
              />
            </View>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              margin: 10,
            }}
          >
            <Button mode="contained">Watch list</Button>
            <IconButton
              icon="file-edit-outline"
              color={Colors.white}
              size={30}
            />
          </View>
          <ScrollView style={{ marginTop: 10 }}>{listItems}</ScrollView>
        </SafeAreaView>
      </PaperProvider>
    );
  }
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
