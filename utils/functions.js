import React, { useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
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
  TouchableOpacity,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { user } from "../components/Firebase/firebase";
import { styles } from "../css/styles.js";

import * as shape from "d3-shape";
import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";

import * as firebase from "firebase";
import "firebase/database";

let axios = require("axios");
const db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;

const finnhubApiKey = "c29d3o2ad3ib4ac2prkg";
// =========================================app functions=====================================
const portfolioScreenChart = () => {
  return (
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
  );
};
const chart = (data, low, high) => {
  const label = React.useRef(null);
  const width = screenWidth - 30;
  const height = 200;
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
            d={buildChart(data, low, high)}
            stroke={"#1D9440"}
            strokeWidth={1}
          />

          <Path
            d={`${buildChart(
              data,
              low,
              high
            )} L ${width} ${height} L 0 ${height}`}
            fill={"#1D9440"}
            opacity={0.5}
          />
        </Svg>
        <Animated.View
          style={[
            {
              position: "absolute",
              top: -50,
              left: 0,
              backgroundColor: "lightgray",
              padding: 2,
              paddingRight: 5,
              paddingLeft: 5,
              marginTop: 5,
              marginLeft: 5,
            },
          ]}
        >
          <TextInput ref={label}></TextInput>
        </Animated.View>
      </View>
    </View>
  );
};

const buildChart = (data, low, high) => {
  const height = 150;
  const width = screenWidth - 30;
  const d3 = {
    shape,
  };

  const scaleX = scaleLinear()
    .domain([0, data.length - 1])
    .range([0, width]);

  const scaleY = scaleLinear()
    .domain([
      Number(low) - Number(low) / 100,
      Number(high) + Number(high) / 100,
    ])
    .range([height, 0]);

  const line = d3.shape
    .line()
    .x((d) => scaleX(d.x))
    .y((d) => scaleY(d.y))
    .curve(d3.shape.curveBasis)(data);
  return line;
};

const currentStock = (loaded, stockData, props, userBalance) => {
  let data = stockData.data;
  let candles = stockData.chart;
  let price = stockData.price;

  const listItems = loaded.map((stock) => (
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
      <Card style={styles.card}>
        <View style={styles.cardTopList}>
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
                uri: `https://storage.googleapis.com/iex/api/logos/${stock}.png`,
              }}
            />

            <View style={styles.stockNameView}>
              <Text style={styles.stockName}>{data[stock].name}</Text>
              <Text style={styles.stockTicker}>
                {stock}-{data[stock].country}
              </Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              {data[stock].currency}
              {price[stock].currentPrice}
            </Text>

            <Text style={styles[price[stock].stockColor]}>
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
            //  fillShadowGradient: priceData[stock].stockColor,

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
  return listItems;
};

const placeTrade = (obj) => {
  getToken().then((token) => {
    getSecclStock("GB0031215220", token).then((res) => {
      console.log(res);
      createOrder(token, res, 2);
    });
  });
};

const practiceTrade = (obj) => {
  console.log(obj);
  firebase.auth().onAuthStateChanged((user) => {
    console.log(obj.type);
    console.log(obj.fullDate);
    db.collection("users")
      .doc(user.uid)
      .collection("history")
      .doc(`${obj.date}`)
      .set({
        type: obj.type,
        stock: obj.ticker,
        cost: obj.strAmount,
        date: obj.fullDate,
        amount: obj.amount,
        timestamp: obj.date,
        logo: obj.logo,
        currency: obj.currency,
        name: obj.name,
      });

    if (obj.type == "Bought") {
      db.collection("users")
        .doc(user.uid)
        .collection("funds")
        .doc("practiceBalance")
        .set({
          amount: Number(obj.balance) - Number(obj.totalCost),
          currency: obj.currency,
        });

      db.collection("users")
        .doc(user.uid)
        .collection(obj.stockType)
        .doc(obj.ticker)
        .set({
          amount: Number(obj.ownedShares) + Number(obj.amount),
          price: obj.price,
          investment: (
            (Number(obj.ownedShares) + Number(obj.amount)) *
            Number(obj.price)
          ).toFixed(2),
          ticker: obj.ticker,
          logo: obj.logo,
          currency: obj.currency,
          name: obj.name,
        });
    } else {
      db.collection("users")
        .doc(user.uid)
        .collection("funds")
        .doc("practiceBalance")
        .set({
          amount: Number(obj.balance) + Number(obj.totalCost),
          currency: obj.currency,
          name: obj.name,
        });

      if (Number(obj.ownedShares) - Number(obj.amount) == 0) {
        db.collection("users")
          .doc(user.uid)
          .collection(obj.stockType)
          .doc(obj.ticker)
          .delete()
          .then(() => console.log("user deleted"));
      } else {
        console.log(Number(obj.ownedShares) - Number(obj.amount));
        db.collection("users")
          .doc(user.uid)
          .collection(obj.stockType)
          .doc(obj.ticker)
          .set({
            amount: Number(obj.ownedShares) - Number(obj.amount),
            price: obj.price,
            investment:
              (Number(obj.ownedShares) - Number(obj.amount)) *
              Number(obj.price).toFixed(2),
            ticker: obj.ticker,
            logo: obj.logo,
            currency: obj.currency,
            name: obj.name,
          });
      }
    }
  });
};

