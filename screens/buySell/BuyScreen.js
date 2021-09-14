import React, { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Text,
  View,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Button, Provider as PaperProvider } from "react-native-paper";
import { styles, views, buttons, texts } from "../../css/styles.js";
import Header from "../../components/header.js";
import navBar from "../../components/navBar.js";

export default function BuyScreen(props) {
  const params = props.route.params;
  const price = params.price.currentPrice;
  const stockName = params.name;
  const currentFunds = params.funds;
  const ticker = params.ticker;
  let ownedShares = params.ownedShares;
  if (!ownedShares) {
    ownedShares = 0;
  }
  console.log(ownedShares);
  const [count, setCount] = useState(0);
  const [buy, setBuy] = useState(buttons.selectedBuy);
  const [sell, setSell] = useState(styles.unselectedSellButton);
  const [buySelected, setBuySelected] = useState(true);
  const [buyOrSellFor, setBuyOrSellFor] = useState("Buy for:");
  const [type, setType] = useState("Bought");
  const [maxSlider, setMaxSlider] = useState(Math.floor(currentFunds / price));
  const [orderType, setOrderType] = useState("Market Buy");

  const buyOrSell = () => {
    if (!buySelected) {
      return (
        <View style={views.centerSection}>
          <View style={{ alignSelf: "center", marginLeft: 20 }}>
            <Text style={texts.white15}>Your shares:</Text>
          </View>
          <View style={{ alignSelf: "center", marginRight: 20 }}>
            <Text style={texts.white15}>{ownedShares}</Text>
          </View>
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Button
          style={buttons.titleBack}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={texts.pageButtonText}>&lt; Trade</Text>
        </Button>

        <View style={views.cardTop}>
          <View style={views.rowCenter}>
            <Text
              style={buy}
              onPress={() => {
                if (buy != buttons.selectedBuy) {
                  setBuy(buttons.selectedBuy);
                  setSell(buttons.unselectedSell);
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
                if (sell != buttons.selectedSell) {
                  console.log("2");
                  setSell(buttons.selectedSell);
                  setBuy(buttons.unselectedBuy);
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
        <View style={views.defaultView}>
          <View style={views.rowSpaceBetween}>
            <View style={views.rowSpaceBetween}>
              <Image
                style={styles.image}
                source={{
                  uri: props.route.params.logo,
                }}
              />

              <View style={views.center}>
                <Text style={texts.white13}>{props.route.params.name}</Text>
                <Text style={texts.stockTicker}>
                  {props.route.params.ticker}-{props.route.params.country}
                </Text>
              </View>
            </View>

            <View style={views.center}>
              <Text style={texts.price}>
                {props.route.params.currency}
                {price}
              </Text>

              <Text style={texts[props.route.params.color]}>
                {props.route.params.priceChange}
                {"("}
                {params.percentage.toFixed(2)}%{")"}
              </Text>
            </View>
          </View>
        </View>
        {buyOrSell()}

        <View style={views.defaultView}>
          <View style={views.innerMargin}>
            <Text style={texts.white15}>Amount of shares:</Text>
            <Text style={texts.amountOfShares}>{count}</Text>
          </View>

          <Slider
            style={views.slider}
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

        <View style={views.defaultEndView}>
          <View style={views.rowSpaceBetween}>
            <Text style={texts.white15}>{buyOrSellFor}</Text>
            <Text style={texts.tradeOrangeText}>
              {" "}
              £{(count.toFixed(0) * price).toFixed(2)}
            </Text>
          </View>
        </View>
        <View style={views.twoButtons}>
          <Button
            style={buttons.orangeFill}
            onPress={() => {
              if (count != 0) {
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
                  currency: props.route.params.currency,
                });
              }
            }}
          >
            <Text style={texts.buttonText}>Review Order</Text>
          </Button>
          <Button
            style={buttons.noFill}
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <Text style={texts.orangeButtonText}>Cancel</Text>
          </Button>
        </View>
      </ScrollView>
      <View style={views.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
