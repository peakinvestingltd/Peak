import React, { useEffect, useState } from "react";
import {
  Avatar,
  DefaultTheme,
  IconButton,
  Colors,
  Title,
  Button,
  Card,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

import header from "../components/header";
import navBar from "../components/navBar";
import { user } from "../components/Firebase/firebase";

import { styles } from "../css/styles.js";

import * as firebase from "firebase";
import "firebase/database";

const db = firebase.firestore();

const screenWidth = Dimensions.get("window").width;

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

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
  const [portfolio, setPortfolio] = useState([]);
  const [newPortfolio, setNewPortfolio] = useState([]);
  const [totalReturn, setTotalReturn] = useState(0);
  const [Totalinvested, setTotalInvested] = useState(0);
  const [stockPrice, setStockPrice] = useState({});
  const [wait, setWait] = useState(true);
  const [returnColor, setReturnColor] = useState("gray");
  let test = Number(0);
  let invested = Number(0);
  function goToRegister2() {
    props.navigation.navigate("Register2");
  }

  function goToNextRegister(num) {
    props.navigation.navigate(`Register${num}`);
  }

  function getData() {
    let portfolioArr = [];
    async function getHistory(user) {
      const historyRef = db
        .collection("users")
        .doc(user)
        .collection("practiceInvestments");

      const snapshot = await historyRef.get();
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
      getHistory(user.uid).then((arr) => {
        loaded = true;
        setPortfolio(arr);
      });
    });
  }

  if (wait) {
    setWait(false);
    getData();
  }
  if (portfolio) {
    if (portfolio.length != 0 && newPortfolio.length == 0) {
      getCurrentPrice();
    }
  }

  function getCurrentPrice() {
    let arr = [];
    portfolio.map((item) => {
      let ticker = item.ticker;
      let amount = item.amount;
      let logo = item.logo;
      let investment = item.investment;
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
          obj = {
            currentPrice: price.c,
            ticker: ticker,
            logo: logo,
            amount: amount,
            investment: investment,
          };
          arr.push(obj);
          if (arr.length == portfolio.length) {
            if (test < 0) {
              setReturnColor("#d20c0d");
            } else {
              setReturnColor("#1D9440");
            }
            console.log(invested);
            console.log("invested");
            setTotalInvested(invested.toFixed(2));
            setTotalReturn(test.toFixed(2));
            setNewPortfolio(arr);
          }
        })
        .catch((err) => console.log(err));
    });
  }

  const investmentCards = () => {
    return newPortfolio.map((item, index) => {
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
        <View style={styles.defaultCard} key={index}>
          <View
            style={{
              flexDirection: "row",
              height: 60,
            }}
          >
            <Image
              style={styles.image}
              source={{
                uri: item.logo,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                height: 60,
                width: screenWidth - 90,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: (screenWidth - 200) / 3,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 12, alignSelf: "center" }}
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
                  width: 1,
                  height: "75%",
                  backgroundColor: "gray",
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  justifyContent: "center",
                  width: (screenWidth - 80) / 3,
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
                  width: 1,
                  height: 50,
                  backgroundColor: "gray",
                  alignSelf: "center",
                }}
              ></View>
              <View
                style={{
                  justifyContent: "center",
                  width: (screenWidth - 90) / 3,
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
                  {(item.currentPrice * item.amount - item.investment).toFixed(
                    2
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
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
          <Text style={styles.pageButtonText}>&lt; Portfolio</Text>
        </Button>

        <View
          style={{
            flexDirection: "row",
            margin: 15,
            justifyContent: "space-between",
          }}
        >
          <View style={styles.portfolioInvested}>
            <View style={{ flexDirection: "column", justifyContent: "center" }}>
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  letterSpacing: 0,
                  alignSelf: "center",
                }}
              >
                Invested
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  alignSelf: "center",
                  fontWeight: "bold",
                  letterSpacing: 2,
                }}
              >
                £{Totalinvested}
              </Text>
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
              <Text
                style={{
                  color: "white",
                  fontSize: 17,
                  letterSpacing: 0,
                  alignSelf: "center",
                }}
              >
                Return
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 25,
                  alignSelf: "center",
                  fontWeight: "bold",
                  letterSpacing: 2,
                }}
              >
                £{totalReturn}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.portfolioChartHolder}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginLeft: 15,
              marginRight: 15,
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 15 }}>Activity</Text>
            <Text style={{ color: "#ff7f00", fontSize: 15 }}>
              {date.getFullYear()}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 50,
                  backgroundColor: "green",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Jan</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Feb</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Mar</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Apr</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>May</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Jun</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Jul</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Aug</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Sep</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Oct</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Nov</Text>
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <View
                style={{
                  width: 4,
                  height: 100,
                  backgroundColor: "gray",
                  alignSelf: "center",
                  borderRadius: 25,
                }}
              ></View>
              <Text style={{ fontSize: 10, color: "white" }}>Dec</Text>
            </View>
          </View>
        </View>

        {investmentCards()}

        <View style={{ margin: 10 }}>
          <Button
            style={{
              width: screenWidth - 40,
              height: 40,
              backgroundColor: "whitesmoke",
              margin: 10,
            }}
            onPress={() => {
              async function signUp(user) {
                const userRef = db
                  .collection("users")
                  .doc(user.uid)
                  .collection("userInfo")
                  .doc("signUp");
                const doc = await userRef.get();
                if (!doc.exists) {
                  console.log("No such document!");
                  goToRegister2();
                } else {
                  console.log("Document data:", doc.data().signUp);
                  if (signUp != "compleat") {
                    goToNextRegister(doc.data().signUp);
                  } else {
                    console.log("h");
                  }
                }
              }

              firebase.auth().onAuthStateChanged((user) => {
                signUp(user);
              });
            }}
          >
            <Text>Complete Sign Up</Text>
          </Button>
        </View>
      </ScrollView>

      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds, "portfolio")}
    </SafeAreaView>
  );
}