//============================================FIRESTORE=======================================================================================
const portfolioChart = () => {
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
    getHistory(user.uid).then((arr) => {});
  });
};

async function signUp4(id, NI, terms, user, account) {
  db.collection("users")
    .doc(user.uid)
    .collection("userInfo")
    .doc("signUp")
    .update({
      secclID: id,
      NI: NI,
      termsAcepted: terms,
      signUp: "compleat",
      GIA: account,
    });
}

async function getUserInfo(uid) {
  const userRef = db
    .collection("users")
    .doc(uid)
    .collection("userInfo")
    .doc("signUp");
  console.log(doc);
  const doc = await userRef.get();
  return doc;
}

async function getUserId() {
  let res;
  await firebase.auth().onAuthStateChanged((user) => {
    res = user;
  });
  return res;
}

async function getOwnedStock(user, stock) {
  const userRef = db
    .collection("users")
    .doc(user.uid)
    .collection("practiceStock")
    .doc(stock);

  const doc = await userRef.get();

  if (!doc.exists) {
    return 0;
  } else {
    let amount = doc.data()["amount"];
    let invested = doc.data()["investment"];
    let buyPrice = doc.data()["price"];
    let currency = doc.data()["currency"];
    const investmentData = {
      amount,
      invested,
      buyPrice,
      currency,
    };
    console.log("Document data:", amount);
    return investmentData;
  }
}
async function getBalance(user) {
  const userRef = db
    .collection("users")
    .doc(user.uid)
    .collection("funds")
    .doc("practiceBalance");

  const doc = await userRef.get();

  if (!doc.exists) {
    console.log("No such document!");
    db.collection("users")
      .doc(user.uid)
      .collection("funds")
      .doc("practiceBalance")
      .set({
        amount: 60000,
      });

    let bal = 60000;
    return bal;
  } else {
    let bal = doc.data()["amount"];
    console.log("Document data:", bal);
    return bal;
  }
}
//=========================================================FINNHUB==================================================================================

async function getFinnhubPrices(ticker) {
  let obj = {};
  await fetch(
    `https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${finnhubApiKey}`
  )
    .then((response) => response.json())
    .then((priceList) => {
      obj = priceList;
    })
    .catch((err) => {
      console.log(err);
    });
  return obj;
}

async function getFinnhubChart(ticker, from, to, resolution) {
  let obj = {};
  await fetch(
    `https://finnhub.io/api/v1/stock/candle?symbol=${ticker}&resolution=${resolution}&from=${from}&to=${to}&token=${finnhubApiKey}`
  )
    .then((response) => response.json())
    .then((chartData) => {
      obj = chartData;
    })
    .catch((err) => {
      console.log(err);
    });
  return obj;
}

async function getFinnhubCompanyProfile(ticker) {
  let obj = {};
  await fetch(
    `https://finnhub.io/api/v1/stock/profile?symbol=${ticker}&token=${finnhubApiKey}`
  )
    .then((response) => response.json())
    .then((profileData) => {
      obj = profileData;
    })
    .catch((err) => {
      console.log(err);
    });
  return obj;
}

//===================================================SECCL=======================================

async function getToken() {
  let token = "";

  var data = JSON.stringify({
    firmId: "PKINV",
    id: "029B5J4",
    password: "Peakofficial2023!",
  });

  var config = {
    method: "post",
    url: "https://pfolio-api-staging.seccl.tech/authenticate",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  await axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data.data.token));
      token = response.data.data.token;
    })
    .catch(function (error) {
      console.log(error);
    });
  return token;
}

