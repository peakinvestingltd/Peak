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
  Switch,
  Platform,
} from "react-native";
import { Text, Card, Button, IconButton } from "react-native-paper";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { Provider as PaperProvider } from "react-native-paper";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { styles, views, buttons, texts, images } from "../css/styles.js";
import {
  getFinnhubChart,
  buildChart,
  getOwnedStock,
  addSaved,
} from "../utils/functions";

const height = 150;
const width = ScreenWidth - 20;

import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";
import { scaleLinear } from "d3-scale";
import { TextInput } from "react-native";

import * as firebase from "firebase";
import "firebase/database";
import Header from "../components/header.js";
import navBar from "../components/navBar.js";
import { interpolate } from "react-native-reanimated";
let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();
const cursorRadius = 6;

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
    switchValue: false,
    switchEditValue: false,
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
        <View style={views.bottomDropdown}>
          <Text style={texts.infoText}>{this.props.route.params.desc}</Text>
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
          <View>
            <View style={views.segment}>
              <View style={views.columCenter}>
                <Text style={texts.white13}>Owned shares</Text>
              </View>
              <View style={views.columCenter}>
                <Text style={texts.faded15}>{this.state.ownedShares}</Text>
              </View>
            </View>

            <View style={views.segment}>
              <View style={views.columCenter}>
                <Text style={texts.white13}>Invested</Text>
              </View>
              <View style={views.columCenter}>
                <Text style={texts.faded15}>{this.state.invested}</Text>
              </View>
            </View>

            <View style={views.segment}>
              <View style={views.columCenter}>
                <Text style={texts.white13}>Bought at</Text>
              </View>
              <View style={views.columCenter}>
                <Text style={texts.faded15}>
                  {this.state.currency}
                  {this.state.boughtPrice}
                </Text>
              </View>
            </View>
            <View style={views.segment}>
              <View style={views.columCenter}>
                <Text style={texts.white13}>Total value</Text>
              </View>
              <View style={views.columCenter}>
                <Text style={texts.faded15}>
                  {this.state.ownedShares *
                    this.props.route.params.price.currentPrice}
                </Text>
              </View>
            </View>
            <View style={{ height: 1, marginBottom: -4 }} />
          </View>
        );
      } else {
        console.log("dosnt have owned shares");
        return (
          <View>
            <View style={views.segment}>
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  height: 50,
                }}
              >
                <Text style={texts.white13}>
                  You are not yet invested in this company!
                </Text>
              </View>
              <View style={views.columCenter}></View>
            </View>
            <View style={{ height: 1, marginBottom: -4 }} />
          </View>
        );
      }
    }
  }
  ToggleInfo() {
    const params = this.props.route.params;
    if (this.state.infoSelected) {
      return (
        <View>
          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Name</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.name}</Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Total employees</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>
                {Math.round(params.employeeTotal)}
              </Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Industry</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.industry}</Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Group</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.group}</Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Sector</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.sector}</Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Market cap</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.marketCap}</Text>
            </View>
          </View>

          <View style={views.segment}>
            <View style={views.columCenter}>
              <Text style={texts.white13}>Shares outstanding</Text>
            </View>
            <View style={views.columCenter}>
              <Text style={texts.faded15}>{params.shareOutstanding}</Text>
            </View>
          </View>
          <View style={{ height: 1, marginBottom: -4 }} />
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
      style = views.selectedChartIcon;
    } else {
      style = views.chartIcon;
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
            <Text style={texts.chartTextButton}>{value}</Text>
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
      const translateX = x.interpolate({
        inputRange: [-20, lineLength + 25],
        outputRange: [width - 100, 40],
      });
      return (
        <View style={styles.chartContainer}>
          <View
            style={{
              height: 40,
              width: 100,
              flexDirection: "row",
              justifyContent: "center",
              position: "absolute",
              right: 0,
            }}
          >
            <View
              style={{
                width: 100,
                height: 40,
                backgroundColor: "black",
                opacity: 0.2,
                borderRadius: 10,
                position: "absolute",
              }}
            />
            <TextInput
              style={texts.orangeRowCenter}
              ref={this.label}
            ></TextInput>
          </View>
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
                {/* <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: "black",
                    position: "absolute",
                    top: 15,
                    opacity: 0.2,
                    borderRadius: 10,
                  }}
                /> */}
                {/* <View
                  style={{
                    height: 35,
                    width: "100%",
                    marginBottom: 0,
                    opacity: 1,
                  }}
                > */}
                {/* <TextInput
                    style={{
                      color: "white",
                      alignSelf: "center",
                      marginBottom: 10,
                    }}
                    ref={this.label}
                  ></TextInput> */}
                {/* </View> */}
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
                      borderColor: "#ff7f00",
                      borderWidth: 3,
                      backgroundColor: "#ff7f00",
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
      <View style={views.cardTop}>
        <View style={views.rowSpaceBetween}>
          <Image
            style={images.stockImageSmall}
            source={{
              uri: params.logo,
            }}
          />

          <View style={views.centerContent}>
            <Text style={texts.white13}>{params.name}</Text>
            <Text style={texts.stockTicker}>
              {params.stock}-{params.country}
            </Text>
          </View>
        </View>

        <View style={views.centerContent}>
          <Text style={texts.price}>
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
    firebase.auth().onAuthStateChanged((user) => {
      getOwnedStock(user, this.state.stock).then((investment) => {
        this.setState({
          ownedShares: investment.amount,
          boughtPrice: investment.buyPrice,
          invested: investment.invested,
          currency: investment.currency,
        });
      });
    });
  }
  bottowBropDown(selected) {
    if (selected) {
      return views.centerSection;
    } else {
      return views.bottomSection;
    }
  }

  render() {
    const params = this.props.route.params;
    const navigation = this.props.navigation;

    return (
      <SafeAreaView style={views.container}>
        <StatusBar backgroundColor="#26325F" />
        <Header />
        <IconButton
          icon="chevron-left"
          size={30}
          color="whitesmoke"
          style={buttons.titleBack}
          onPress={() => navigation.goBack()}
        />
        <ScrollView style={{ marginBottom: Platform.OS === "ios" ? 50 : 100 }}>
          {this.stockHeader()}

          <View style={views.defaultView}>
            <View style={views.rowSpaceBetween}>
              {this.chartButtons("1D")}
              {this.chartButtons("7D")}
              {this.chartButtons("1M")}
              {this.chartButtons("3M")}
              {this.chartButtons("1Y")}
              {this.chartButtons("MAX")}
            </View>

            {this.chart(this.state.loaded)}

            <View style={{ justifyContent: "space-between", margin: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <Text style={{ color: "white", fontFamily: "Avenir" }}>
                  Show Target Line
                </Text>
                <Switch
                  value={this.state.switchValue}
                  onValueChange={(switchValue) =>
                    this.setState({ switchValue })
                  }
                />
                {console.log(this.state.switchValue)}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: 5,
                }}
              >
                <Text style={{ color: "white", fontFamily: "Avenir" }}>
                  Edit Target Line
                </Text>

                <Switch
                  value={this.state.switchEditValue}
                  onValueChange={(switchEditValue) =>
                    this.setState({ switchEditValue })
                  }
                />
                {console.log(this.state.switchEditValue)}
              </View>
            </View>
          </View>

          <View style={views.twoButtons}>
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
              style={buttons.orangeFill}
              mode="contained"
            >
              Trade
            </Button>
            <Button
              marginLeft={10}
              color={"#ff7f00"}
              style={buttons.noFill}
              onPress={() => {
                firebase.auth().onAuthStateChanged((user) => {
                  addSaved(user, params.stock);
                });
              }}
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
            <View style={{ height: 10 }} />
            <View style={views.cardTop}>
              <View style={views.columCenter}>
                <Text style={texts.white15}>Your Investment</Text>
              </View>

              <View style={views.columCenter}>
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
            <View style={views.centerSection}>
              <View style={views.columCenter}>
                <Text style={texts.white15}>Info</Text>
              </View>

              <View style={views.columCenter}>
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
            <View style={this.bottowBropDown(this.state.descSelected)}>
              <View style={views.columCenter}>
                <Text style={texts.white15}>Company Description</Text>
              </View>
              <View style={views.columCenter}>
                {this.icon(this.state.descSelected)}
              </View>
            </View>
          </TouchableOpacity>
          {this.toggleDesc()}
          <View style={{ height: 10 }} />
        </ScrollView>

        {navBar(this.props, this.props.route.params.funds)}
      </SafeAreaView>
    );
  }
}
