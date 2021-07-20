import React, { useState } from "react";
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  useMemo,
  useCallback,
} from "react-native";
import { Title, Button, Card, IconButton, Colors } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Separator } from "native-base";
import { AccordionList } from "accordion-collapse-react-native";
import { styles } from "../css/styles.js";
import header from "../components/header.js";
import navBar from "../components/navBar.js";
const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export default function DetailsScreen(props) {
  const [candles, setCandles] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [ownedShares, setOwnedShares] = useState(0);
  const [stock, setStock] = useState(props.route.params.stock);

  function callChartData() {
    setLoaded(true);
    console.log("called");
    let stockCandle = {};
    let loadedStock = [];

    async function adddata(user) {
      const userRef = db
        .collection("users")
        .doc(user.uid)
        .collection("practiceInvestments")
        .doc(stock);

      const doc = await userRef.get();

      if (!doc.exists) {
        console.log("No such document!");
        let amount = 0;
        return amount;
      } else {
        let amount = doc.data()["amount"];
        console.log("Document data:", amount);
        return amount;
      }
    }

    firebase.auth().onAuthStateChanged((user) => {
      adddata(user).then((amount) => {
        setOwnedShares(amount);
      });
    });

    fetch(
      `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=60&from=${from}&to=${to}&token=${apiKey}`
    )
      .then((response) => response.json())
      .then((chartData) => {
        stockCandle = {
          open: chartData.o,
          high: chartData.h,
          low: chartData.l,
          close: chartData.c,
          volume: chartData.v,
          timestamp: chartData.t,
          status: chartData.s,
        };
        setCandles(stockCandle);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (!loaded) {
    callChartData();
  } else {
    console.log("nooooo");
  }

  const params = props.route.params;
  console.log(params);
  return (
    <SafeAreaView style={styles.container}>
      {header()}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Company Deatails</Text>
        </Button>

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
                uri: props.route.params.logo,
              }}
            />

            <View style={styles.stockNameView}>
              <Text style={styles.stockName}>{props.route.params.name}</Text>
              <Text style={styles.stockTicker}>
                {props.route.params.ticker}-{props.route.params.country}
              </Text>
            </View>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {props.route.params.currency}
              {props.route.params.price.currentPrice}
            </Text>
            <Text style={styles[props.route.params.color]}>
              {props.route.params.priceChange}
              {"("}
              {props.route.params.price.percentage.toFixed(2)}%{")"}
            </Text>
          </View>
        </View>

        <View style={styles.chartContainer}>
          <View style={styles.chartButtons}>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>1D</Text>
            </View>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>7D</Text>
            </View>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>1M</Text>
            </View>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>3M</Text>
            </View>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>1Y</Text>
            </View>
            <View style={styles.chartIcon}>
              <Text style={styles.chartTextButton}>MAX</Text>
            </View>
          </View>
          <LineChart
            bezier
            // hideLegend={false}
            segments={4}
            // withHorizontalLabels={true}
            withVerticalLabels={false}
            yAxisLabel="£"
            yAxisSuffix=""
            withInnerLines={false}
            withOuterLines={false}
            width={screenWidth - 30} // from react-native
            height={screenWidth / 2}
            data={{
              datasets: [
                {
                  data: params.chartData,
                  strokeWidth: 1,
                },
              ],
            }}
            onDataPointClick={(value) => {
              console.log(value);
            }}
            chartConfig={{
              withDots: true,
              strokeWidth: 1.5,
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(${params.chartColor}1)`,
              fillShadowGradientOpacity: 1,
              fillShadowGradient: params.stockColor,
              propsForHorizontalLabels: {
                stroke: "gray",
                textAnchor: "end",
                fontWeight: "100",
                fontSize: 10,
                letterSpacing: 3,
              },

              // propsForBackgroundLines: {
              //   stroke: "transparent",
              // },

              propsForDots: {
                r: "0",
                strokeWidth: "5",
                stroke: "#fff",
              },
            }}
            style={{
              // paddingRight: 0,
              margin: 0,
              borderRadius: 0,
              marginRight: 0,
            }}
          />
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
              props.navigation.navigate("Buy", {
                stock: props.route.params.stock,
                price: props.route.params.price,
                logo: props.route.params.logo,
                name: props.route.params.name,
                priceChange: props.route.params.priceChange,
                percentage: props.route.params.price.percentage.toFixed(2),
                ticker: props.route.params.stock,
                funds: props.route.params.funds,
                country: props.route.params.country,
                color: props.route.params.color,
                currency: props.route.params.currency,
                ownedShares: ownedShares,
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

        <View style={styles.infoCardTop}>
          <Text style={styles.infoTopText}>Info</Text>
        </View>
        <View style={styles.infoContents}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.listText1}>Your shares</Text>
            <Text style={styles.listText2}>{ownedShares}</Text>
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
            <Text style={styles.listText1}>groupe</Text>
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

        <View style={styles.infoCardTop}>
          <Text style={styles.infoTopText}>Company Description</Text>
        </View>
        <View style={styles.infoContents}>
          <Text style={styles.infoText}>{props.route.params.desc}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
