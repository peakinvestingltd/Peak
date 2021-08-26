import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../../css/styles.js";
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";
import { setStatusBarStyle } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import {
  getFinnhubChart,
  getFinnhubCompanyProfile,
} from "../../utils/functions";
const screenWidth = Dimensions.get("window").width;
let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();
export default function OwnedStockScreen(props) {
  const [stocks, setStocks] = useState(props.route.params.stocks);
  let color = null;
  const setStyle = (num) => {
    const dif = num.priceDif;
    console.log("triggered");
    if (dif >= 0) {
      console.log("green");
      color = "green";
      return styles.green;
    } else {
      console.log("red");
      color = "red";
      return styles.red;
    }
  };
  const investmentCards = () => {
    return stocks.map((item, index) => {
      console.log("item");
      console.log(item);
      let profit = (item.currentPrice * item.amount - item.investment).toFixed(
        2
      );
      let returnStyle = {};
      if (profit > 0) {
        returnStyle = {
          alignSelf: "center",
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          color: "#1D9440",
        };
      } else {
        returnStyle = {
          alignSelf: "center",
          color: "white",
          fontSize: 16,
          fontWeight: "bold",
          color: "#d20c0d",
        };
      }
      return (
        <TouchableOpacity
          onPress={() => {
            let data = {};
            let chart = {};

            getFinnhubChart(item.ticker, from, to, "30")
              .then((chartData) => {
                chart = {
                  open: chartData.o,
                };
                if (chartData.s == "no_data" || chartData.o == null) {
                  chart = {
                    open: [0, 0],
                  };
                }
              })
              .then(() => {
                getFinnhubCompanyProfile(item.ticker)
                  .then((stocksList) => {
                    let symbol;
                    if (stocksList.currency == "USD") {
                      symbol = "$";
                    } else {
                      symbol = "£";
                    }

                    data = {
                      name: stocksList.name,
                      country: stocksList.country,
                      currency: symbol,
                      ticker: stocksList.ticker,
                      shareOutstanding: stocksList.shareOutstanding,
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
                    props.navigation.navigate("Details", {
                      stock: item.ticker,
                      price: {
                        color: item.coolor,
                        currentPrice: item.currentPrice,
                        high: item.high,
                        low: item.low,
                        open: item.open,
                        percentage: item.percentage,
                        previousClose: item.pc,
                        priceChange: item.priceDif,
                        stockColor: item.stockColor,
                      },
                      logo: item.logo,
                      name: item.name,
                      priceChange: item.priceDif,
                      percentChange: item.percentage,
                      chartData: chart.open,
                      funds: props.route.params.funds,
                      desc: data.desc,
                      country: data.country,
                      currency: data.currency,
                      industry: data.industry,
                      address: data.address,
                      city: data.city,
                      state: data.state,
                      employeeTotal: data.employeeTotal,
                      group: data.group,
                      sector: data.sector,
                      marketCap: data.marketCap,
                      shareOutstanding: data.shareOutstanding,
                      exchange: data.exchange,

                      chartColor: "231,24,0,",
                      stockColor: "red",
                      color: "red",
                    });
                  });
              });
          }}
        >
          <View style={styles.cardTop}>
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
                  uri: item.logo,
                }}
              />

              <View style={styles.stockNameView}>
                <Text style={styles.stockName}>{item.name}</Text>
                <Text style={styles.stockTicker}>
                  {item.ticker}-add country
                </Text>
              </View>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.price}>
                $£
                {item.currentPrice}
              </Text>
              <Text style={setStyle(item)}>
                {item.priceDif}
                {"("}
                {item.percentage}%{")"}
              </Text>
            </View>
          </View>

          <View style={styles.defaultEndView} key={index}>
            <View
              style={{
                flexDirection: "row",
                height: 60,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  height: 60,
                  width: screenWidth - 30,
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    width: (screenWidth - 30) / 3 - 10,
                    backgroundColor: "#26325F",
                    height: 40,
                    alignSelf: "center",
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Shares
                  </Text>
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    {item.amount}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    width: (screenWidth - 30) / 3 - 10,
                    backgroundColor: "#26325F",
                    height: 40,
                    alignSelf: "center",
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    invested
                  </Text>
                  <Text
                    style={{
                      alignSelf: "center",
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                    }}
                  >
                    £{item.investment}
                  </Text>
                </View>

                <View
                  style={{
                    justifyContent: "center",
                    width: (screenWidth - 30) / 3 - 10,
                    backgroundColor: "#26325F",
                    height: 40,
                    alignSelf: "center",
                    borderRadius: 10,
                    margin: 5,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 12,
                      alignSelf: "center",
                    }}
                  >
                    Return
                  </Text>
                  <Text style={returnStyle}>
                    {(
                      item.currentPrice * item.amount -
                      item.investment
                    ).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Stocks</Text>
        </Button>
        {investmentCards()}
      </ScrollView>

      <View style={styles.footer}></View>

      {navBar(props, props.route.params.funds, "portfolio")}
    </SafeAreaView>
  );
}
