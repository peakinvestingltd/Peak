import React, { useEffect, useState } from "react";
import {
  DefaultTheme,
  Button,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import Header from "../../components/header";
import navBar from "../../components/navBar";
import { user } from "../../components/Firebase/firebase";
import { styles, views, texts, buttons } from "../../css/styles.js";
import * as firebase from "firebase";
import "firebase/database";
import { TouchableOpacity } from "react-native";
const db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const date = new Date();
let loaded = false;

export default function PortfolioScreen(props) {
  const [funds, setFunds] = useState(props.route.params.funds);
  const [portfolioStock, setPortfolioStock] = useState([]);
  const [newStock, setStock] = useState([]);
  const [totalStockReturn, setTotalStockReturn] = useState(0);
  const [totalStockInvested, setTotalStockInvested] = useState(0);
  const [stockPrice, setStockPrice] = useState({});
  const [wait, setWait] = useState(true);
  const [returnColor, setReturnColor] = useState("gray");

  let test = Number(0);

  let invested = Number(0);

  const setStyle = (num) => {
    const dif = num.priceDif;

    const green = texts.green20;
    const red = texts.red20;
    if (dif >= 0) {
      return green;
    } else {
      return red;
    }
  };

  function getData() {
    let portfolioArr = [];
    async function getStock(user) {
      const stockRef = db
        .collection("users")
        .doc(user)
        .collection("practiceStock");

      const snapshot = await stockRef.get();

      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        snapshot.forEach((doc) => {
          let data = doc.data();
          portfolioArr.push(data);
        });
        return portfolioArr;
      }
    }

    firebase.auth().onAuthStateChanged((user) => {
      getStock(user.uid).then((arr) => {
        loaded = true;
        setPortfolioStock(arr);
      });
    });
  }

  if (wait) {
    setWait(false);
    getData();
  }
  if (portfolioStock) {
    if (portfolioStock.length != 0 && newStock.length == 0) {
      getCurrentPrice();
    }
  }

  function getCurrentPrice() {
    let arr = [];
    portfolioStock.map((item) => {
      let ticker = item.ticker;
      let amount = item.amount;
      let logo = item.logo;
      let investment = item.investment;
      let color = "";
      let colorText = "";
      invested = Number(invested) + Number(investment);
      let obj = {};
      fetch(
        `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=c29d3o2ad3ib4ac2prkg`
      )
        .then((response) => response.json())
        .then((price) => {
          let profit = (amount * price.c - investment).toFixed(2);
          test = Number(test) + Number(profit);
          console.log(test);
          const priceDif = Number(price.c) - Number(price.pc);
          const percentage = (Number(priceDif) / Number(price.c)) * 100;
          if (priceDif > 0) {
            color = "0,151,50,";
            colorText = "green";
          } else {
            color = "231,24,0,";
            colorText = "red";
          }

          obj = {
            currentPrice: price.c.toFixed(2),
            ticker: ticker,
            logo: logo,
            amount: amount,
            investment: investment,
            priceDif: priceDif.toFixed(2),
            percentage: percentage.toFixed(2),
            name: item.name,
            color,
            stockColor: colorText,
            low: price.l,
            high: price.h,
            open: price.o,
            pc: price.pc,
          };
          arr.push(obj);
          if (arr.length == portfolioStock.length) {
            if (test < 0) {
              setReturnColor("#d20c0d");
            } else {
              setReturnColor("#1D9440");
            }
            console.log(invested);
            console.log("invested");
            setTotalStockInvested(invested.toFixed(2));
            setTotalStockReturn(test.toFixed(2));
            setStock(arr);
          }
        })
        .catch((err) => console.log(err));
    });
  }

  const stockAmount = () => {
    if (!portfolioStock) {
      return 0;
    } else {
      return portfolioStock.length;
    }
  };
  return (
    <SafeAreaView style={views.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Portfolio</Text>
        </Button>

        <View style={views.twoButtons}>
          <View style={views.portfolioInvested}>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={texts.white15Center}>Invested</Text>
              <Text style={texts.white25Center}>£{totalStockInvested}</Text>
            </View>
          </View>
          <View
            style={{
              height: 70,
              width: "48%",
              backgroundColor: returnColor,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 10,
            }}
          >
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text style={texts.white15Center}>Return</Text>
              <Text style={texts.white25Center}>£{totalStockReturn}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 10 }} />
        <View style={views.card}>
          <Text style={texts.infoText}>Voting</Text>
          <Text style={texts.infoText}>
            Have your say and vote on important matters within the businesses
            you own shares in.
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginBottom: 10,
              marginLeft: 10,
            }}
          >
            You have <Text style={{ color: "#ff7f00" }}>0</Text> votes
            available!
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View style={{ flexDirection: "row", height: 160 }}>
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("OwnedStock", {
                  funds: props.route.params.funds,
                  stocks: newStock,
                });
              }}
            >
              <View style={views.backgroundSmallCardx3}>
                <View style={{ padding: 10 }}>
                  <Text style={texts.white13}>Stock</Text>
                  <Text style={texts.orange20}>{stockAmount()}</Text>
                  <Text style={texts.faded12}>Invested</Text>
                  <Text style={texts.white20}>£{totalStockInvested}</Text>
                  <Text style={texts.faded12}>Return</Text>
                  <Text style={setStyle(totalStockReturn)}>
                    £{totalStockReturn}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={views.backgroundSmallCardx3}>
              <View style={{ padding: 10 }}>
                <Text style={texts.white13}>Funds</Text>
                <Text style={texts.orange20}>0</Text>
                <Text style={texts.faded12}>Invested</Text>
                <Text style={texts.white20}>£0</Text>
                <Text style={texts.faded12}>Return</Text>
                <Text style={texts.white20}>£0</Text>
              </View>
            </View>

            <View style={views.backgroundSmallCardx3}>
              <View style={{ padding: 10 }}>
                <Text style={texts.white13}>ETFs</Text>
                <Text style={texts.orange20}>0</Text>
                <Text style={texts.faded12}>Invested</Text>
                <Text style={texts.white20}>£0</Text>
                <Text style={texts.faded12}>Return</Text>
                <Text style={texts.white20}>£0</Text>
              </View>
            </View>
          </View>
          <View style={{ width: 10 }} />
        </ScrollView>
      </ScrollView>
      {navBar(props, props.route.params.funds, "portfolio")}
    </SafeAreaView>
  );
}