async function createClient(userData, token, user) {
  /*
  stil needs
  DOB
  phone number
  countrey

  */
  let id = "";
  console.log("in create client seccl");
  console.log(userData);
  console.log(user);
  await fetch("https://pfolio-api-staging.seccl.tech/client", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      "api-token": token,
    },
    body: JSON.stringify({
      firmId: "PKINV",
      nodeId: ["0"],
      clientType: "Individual",
      title: userData.title,
      firstName: userData.firstName,
      surname: userData.lastName,
      gender: userData.gender,
      currency: "GBP",
      addressDetail: {
        flatNumber: userData.flatNumber,
        address1: userData.address,
        address2: userData.city,
        country: "GB",
        postCode: userData.postcode,
      },
      nationality: "GB",
      language: "en",
      email: user.email,
      mobile: {
        number: userData.phoneNumber,
        locale: "en-GB",
        isMobile: true,
      },
      nationalInsuranceNo: userData.NI,
      dateOfBirth: userData.dob,
      taxDomicile: "GB",
      amlStatus: "Approved",
      termsAccepted: true,
    }),
  })
    .then((result) => result.json())
    .then((res) => {
      console.log(res);
      console.log("result++++++++++");
      id = res.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
  return id;
}

async function createAccount(type, id, token) {
  let accountId;
  console.log("in create account seccl GIA");
  await fetch("https://pfolio-api-staging.seccl.tech/account", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Accept: "application/json",
      "api-token": token,
    },
    body: JSON.stringify({
      firmId: "PKINV",
      nodeId: "0",
      accountType: "Wrapper",
      name: `Peak ${type} account`,
      status: "Active",
      currency: "GBP",
      clientId: id,
      wrapperDetail: {
        wrapperType: type,
      },
    }),
  })
    .then((result) => result.json())
    .then((res) => {
      console.log("sign up compleated");
      console.log(res);
      console.log("res");
      accountId = res.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(accountId);
  return accountId;
}

async function bankTransferIn(amount, token) {
  let res;
  console.log("hdhdhdhd");
  await getUserId().then(async (user) => {
    await getUserInfo(user.uid).then((doc) => {
      let data = doc.data();
      console.log("trwytry");
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("api-token", token);

      var raw = JSON.stringify({
        firmId: "PKINV",
        accountId: data.GIA,
        transactionType: "Payment",
        transactionSubType: "Deposit",
        movementType: "In",
        currency: "GBP",
        amount: amount,
        method: "Bank Transfer",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://pfolio-api-staging.seccl.tech/portfoliotransaction",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data.id);
          completePayment(token, result.data.id);
        })
        .catch((error) => console.log("error", error));
    });
  });
}

//------------NOT TESTED---------------
async function bankTransferOut(amount, token) {
  let res;
  await getUserId().then((user) => {
    getUserInfo(user.uid).then((doc) => {
      let data = doc.data();

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("api-token", token);

      var raw = JSON.stringify({
        firmId: "PKINV",
        accountId: data.GIA,
        transactionType: "Payment",
        transactionSubType: "Withdrawal",
        movementType: "Out",
        currency: "GBP",
        amount: amount,
        method: "BACS Credit",
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://pfolio-api-staging.seccl.tech/portfoliotransaction",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  });
  return res;
}

async function getSecclStock(isin, token) {
  let result;
  await fetch(
    `https://pfolio-api-staging.seccl.tech/asset/PKINV?idOrName=${isin}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "api-token": token,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      //result = res.data[0].id;
      console.log("=============");
      console.log("=============");
      console.log("=============");
      console.log("=============");
    });
  return result;
}

async function createOrder(token, stockID, amount) {
  let res;
  await getUserId().then((user) => {
    getUserInfo(user.uid).then((doc) => {
      let data = doc.data();

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("api-token", token);

      var raw = JSON.stringify({
        firmId: "PKINV",
        accountId: data.GIA,
        transactionType: "Order",
        transactionSubType: "At Best",
        movementType: "Invest",
        currency: "GBP",
        amount: amount,
        assetId: stockID,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(
        "https://pfolio-api-staging.seccl.tech/portfoliotransaction",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    });
  });
  return res;
}

async function getAccountInfo(token, accountId) {
  let accountBal = {};
  await fetch(
    `https://pfolio-api-staging.seccl.tech/portfolioaccount/PKINV/${accountId}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "api-token": token,
      },
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      console.log(res.data.uninvestedCash);
      accountBal.freeFunds = res.data.uninvestedCash;
      accountBal.totalBalance = res.data.bookValue;
    });
  return accountBal;
}

function completePayment(token, id) {
  let date = Date.now();
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("api-token", token);

  let raw = JSON.stringify({
    type: "Action",
    firmId: "PKINV",
    transactionAction: "Complete",
    actionReason: "Payment received",
    completedDate: date,
  });

  let requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `https://pfolio-api-staging.seccl.tech/portfoliotransactionaction/PKINV/${id}`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

//==================================================W2============================================

module.exports = {
  getBalance,
  getFinnhubPrices,
  getFinnhubChart,
  getFinnhubCompanyProfile,
  getToken,
  createClient,
  signUp4,
  createAccount,
  getUserInfo,
  getUserId,
  bankTransferIn,
  bankTransferOut,
  getSecclStock,
  createOrder,
  getAccountInfo,
  completePayment,
  placeTrade,
  practiceTrade,
  currentStock,
  buildChart,
  chart,
  getOwnedStock,
  portfolioScreenChart,
};
