import React, { Component, useState } from "react";
import { styles } from "../../css/styles.js";
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
              £{review.funds}
            </Button>
          </View>
          <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
        </View>
      </Card>

      <Card style={styles.newsCard}>
        <Text style={styles.titleText}>{review.stockName}</Text>
        <View style={styles.box1}>
          <View style={styles.rowSpaced}>
            <Text style={styles.text}>price per share</Text>
            <Text style={styles.text}>{review.price}</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Commission</Text>
            <Text style={styles.text}>0%</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Amount of shares</Text>
            <Text style={styles.text}>{review.amount}</Text>
          </View>

          <View style={styles.rowSpaced}>
            <Text style={styles.text}>Total cost</Text>
            <Text style={styles.text}>{review.totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </Card>
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
    </SafeAreaView>
  );
}
