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

import * as firebase from "firebase";
import "firebase/database";

let axios = require("axios");
const db = firebase.firestore();
const screenWidth = Dimensions.get("window").width;

const finnhubApiKey = "c29d3o2ad3ib4ac2prkg";
// =========================================app functions=====================================

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
      });

    if (obj.type == "Bought") {
      db.collection("users")
        .doc(user.uid)
        .collection("funds")
        .doc("practiceBalance")
        .set({
          amount: Number(obj.balance) - Number(obj.totalCost),
        });

      db.collection("users")
        .doc(user.uid)
        .collection("practiceInvestments")
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
        });
    } else {
      db.collection("users")
        .doc(user.uid)
        .collection("funds")
        .doc("practiceBalance")
        .set({
          amount: Number(obj.balance) + Number(obj.totalCost),
        });

      if (Number(obj.ownedShares) - Number(obj.amount) == 0) {
        db.collection("users")
          .doc(user.uid)
          .collection("practiceInvestments")
          .doc(obj.ticker)
          .delete()
          .then(() => console.log("user deleted"));
      } else {
        console.log(Number(obj.ownedShares) - Number(obj.amount));
        db.collection("users")
          .doc(user.uid)
          .collection("practiceInvestments")
          .doc(obj.ticker)
          .set({
            amount: Number(obj.ownedShares) - Number(obj.amount),
            price: obj.price,
            investment:
              (Number(obj.ownedShares) - Number(obj.amount)) *
              Number(obj.price).toFixed(2),
            ticker: obj.ticker,
            logo: obj.logo,
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

//=========================================================FINNHUB==================================================================================

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
      id = res.data.id;
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return id;
}

async function createAccount(type, id, token) {
  let accountId;
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
      accountId = res.data.id;
    })
    .catch((err) => {
      console.log(err);
    });
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
};
