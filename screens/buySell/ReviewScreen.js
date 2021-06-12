import React, { Component, useState } from "react";
import { db, uid, user } from "../../components/Firebase/firebase";
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

export default function ReviewScreen(props) {
  console.log(props);

  const review = props.route.params;
  return (
    <SafeAreaView style={styles.container}>
     <Card style={styles.topCard}>     
              <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center'}}>
                <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
                <View>
                  <Title style={styles.titleText}>Portfolio Balance</Title>
                  <Button mode="contained" style={{backgroundColor:Colors.orange500, borderRadius:20,}}>
                    £{review.funds}
                  </Button>
                  
                </View>
                <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
              </View>
          </Card>

      <ScrollView>
        <Text style={styles.pageTitle}>{review.stockName}</Text>
        <View style={styles.box1}>
          <View style={styles.row}>
            <Text style={styles.leftText}>price per share</Text>
            <Text style={styles.rightText}>{review.price}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.leftText}>Commission</Text>
            <Text style={styles.rightText}>0%</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.leftText}>Amount of shares</Text>
            <Text style={styles.rightText}>{review.amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.leftText}>Total cost</Text>
            <Text style={styles.rightText}>{review.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
        <Button
          style={styles.button}
          onPress={() => {
            console.log(user);
            // const data = {
            //   name: "christopher",
            // };
            // db.collection("users").doc("test").set(data);
          }}
        >
          <Text style={styles.buttonText}>Confirm</Text>
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
    backgroundColor: "whitesmoke",
    height: 110,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    padding: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
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
  icons: {
    flexDirection: "row",
    position: "absolute",
    right: 20,
    bottom: 30,
  },
  catagory: {
    position: "absolute",
    right: 20,
    bottom: 5,
  },
  catagoryText: {
    fontFamily: "Segoe UI",
    fontSize: 15,
    color: "black",
  },
  balance: {
    position: "absolute",
    left: 20,
    bottom: 10,
    backgroundColor: "orange",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 25,
    width: 150,
    height: 30,
    justifyContent: "center",
  },
  balanceText: {
    fontFamily: "Segoe UI",
    fontSize: 18,
    fontWeight: "500",
    color: "whitesmoke",
  },
  portfolio: {
    fontFamily: "Segoe UI",
    position: "absolute",
    left: 20,
    bottom: 35,
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
  //----------------header--------------------
  pageTitle: {
    textAlign: "justify",
    color: "whitesmoke",
    letterSpacing: 1,
    fontSize: 18,
    marginTop: 10,
    fontWeight: "bold",
    marginLeft: 10,
    fontFamily:'Futura'
  },
  box1: {
    width: screenWidth - 20,
    margin: 10,
    height: 150,
    backgroundColor: "#1E2556",
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10,
  },

  rightText: {
    color: "teal",
    fontFamily: "Futura",
    fontSize: 18,
    fontWeight: "600",
  },
  leftText: {
    color: "whitesmoke",
    fontFamily: "Futura",
    textTransform:'capitalize',
    fontSize: 18,
    fontWeight: "600",
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
});