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
import header from "../components/header";
import navBar from "../components/navBar";
import { user } from "../components/Firebase/firebase";
import { styles } from "../css/styles.js";
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

    const green = {
      color: "#1D9440",
      marginLeft: 10,
      fontSize: 20,
    };
    const red = {
      color: "#d20c0d",
      marginLeft: 10,
      fontSize: 20,
    };
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

  const investmentCards = () => {
    return newStock.map((item, index) => {
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

  const stockAmount = () => {
    if (!portfolioStock) {
      return 0;
    } else {
      return portfolioStock.length;
    }
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
            marginTop: 5,
            marginBottom: 5,
            margin: 10,
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
                £{totalStockInvested}
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
                £{totalStockReturn}
              </Text>
            </View>
          </View>
        </View>

        {/* <View style={styles.portfolioChartHolder}>
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
        </View> */}
        <View style={styles.backgroundCard}>
          <Text
            style={{ color: "white", fontSize: 18, margin: 5, marginLeft: 15 }}
          >
            Voting
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 13,
              margin: 5,
              marginLeft: 15,
              opacity: 0.75,
            }}
          >
            Have your say and vote on important matters within the businesses
            you own shares in.
          </Text>
          <Text
            style={{
              color: "white",
              fontSize: 15,
              marginBottom: 10,
              marginLeft: 15,
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
              <View style={styles.backgroundSmallCardx3}>
                <Text style={{ color: "white", marginTop: 8, marginLeft: 12 }}>
                  Stock
                </Text>
                <Text
                  style={{ color: "#ff7f00", marginLeft: 10, fontSize: 20 }}
                >
                  {stockAmount()}
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10,
                    fontSize: 12,
                    opacity: 0.6,
                  }}
                >
                  Invested
                </Text>
                <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
                  £{totalStockInvested}
                </Text>
                <Text
                  style={{
                    color: "white",
                    marginLeft: 10,
                    fontSize: 12,
                    opacity: 0.6,
                  }}
                >
                  Return
                </Text>
                <Text style={setStyle(totalStockReturn)}>
                  £{totalStockReturn}
                </Text>
              </View>
            </TouchableOpacity>

            <View style={styles.backgroundSmallCardx3}>
              <Text style={{ color: "white", marginTop: 8, marginLeft: 12 }}>
                Funds
              </Text>
              <Text style={{ color: "#ff7f00", marginLeft: 10, fontSize: 20 }}>
                0
              </Text>
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Invested
              </Text>
              <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
                £0
              </Text>
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Return
              </Text>
              <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
                £0
              </Text>
            </View>

            <View style={styles.backgroundSmallCardx3}>
              <Text style={{ color: "white", marginTop: 8, marginLeft: 12 }}>
                ETFs
              </Text>
              <Text style={{ color: "#ff7f00", marginLeft: 10, fontSize: 20 }}>
                0
              </Text>
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Invested
              </Text>
              <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
                £0
              </Text>
              <Text
                style={{
                  color: "white",
                  marginLeft: 10,
                  fontSize: 12,
                  opacity: 0.6,
                }}
              >
                Return
              </Text>
              <Text style={{ color: "white", marginLeft: 10, fontSize: 20 }}>
                £0
              </Text>
            </View>
          </View>
          <View style={{ width: 10 }} />
        </ScrollView>
      </ScrollView>

      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds, "portfolio")}
    </SafeAreaView>
  );
}
