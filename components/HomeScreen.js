import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

import price from "./API/finnhub";

export default Home = () => {
  return (
    <View style={styles.container}>
      <price />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
  },
  card: {
    margin: 2,
    backgroundColor: "white",
    color: "white",
    borderWidth: 2,
    borderColor: "whitesmoke",
  },
  text: {
    display: "flex",
    color: "#111",
    fontSize: 14,
    fontFamily: "Futura",
    padding: 10,
    justifyContent: "space-between",
  },
  open: {
    color: "#111",
    fontSize: 20,
    textAlign: "left",
    fontFamily: "Futura",
  },
  close: {
    color: "#111",
    fontSize: 20,
    textAlign: "right",
    fontFamily: "Futura",
  },
  closeOpen: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  stockImage: {
    width: 40,
    height: 40,
  },
});
