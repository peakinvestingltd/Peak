import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { Text, Button } from "react-native-paper";
import { styles, views, buttons, images, texts } from "../../css/styles.js";
import Header from "../../components/header.js";
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

    if (dif >= 0) {
      color = "green";
      return texts.green;
    } else {
      color = "red";
      return texts.red;
    }
  };
  const investmentCards = () => {
    return stocks.map((item, index) => {
      let profit = (item.currentPrice * item.amount - item.investment).toFixed(
        2
      );
      let returnStyle;
      if (profit > 0) {
        returnStyle = {
          alignSelf: "center",
          fontSize: 15,
          color: "#1D9440",
        };
      } else {
        returnStyle = {
          alignSelf: "center",
          fontSize: 15,
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
                        percentage: Number(item.percentage),
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
          <View style={{ marginBottom: 5 }}>
            <View style={views.cardTop}>
              <View style={views.rowSpaceBetween}>
                <Image
                  style={images.stockImageSmall}
                  source={{
                    uri: item.logo,
                  }}
                />

                <View style={views.center}>
                  <Text style={texts.white13}>{item.name}</Text>
                  <Text style={texts.stockTicker}>
                    {item.ticker}-add country
                  </Text>
                </View>
              </View>

              <View style={views.center}>
                <Text style={texts.price}>£{item.currentPrice}</Text>
                <Text style={setStyle(item)}>
                  {item.priceDif}
                  {"("}
                  {item.percentage}%{")"}
                </Text>
              </View>
            </View>
            <View
              style={{
                height: 1,
                marginTop: -4,
              }}
            />
            <View style={views.defaultEndView} key={index}>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: -30,
                  marginRight: -30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    width: screenWidth - 20,
                  }}
                >
                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      width: (screenWidth - 25) / 3,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: "white",
                        opacity: 0.07,
                        width: (screenWidth - 40) / 3,
                        height: 40,
                        position: "absolute",
                        borderRadius: 10,
                      }}
                    />
                    <Text style={texts.white10Center}>Shares</Text>
                    <Text style={texts.white12Center}>{item.amount}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      width: (screenWidth - 25) / 3,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: "white",
                        opacity: 0.1,
                        width: (screenWidth - 40) / 3,
                        height: 40,
                        position: "absolute",
                        borderRadius: 10,
                      }}
                    />
                    <Text style={texts.white10Center}>invested</Text>
                    <Text style={texts.white12Center}>£{item.investment}</Text>
                  </View>

                  <View
                    style={{
                      justifyContent: "center",
                      alignSelf: "center",
                      width: (screenWidth - 25) / 3,
                    }}
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        backgroundColor: "white",
                        opacity: 0.1,
                        width: (screenWidth - 40) / 3,
                        height: 40,
                        position: "absolute",
                        borderRadius: 10,
                      }}
                    />
                    <Text style={texts.white10Center}>Return</Text>
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
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Stocks</Text>
        </Button>
        {investmentCards()}
      </ScrollView>
      {navBar(props, props.route.params.funds, "portfolio")}
    </SafeAreaView>
  );
}
