import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  StatusBar,
  Dimensions,
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
  Icon,
} from "react-native-paper";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
const navBarColor = "black";
const screenWidth = Dimensions.get("window").width;
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { color, ScreenWidth } from "react-native-elements/dist/helpers";
import { styles } from "../css/styles.js";
import { getFinnhubChart, buildChart, getOwnedStock } from "../utils/functions";

const height = 150;
const width = ScreenWidth - 30;
const d3 = {
  shape,
};
import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";
import { TextInput } from "react-native";
import { Label } from "native-base";

import * as firebase from "firebase";
import "firebase/database";
import header from "../components/header.js";
import navBar from "../components/navBar.js";
let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();

const { Defs, LinearGradient, Stop } = Svg;
const cursorRadius = 6;
const lableWidth = 100;

export default class DetailsScreen extends React.Component {
  cursor = React.createRef();
  cursorPrice = React.createRef();
  label = React.createRef();

  state = {
    chartData: this.props.route.params.chartData,
    loaded: false,
    ownedShares: 0,
    stock: this.props.route.params.stock,
    infoSelected: false,
    descSelected: false,
    yourInvestmentSelected: false,
    selectedChart: "7D",
    x: new Animated.Value(200),
    high: this.props.route.params.price.currentPrice,
    low: this.props.route.params.price.currentPrice,
    data: [],
    color: "gray",
    firstPrice: this.props.route.params.chartData[0],
  };

  componentDidMount() {
    this.state.x.addListener(({ value }) => {
      this.moveCursor(value);
    });
    this.moveCursor(200);

    const chartData = this.state.chartData;
    let low = this.state.low;
    let high = this.state.high;
    let data = [];
    for (let i = 0; i < chartData.length; i++) {
      data.push({ x: i, y: chartData[i].toFixed(2) });
      if (chartData[i] < low) {
        low = chartData[i];
      }
      if (chartData[i] > high) {
        high = chartData[i];
      }
    }
    buildChart(data, low, high);
    this.setState({
      low: low,
      high: high,
      loaded: true,
      data: data,
    });
    this.getStockAmount();
  }

