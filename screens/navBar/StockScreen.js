import React, { Component, useEffect, useState } from "react";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { styles, views, buttons, texts, images } from "../../css/styles.js";
import { LineChart } from "react-native-chart-kit";
import { Transitioning, Transition } from "react-native-reanimated";
import { AppLoading } from "expo";
import { useFonts, NunitoSans_300Light } from "@expo-google-fonts/nunito-sans";
import {
  getBalance,
  getFinnhubPrices,
  getFinnhubChart,
  getFinnhubCompanyProfile,
  getSavedStocks,
  updateSavedStocks,
  removeSaved,
} from "../../utils/functions";

import {
  Button,
  IconButton,
  Card,
  Provider as PaperProvider,
} from "react-native-paper";

import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StatusBar,
  TouchableOpacity,
  Animated,
  Image,
  Dimensions,
} from "react-native";
import Header from "../../components/header.js";
import navBar from "../../components/navBar.js";
import * as firebase from "firebase";
import "firebase/database";
import assetUnivers from "../../utils/assetUniverse.js";
const screenWidth = Dimensions.get("window").width;
let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();

export let userBalance = "loading...";

let count = 1;
let binToggle = true;
export default function StockScreen(props) {
  console.log("triggered");
  const [fontLoading, error] = useFonts({
    NunitoSans_300Light,
  });
  const [justLoaded, setJustLoaded] = useState(true);
  const [loaded, setLoaded] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [catagory, setCatagory] = useState("Watchlist");
  const position = new Animated.ValueXY({ x: -20, y: 0 });
  const binPosition = new Animated.ValueXY({ x: -60, y: 0 });

  Animated.timing(position, {
    toValue: {
      x: -30,
      y: 0,
    },
    useNativeDriver: true,
  }).start();
  Animated.timing(binPosition, {
    toValue: {
      x: -60,
      y: 0,
    },
    useNativeDriver: true,
  }).start();
  const currentStock = (loaded, stockData, props, userBalance) => {
    console.log(loaded);
    let data = stockData.data;
    let candles = stockData.chart;
    let price = stockData.price;

    const listItems = loaded.map((stock, index) => {
      const a = new Animated.ValueXY({ x: 0, y: 0 });
      const b = new Animated.Value(130);
      const newOpacity = new Animated.Value(1);
      const animatedStyle = {
        height: b,
        opacity: newOpacity,
        transform: [
          {
            translateX: a.x,
          },
        ],
      };

      return (
        <Animated.View style={[views.box, animatedStyle]}>
          <Animated.View
            style={{
              alignSelf: "center",
              transform: [
                {
                  translateX: binPosition.x,
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={() => {
                let remove = loaded[index];
                Animated.timing(newOpacity, {
                  toValue: 0,
                  duration: 700,
                }).start();
                Animated.timing(b, {
                  toValue: 0,
                  duration: 1000,
                }).start();
                firebase.auth().onAuthStateChanged((user) => {
                  removeSaved(user, remove);
                });
              }}
            >
              <EvilIcons name="trash" size={30} color="red" />
            </TouchableOpacity>
          </Animated.View>
          <Animated.View
            style={{
              transform: [
                {
                  translateX: position.x,
                },
              ],
            }}
          >
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
              <Card style={views.card}>
                <View style={{ height: 120 }}>
                  <View style={views.rowSpaceBetween}>
                    <View style={views.rowSpaceBetween}>
                      <Image
                        style={images.stockImageSmall}
                        source={{
                          uri: `https://storage.googleapis.com/iex/api/logos/${stock}.png`,
                        }}
                      />

                      <View style={views.centerContent}>
                        <Text style={texts.white13}>{data[stock].name}</Text>
                        <Text style={texts.stockTicker}>
                          {stock}-{data[stock].country}
                        </Text>
                      </View>
                    </View>

                    <View style={views.centerContent}>
                      <Text style={texts.price}>
                        {data[stock].currency}
                        {price[stock].currentPrice}
                      </Text>

                      <Text style={texts[price[stock].stockColor]}>
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
                </View>
              </Card>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      );
    });
    return listItems;
  };
  // function triggerGetBalance() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     getBalance(user).then((bal) => {
  //       userBalance = bal.toFixed(2);
  //     });
  //   });
  // }

  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      console.log("it worked!!!!!!!!!!a");
      setJustLoaded(true);
    });
    return unsubscribe;
  }, [props.navigation]);

  function toggleEddit() {
    return (
      <TouchableOpacity
        onPress={() => {
          if (binToggle) {
            binToggle = false;
            Animated.timing(position, {
              toValue: {
                x: 10,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            Animated.timing(binPosition, {
              toValue: {
                x: 10,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
          } else {
            binToggle = true;
            Animated.timing(position, {
              toValue: {
                x: -30,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
            Animated.timing(binPosition, {
              toValue: {
                x: -50,
                y: 0,
              },
              useNativeDriver: true,
            }).start();
          }
        }}
      >
        <View
          style={{
            margin: 10,
          }}
        >
          <EvilIcons name="pencil" size={35} color="#ff7f00" />
        </View>
      </TouchableOpacity>
    );
  }

  async function callApi(stockList) {
    let loaded = [];
    let order = stockList;
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
                    setLoaded(order);
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
  // triggerGetBalance();
  if (justLoaded) {
    firebase.auth().onAuthStateChanged((user) => {
      User = user;
      getSavedStocks(user).then((res) => {
        callApi(res);
        setJustLoaded(false);
      });
    });
  }
  return (
    <SafeAreaView style={views.container}>
      <StatusBar backgroundColor="#26325F" />
      <Header {...props} />
      <ScrollView>
        <View style={views.rowSpaceBetween}>
          <Button
            style={buttons.titleBack}
            onPress={() =>
              props.navigation.navigate("Search", {
                funds: userBalance,
              })
            }
          >
            <Text style={texts.pageButtonText}>&lt; {catagory}</Text>
          </Button>
          {toggleEddit()}
        </View>
        {currentStock(loaded, stockData, props, userBalance)}
      </ScrollView>
      {navBar(props, userBalance, "stock")}
    </SafeAreaView>
  );
}
