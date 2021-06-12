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

      <ScrollView>
        <Text style={styles.pageTitle}> {stockName}</Text>
        <View style={styles.logoView}>
          <View>
            <Image
              style={styles.image}
              source={{
                uri: props.route.params.logo,
              }}
            />
          </View>
          <View style={styles.logoText}>
            <Text style={styles.nameText}>{ticker}</Text>
            <Text style={styles.priceText}>£{price}</Text>
            <Text style={styles.changeText}>
              {props.route.params.priceChange}
            </Text>
          </View>
        </View>

        <View style={styles.box2}>
          <Text style={styles.box2Amount}>Amount of shares:</Text>
          <Text style={styles.count}>{count.toFixed(0)}</Text>
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
          <View style={styles.line}></View>
          <Text style={styles.textPrice}>Price:</Text>
          <Text style={styles.priceTotal}>
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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D3E",
  },
  //----------------header--------------------
  header: {
    zIndex: 5,
    backgroundColor: "#1E2556",
    height: 200,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  icons: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  titleText: {
    color: "whitesmoke",
    fontFamily: "Futura",
    letterSpacing: 3,
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 12,
    margin: 4,
  }, 
  balanceText: {
    fontFamily: "Futura",
    fontSize: 18,
    fontWeight: "500",
    color: "whitesmoke",
  },

   topCard: {
    zIndex: 5,
    backgroundColor: "#1E2556",
    height: 90,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    padding: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    marginBottom: 20,
  },
 
  //----------------header--------------------

  pageTitle: {
    textAlign: "justify",
    letterSpacing: 1,
    fontSize: 18,
    marginTop: 10,
    fontWeight: "700",
    marginLeft: 10,
    fontFamily:'Futura',
    color:'whitesmoke',
  },
  logoView: {
    height: 120,
    width: screenWidth - 20,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#1E2556",
    flexDirection: "row",
    
  },
  image: {
    height: 80,
    width: 80,
    borderRadius: 50,
    resizeMode: "contain",
    marginBottom: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  logoText: {
    height: 120,
    justifyContent: "center",
    marginLeft: 30,
    fontSize: 15,
    
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "Futura",
    color:'whitesmoke',
  },
  priceText: {
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "Futura",
    color:'whitesmoke',
  },
  changeText: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: "Futura",
    color: "red",
  },
  button: {
    backgroundColor: "orange",
    borderRadius: 25,
    height: 50,
    width: screenWidth - 20,
    margin: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: "whitesmoke",
    fontSize: 15,
  },
  box2: {
    width: screenWidth - 20,
    height: 165,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
    margin: 10,
    borderRadius: 10,
    color:'whitesmoke',
    backgroundColor: "#1E2556",
  },
  slider: {
    width: screenWidth - 40,
    margin: 10,
  },
  count: {
    color: "orange",
    position: "absolute",
    top: 20,
    right: 20,
    fontWeight: "700",
    fontSize: 20,
  },
  box2Amount: {
    margin: 20,
    fontWeight: "700",
    fontSize: 15,
    fontFamily: "Futura",
    color:'whitesmoke'
  },
  line: {
    width: screenWidth - 20,
    height: 0,
    borderTopColor: "gray",
    borderWidth: 1,
    opacity: 0.1,
  },
  priceTotal: {
    position: "absolute",
    bottom: 20,
    right: 20,
    fontSize: 22,
    fontWeight: "700",
    color: "orange",
  },
  textPrice: {
    position: "absolute",
    bottom: 20,
    left: 20,
    fontSize: 19,
    fontWeight: "700",
  },
});