  icon(section) {
    if (section) {
      return <EvilIcons name="chevron-down" size={40} color="white" />;
    } else {
      return <EvilIcons name="chevron-right" size={40} color="white" />;
    }
  }
  toggleDesc() {
    if (this.state.descSelected) {
      return (
        <View style={styles.infoContents}>
          <Text style={styles.infoText}>{this.props.route.params.desc}</Text>
        </View>
      );
    }
  }
  toggleYourInvestment() {
    if (this.state.yourInvestmentSelected) {
      console.log(this.state.ownedShares);
      if (this.state.ownedShares) {
        console.log("has owned shares");
        return (
          <View style={styles.infoContents}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText1}>Owned shares</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText2}>{this.state.ownedShares}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText1}>Invested</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText2}>{this.state.invested}</Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText1}>Bought at</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText2}>
                  {this.state.currency}
                  {this.state.boughtPrice}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText1}>Total value</Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={styles.listText2}>
                  {this.state.ownedShares *
                    this.props.route.params.price.currentPrice}
                </Text>
              </View>
            </View>
          </View>
        );
      } else {
        console.log("dosnt have owned shares");
        return (
          <View style={styles.infoContents}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                  opacity: 0.4,
                }}
              >
                <Text style={styles.listText1}>
                  You are not yet invested in this company
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              ></View>
            </View>
          </View>
        );
      }
    }
  }
  ToggleInfo() {
    const params = this.props.route.params;
    if (this.state.infoSelected) {
      return (
        <View style={styles.infoContents}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Your shares</Text>
            <Text style={styles.listText2}>{this.state.ownedShares}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Name</Text>
            <Text style={styles.listText2}>{params.name}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Total employees</Text>
            <Text style={styles.listText2}>
              {Math.round(params.employeeTotal)}
            </Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Industry</Text>
            <Text style={styles.listText2}>{params.industry}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>group</Text>
            <Text style={styles.listText2}>{params.group}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>sector</Text>
            <Text style={styles.listText2}>{params.sector}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Market cap</Text>
            <Text style={styles.listText2}>{params.marketCap}</Text>
          </View>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Shares outstanding</Text>
            <Text style={styles.listText2}>{params.shareOutstanding}</Text>
          </View>
        </View>
      );
    }
  }
  changeChart(stock, period, to, res, chart) {
    const todayTimestamp = Math.round(Date.now() / 1000);
    const from = (todayTimestamp - period).toString();
    getFinnhubChart(stock, from, to, res).then((chartData) => {
      if (chartData.o) {
        const open = chartData.o;
        let low = open[0];
        let high = open[0];
        let data = [];
        for (let i = 0; i < open.length; i++) {
          data.push({ x: i, y: open[i].toFixed(2) });
          if (open[i] < low) {
            low = open[i];
          }
          if (open[i] > high) {
            high = open[i];
          }
        }
        this.setState({
          chartData: chartData.o,
          selectedChart: chart,
          data,
          low,
          high,
        });
      } else {
        let low = this.props.route.params.price.currentPrice;
        let high = this.props.route.params.price.currentPrice;
        let data = [];
        for (let i = 0; i < 50; i++) {
          data.push({
            x: i,
            y: this.props.route.params.price.currentPrice,
          });
        }
        this.setState({
          data,
          low,
          high,
          selectedChart: chart,
        });
      }
    });
  }
  chartButtons(value) {
    let style;
    if (this.state.selectedChart == value) {
      style = styles.selectedChartIcon;
    } else {
      style = styles.chartIcon;
    }

    return (
      <TouchableOpacity
        onPress={() => {
          const todayTimestamp = Math.round(Date.now() / 1000);
          const today = todayTimestamp.toString();
          const day = 86400;
          const week = 604800;
          const mounth = 2629746;
          const threeMounth = 7889238;
          const year = 31556952;
          const max = 473354280;
          // ========================= try and save the data to reuse if needed =======================
          if (value == "1D") {
            this.changeChart(this.state.stock, day, today, "5", "1D");
          } else if (value == "7D") {
            this.changeChart(this.state.stock, week, today, "30", "7D");
          } else if (value == "1M") {
            this.changeChart(this.state.stock, mounth, today, "60", "1M");
          } else if (value == "3M") {
            this.changeChart(this.state.stock, threeMounth, today, "D", "3M");
          } else if (value == "1Y") {
            this.changeChart(this.state.stock, year, today, "D", "1Y");
          } else if (value == "MAX") {
            this.changeChart(this.state.stock, max, today, "M", "MAX");
          }
        }}
      >
        <View style={style}>
          <View style={{ flexDirection: "column", justifyContent: "center" }}>
            <Text style={styles.chartTextButton}>{value}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  chart(loaded) {
    const params = this.props.route.params;
    const startPrice = this.state.chartData[0];
    const currentPrice = params.price.currentPrice;
    const priceChange = (currentPrice - startPrice).toFixed(2);
    const percentage = ((priceChange / startPrice) * 100).toFixed(2);

    let chartColor = "#1D9440";
    if (priceChange < 0) {
      chartColor = "#d20c0d";
    }
    if (loaded) {
      const properties = path.svgPathProperties(
        buildChart(this.state.data, this.state.low, this.state.high)
      );
      const lineLength = properties.getTotalLength();
      const { x } = this.state;
      return (
        <View style={styles.chartContainer}>
          <View
            style={{
              width,
              height,
              // backgroundColor: "white",
              marginTop: 50,
              alignSelf: "center",
            }}
          >
            <Svg>
              <Path
                d={buildChart(this.state.data, this.state.low, this.state.high)}
                stroke={chartColor}
                strokeWidth={1}
              />

              <Path
                d={`${buildChart(
                  this.state.data,
                  this.state.low,
                  this.state.high
                )} L ${width} ${height} L 0 ${height}`}
                fill={chartColor}
                opacity={0.15}
              />

              <View
                ref={this.cursor}
                style={{
                  width: 80,
                  height: 70,
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "black",
                    position: "absolute",
                    top: 15,
                    opacity: 0.2,
                    borderRadius: 10,
                  }}
                />
                <View
                  style={{
                    height: 35,
                    width: "100%",
                    marginBottom: 0,

                    opacity: 1,
                  }}
                >
                  <TextInput
                    style={{
                      color: "white",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                    ref={this.label}
                  ></TextInput>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 10,
                    alignSelf: "flex-end",
                  }}
                >
                  <View
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: cursorRadius,
                      borderColor: chartColor,
                      borderWidth: 2,
                      backgroundColor: chartColor,
                      alignSelf: "center",
                    }}
                  />
                </View>
              </View>
            </Svg>

            <Animated.ScrollView
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{ width: lineLength * 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { x },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              horizontal
            />
          </View>
        </View>
      );
    } else {
      console.log("no");
    }
  }
  moveCursor(value) {
    if (this.state.loaded) {
      const scaleY = scaleLinear()
        .domain([this.state.low, this.state.high])
        .range([height, 0]);
      const properties = path.svgPathProperties(
        buildChart(this.state.data, this.state.low, this.state.high)
      );
      const lineLength = properties.getTotalLength();
      const { x, y } = properties.getPointAtLength(lineLength - value);
      this.cursor.current.setNativeProps({
        top: y - 63,
        left: x - 40.5,
      });

      const label = scaleY.invert(y);
      this.label.current.setNativeProps({ text: `${label.toFixed(2)}` });
    }
  }
  stockHeader() {
    const params = this.props.route.params;
    const startPrice = this.state.chartData[0];
    const currentPrice = params.price.currentPrice;
    const priceChange = (currentPrice - startPrice).toFixed(2);
    const percentage = ((priceChange / startPrice) * 100).toFixed(2);

    let chartColor = styles.green;
    if (priceChange < 0) {
      chartColor = styles.red;
    }
    return (
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
              uri: params.logo,
            }}
          />

          <View style={styles.stockNameView}>
            <Text style={styles.stockName}>{params.name}</Text>
            <Text style={styles.stockTicker}>
              {params.stock}-{params.country}
            </Text>
          </View>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {params.currency}
            {currentPrice}
          </Text>
          <Text style={chartColor}>
            {priceChange}
            {"("}
            {percentage}%{")"}
          </Text>
        </View>
      </View>
    );
  }

  getStockAmount() {
    console.log("getstock amount triggered");
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      console.log("user");
      getOwnedStock(user, this.state.stock).then((investment) => {
        console.log("amount---");
        console.log(investment.currency);
        this.setState({
          ownedShares: investment.amount,
          boughtPrice: investment.buyPrice,
          invested: investment.invested,
          currency: investment.currency,
        });
      });
    });
  }
  render() {
    console.log(this.props.route.params);
    const params = this.props.route.params;
    const navigation = this.props.navigation;
    return (
      <PaperProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar backgroundColor="#26325F" />
          <Card style={styles.topCard}>
            {/* --------------header------------------------------ */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <IconButton
                onPress={() => props.navigation.navigate("Chat")}
                icon="chat-outline"
                color={Colors.orange500}
                size={30}
              />
              <View>
                <Button mode="contained" style={styles.ballButton}>
                  {`£${this.props.route.params.funds.replace(
                    /\d(?=(\d{3})+\.)/g,
                    "$&,"
                  )}`}
                </Button>
              </View>
              <IconButton
                icon="bell-outline"
                color={Colors.orange500}
                size={30}
              />
            </View>
          </Card>
          <ScrollView>
            <Button
              style={styles.pageButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.pageButtonText}>&lt; Trade</Text>
            </Button>

            {this.stockHeader()}

            <View style={styles.chartContainer}>
              <View style={styles.chartButtons}>
                {this.chartButtons("1D")}
                {this.chartButtons("7D")}
                {this.chartButtons("1M")}
                {this.chartButtons("3M")}
                {this.chartButtons("1Y")}
                {this.chartButtons("MAX")}
              </View>

              {this.chart(this.state.loaded)}
            </View>

            <View
              style={{
                flexDirection: "row",
                marginLeft: 15,
                marginRight: 15,
                marginTop: 10,
                //   justifyContent: "space-around",
              }}
            >
              <Button
                onPress={() => {
                  this.props.navigation.navigate("Buy", {
                    stock: params.stock,
                    price: params.price,
                    logo: params.logo,
                    name: params.name,
                    priceChange: params.priceChange,
                    percentage: params.price.percentage,
                    ticker: params.stock,
                    funds: params.funds,
                    country: params.country,
                    color: params.color,
                    currency: params.currency,
                    ownedShares: this.state.ownedShares,
                  });
                }}
                //  width={screenWidth / 2 - 50}
                style={styles.tradeButton}
                mode="contained"
              >
                Trade
              </Button>
              <Button
                marginLeft={10}
                color={"#ff7f00"}
                style={styles.FavouriteButton}
              >
                Add to List
              </Button>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  yourInvestmentSelected: !this.state.yourInvestmentSelected,
                });
              }}
            >
              <View style={styles.infoCardTop}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Text style={styles.infoTopText}>Your investment</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {this.icon(this.state.yourInvestmentSelected)}
                </View>
              </View>
            </TouchableOpacity>
            {this.toggleYourInvestment()}
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  infoSelected: !this.state.infoSelected,
                });
              }}
            >
              <View style={styles.infoSection}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Text style={styles.infoTopText}>Info</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {this.icon(this.state.infoSelected)}
                </View>
              </View>
            </TouchableOpacity>
            {this.ToggleInfo()}
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  descSelected: !this.state.descSelected,
                });
              }}
            >
              <View style={styles.infoCardBottom}>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: 10,
                  }}
                >
                  <Text style={styles.infoTopText}>Company Description</Text>
                </View>

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    marginRight: 10,
                  }}
                >
                  {this.icon(this.state.descSelected)}
                </View>
              </View>
            </TouchableOpacity>
            {this.toggleDesc()}
          </ScrollView>

          <View style={styles.footer}></View>
          {navBar(this.props, this.props.route.params.funds)}
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    accent: "#95ff55",
  },
};

