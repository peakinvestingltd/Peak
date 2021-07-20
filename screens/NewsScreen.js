import React, { useEffect, useState } from "react";
import { styles } from "../css/styles.js";
import {
  DefaultTheme,
  Chip,
  Card,
  Button,
  Paragraph,
  Searchbar,
  FAB,
  Title,
  Colors,
  IconButton,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Image,
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  Linking,
} from "react-native";
import axios from "axios";
import Spinner from "../components/Spinner";
import header from "../components/header.js";
import navBar from "../components/navBar.js";

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  getData() {
    fetch(
      "https://finnhub.io/api/v1/news?category=general&token=c29d3o2ad3ib4ac2prkg"
    )
      .then((response) => response.json())
      .then((stocksList) => {
        this.setState({ data: stocksList });
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    const listItems = this.state.data.map((stock) => (
      <Card key={stock.url} style={styles.newsCard}>
        <Title style={styles.titleText}>{stock.category}</Title>

        <Text style={styles.newsTitle}>{stock.headline}</Text>
        <Paragraph style={styles.text}>{stock.summary}</Paragraph>
        <Button
          onPress={() => {
            Linking.openURL(stock.url);
          }}
          mode="contained"
        >
          {" "}
          Read{" "}
        </Button>
      </Card>
    ));

    if (this.state.data.length == 0) {
      return <Spinner />;
    }

    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Card style={styles.topCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <IconButton
                icon="chat-outline"
                color={Colors.orange500}
                size={30}
              />
              <View>
                <Title style={styles.titleText}>Portfolio balance</Title>
                <Button
                  mode="contained"
                  style={{
                    backgroundColor: Colors.orange500,
                    borderRadius: 20,
                  }}
                >
                  £{this.state.funds}
                </Button>
              </View>
              <IconButton
                icon="bell-outline"
                color={Colors.orange500}
                size={30}
              />
            </View>
          </Card>
          <ScrollView>{listItems}</ScrollView>
        </SafeAreaView>
        <View style={styles.footer}></View>
        <View style={styles.navBar}>
          <IconButton
            icon={"chart-line-variant"}
            color={"white"}
            size={35}
            style={styles.navButton}
            onPress={() => this.props.navigation.navigate("Stock")}
          ></IconButton>
          <IconButton
            icon={"account"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => this.props.navigation.navigate("Portfolio")}
          ></IconButton>
          <IconButton
            icon={"newspaper"}
            style={styles.navButton}
            size={35}
            color={"#ff7f00"}
            onPress={() => this.props.navigation.navigate("News")}
          ></IconButton>
          <IconButton
            icon={"magnify"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => this.props.navigation.navigate("Search")}
          ></IconButton>
          <IconButton
            icon={"menu"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => this.props.navigation.navigate("Home")}
          ></IconButton>
        </View>
      </PaperProvider>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
    primary: "#222948",
    accent: "#f1c40f",
  },
};
