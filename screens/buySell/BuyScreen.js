import React, { Component, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Slider from "@react-native-community/slider";
//import { Title, Button, Card } from "react-native-paper";
import {
  DefaultTheme,
  Card,
  Chip,
  Button,
  Searchbar,
  Colors,
  IconButton,
  Title,
  Provider as PaperProvider,
} from "react-native-paper";
import { styles } from "../../css/styles.js";

import { Value } from "react-native-reanimated";
import { ThemeConsumer } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default function BuyScreen(props) {
  const params = props.route.params;
  const price = params.price.currentPrice;
  const stockName = params.name;
  const currentFunds = params.funds;
  const ticker = params.ticker;
  const ownedShares = params.ownedShares;

  const [count, setCount] = useState(0);
  const [buy, setBuy] = useState(styles.selectedBuyButton);
  const [sell, setSell] = useState(styles.unselectedSellButton);
  const [buySelected, setBuySelected] = useState(true);
  const [buyOrSellFor, setBuyOrSellFor] = useState("Buy for:");
  const [type, setType] = useState("Bought");
  const [maxSlider, setMaxSlider] = useState(Math.floor(currentFunds / price));
  const [orderType, setOrderType] = useState("Market Buy");

  const buyOrSell = () => {
    if (!buySelected) {
      return (
        <View style={styles.sharesView}>
          <Text style={styles.tradeText}>Your shares:</Text>
          <Text style={styles.tradeText}>{ownedShares}</Text>
        </View>
      );
    }
  };
  console.log(params);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.topCard}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
          <View>
            <Title style={styles.titleText}>Portfolio Balance</Title>
            <Button
              mode="contained"
              style={{ backgroundColor: Colors.orange500, borderRadius: 20 }}
            >
              £{currentFunds}
            </Button>
          </View>
          <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
        </View>
      </Card>
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Trade</Text>
        </Button>

        <View style={styles.defaultTop}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              resizeMode: "contain",
            }}
          >
            <Text
              style={buy}
              onPress={() => {
                if (buy != styles.selectedButton) {
                  setBuy(styles.selectedBuyButton);
                  setSell(styles.unselectedSellButton);
                  setBuySelected(true);
                  setBuyOrSellFor("Buy for:");
                  setType("Bought");
                  setMaxSlider(Math.floor(currentFunds / price));
                  setCount(0);
                  setOrderType("Market Buy");
                }
              }}
            >
              Buy
            </Text>
            <Text
              style={sell}
              onPress={() => {
                if (sell != styles.selectedButton) {
                  setSell(styles.selectedSellButton);
                  setBuy(styles.unselectedBuyButton);
                  setBuySelected(false);
                  setBuyOrSellFor("Sell for:");
                  setType("Sold");
                  setMaxSlider(ownedShares);
                  setCount(0);
                  setOrderType("Market Sell");
                }
              }}
            >
              Sell
            </Text>
          </View>
        </View>
        <View style={styles.defaultView}>
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
              {price}
            </Text>
            <Text style={styles[props.route.params.color]}>
              {props.route.params.priceChange}
              {"("}
              {params.percentage}%{")"}
            </Text>
          </View>
        </View>
        {buyOrSell()}

        <View style={styles.defaultView}>
          <View style={styles.sliderText}>
            <Text style={styles.yourShares}>Amount of shares</Text>
            <Text style={styles.amountOfShares}>{count}</Text>
          </View>

          <Slider
            style={styles.slider}
            value={count}
            step={1}
            minimumTrackTintColor={"#ff7f00"}
            maximumTrackTintColor={"#8d93a3"}
            thumbTintColor={"white"}
            maximumValue={maxSlider}
            minimumValue={1}
            onValueChange={(value) => {
              setCount(value);
            }}
          ></Slider>
        </View>

        <View style={styles.defaultEndView}>
          <View style={styles.defaultInnerView}>
            <Text style={styles.tradeText}>{buyOrSellFor}</Text>
            <Text style={styles.tradeOrangeText}>
              {" "}
              £{(count.toFixed(0) * price).toFixed(2)}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 15,
            marginLeft: 15,
            marginTop: 20,
          }}
        >
          <Button
            style={styles.tradeReviewButton}
            onPress={() => {
              let total = count * price;
              props.navigation.navigate("Review", {
                price: price,
                amount: count,
                totalPrice: total.toFixed(2),
                stockName: stockName,
                funds: currentFunds,
                logo: props.route.params.logo,
                ticker: ticker,
                balance: currentFunds,
                type: type,
                ownedShares: ownedShares,
                ticker: ticker,
                country: params.country,
                orderType: orderType,
              });
            }}
          >
            <Text style={styles.buttonText}>Review Order</Text>
          </Button>
          <Button
            style={styles.tradeCancleButton}
            onPress={() => {
              console.log("here");
            }}
          >
            <Text style={styles.orangeButtonText}>Cancel</Text>
          </Button>
        </View>
      </ScrollView>

      <View style={styles.footer}></View>
      <View style={styles.navBar}>
        <IconButton
          icon={"chart-line-variant"}
          color={"white"}
          size={35}
          style={styles.navButton}
          onPress={() => props.navigation.navigate("Stock")}
        ></IconButton>
        <IconButton
          icon={"account"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Portfolio")}
        ></IconButton>
        <IconButton
          icon={"newspaper"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("News")}
        ></IconButton>
        <IconButton
          icon={"magnify"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Search")}
        ></IconButton>
        <IconButton
          icon={"menu"}
          style={styles.navButton}
          size={35}
          color={"white"}
          onPress={() => props.navigation.navigate("Home")}
        ></IconButton>
      </View>
    </SafeAreaView>
  );
}