// {
//   "address": "Vodafone House, The Connection",
//   "chartColor": "0,151,50,",
//   "chartData": Array [
//     16.81,
//     16.82,
//     16.82,
//     16.82,
//     16.83,
//     16.81,
//     16.76,
//     16.77,
//     16.82,
//     16.82,
//     16.87,
//     16.88,
//     16.885,
//     16.895,
//     16.895,
//     16.89,
//     16.895,
//     16.895,
//     16.73,
//     16.78,
//     16.72,
//     16.75,
//     16.73,
//     16.72,
//     16.84,
//     16.865,
//     16.82,
//     16.825,
//     16.835,
//     16.81,
//     16.745,
//     16.775,
//     16.785,
//     16.75,
//     16.755,
//     16.77,
//     16.96,
//     16.99,
//     17.04,
//     17.01,
//     16.97,
//     17.06,
//     17.01,
//     17.03,
//     17.045,
//     17.025,
//     17,
//     17.025,
//     17.045,
//     17.04,
//     17.065,
//     17.045,
//     17.015,
//     16.74,
//     16.6,
//     16.76,
//     16.8,
//     16.78,
//     16.82,
//     16.83,
//     16.88,
//     16.83,
//     16.79,
//     16.79,
//     16.845,
//     16.84,
//     16.85,
//     16.815,
//     16.805,
//     16.755,
//     16.81,
//     16.805,
//     16.68,
//     16.71,
//     16.69,
//     16.68,
//     16.72,
//     16.74,
//     16.78,
//     16.92,
//     16.94,
//     16.955,
//     16.97,
//     17,
//     17.02,
//     17.03,
//     17,
//     17,
//     17,
//     16.995,
//     17.02,
//     17,
//     17.04,
//     16.98,
//     16.95,
//   ],
//   "city": "NEWBURY",
//   "color": "green",
//   "country": "GB",
//   "currency": "£",
//   "desc": "Vodafone Group Plc engages in telecommunication services in Europe and internationally. The company is headquartered in Newbury, Berkshire and currently employs 96,506 full-time employees.  The firm's business is organized into two geographic regions: Europe, and Africa, Middle East and Asia Pacific (AMAP). Its segments include Europe and AMAP. Its Europe segment includes geographic regions, such as Germany, Italy, the United Kingdom, Spain and Other Europe. The Other Europe includes the Netherlands, Portugal, Greece, Hungary and Romania, among others. Its AMAP segment includes India, South Africa, Tanzania, Mozambique, Lesotho, Africa, Turkey, Australia, Egypt, Ghana, Kenya, and among others. The firm provides a range of services, including voice, messaging and data across mobile and fixed networks.",
//   "employeeTotal": 96506,
//   "exchange": "LONDON STOCK EXCHANGE",
//   "funds": "26511.16",
//   "group": "Telecommunication Services",
//   "industry": "Telecommunication",
//   "logo": "https://storage.googleapis.com/iex/api/logos/VOD.png",
//   "marketCap": 33976.14,
//   "name": "Vodafone Group PLC",
//   "percentChange": "1.13",
//   "price": Object {
// "color": "0,151,50,",
// "currentPrice": "16.99",
// "high": 17.03,
// "low": 16.775,
// "open": 16.8,
// "percentage": 1.1309523809523674,
// "previousClose": 16.8,
// "priceChange": 0.18999999999999773,
// "stockColor": "green",
//   },
//   "priceChange": "0.19",
//   "sector": "Communication Services",
//   "shareOutstanding": 27694.929375,
//   "state": "BERKSHIRE",
//   "stock": "VOD",
//   "stockColor": "green",
// }
