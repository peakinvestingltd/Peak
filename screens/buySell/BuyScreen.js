import React, { Component, useState } from "react";
import {
  SafeAreaView,
  Dimensions,
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
import { styles } from '../../css/styles.js'
import { ScrollView } from "react-native-gesture-handler";
import { Value } from "react-native-reanimated";
import { ThemeConsumer } from "react-native-elements";

const screenWidth = Dimensions.get("window").width;

export default function BuyScreen(props) {
  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);

  const price = props.route.params.price.currentPrice;
  const stockName = props.route.params.name;
  const currentFunds = props.route.params.funds;
  const ticker = props.route.params.ticker;
  console.log(totalPrice);

  return (
    <SafeAreaView style={styles.container}>
      <Card style={styles.topCard}>     
              <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center'}}>
                <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
                <View>
                  <Title style={styles.titleText}>Portfolio Balance</Title>
                  <Button mode="contained" style={{backgroundColor:Colors.orange500, borderRadius:20,}}>
                    £{currentFunds}
                  </Button>
                  
                </View>
                <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
              </View>
          </Card>
        <Text style={styles.pageTitle}> {stockName}</Text>
        <Card style={styles.newsCard}>
          <View>
            <Image
              style={styles.avatarSmall}
              source={{
                uri: props.route.params.logo,
              }}
            />
          </View>
          
            <View style={styles.rowAround}>
              <Text style={styles.text}>{ticker}</Text>
              <Text style={styles.text}>£{price}</Text>
              <Text style={styles.text}>
                {props.route.params.priceChange}
              </Text>
            </View>
          </Card>
  

        <View style={styles.box2}>
          <Text style={styles.text}>Amount of shares:</Text>
          <Text style={styles.text}>{count.toFixed(0)}</Text>
          <Slider
            style={styles.slider}
            value={count}
            step={1}
            maximumValue={Math.floor(currentFunds / price)}
            minimumValue={1}
            onValueChange={(value) => {
              setCount(value);
            }}
            onSlidingComplete={(value) => {
              setTotalPrice(value * price);
            }}
          ></Slider>
          <Text style={styles.text}>Price:</Text>
          <Text style={styles.text}>
            £{(count.toFixed(0) * price).toFixed(2)}
          </Text>
        </View>

        <Button
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Review", {
              price: price,
              amount: count,
              totalPrice: totalPrice,
              stockName: stockName,
              funds: currentFunds,
              logo: props.route.params.logo,
              ticker: ticker,
            });
          }}
        >
          <Text style={styles.buttonText}>Review Order</Text>
        </Button>
    </SafeAreaView>
  );
}