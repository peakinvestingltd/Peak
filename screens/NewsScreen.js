import React, { useEffect, useState } from "react";
import { styles } from '../css/styles.js'
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

export class NewsRoute extends React.Component {
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
      <Card
        key ={stock.url}
        style={{
          marginRight: 15,
          marginLeft: 15,
          marginBottom: 10,
          padding: 20,
          backgroundColor: "#1E2556",
          shadowColor: "black",
          shadowColor: "gainsboro",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 10,
        }}
      >
        <Title style={styles.titleText}>{stock.category}</Title>
        <Button
          onPress={() => {
            Linking.openURL(stock.url);
          }}
          mode="contained"
          style={{ positon: "absolute", bottom: 30, left: 200, width: "30%" }}
        >
          {" "}
          Read{" "}
        </Button>
        <Text
          style={{
            fontFamily: "Futura",
            fontSize: 18,
            fontWeight: "700",
            color: "gainsboro",
          }}
        >
          {stock.headline}
        </Text>
        <Paragraph
          style={{
            marginTop: 15,
            fontFamily: "Futura",
            color: "whitesmoke",
          }}
        >
          {stock.summary}
        </Paragraph>
      </Card>
    ));

    if (this.state.data.length == 0) {
      return <Spinner />;
    }

    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
         
         <Card style={styles.topCard}>     
              <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center'}}>
                <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
                <View>
                  <Title style={styles.titleText}>Portfolio balance</Title>
                  <Button mode="contained" style={{backgroundColor:Colors.orange500, borderRadius:20,}}>
                    £{this.state.funds}
                  </Button>
                  
                </View>
                <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
              </View>
             
          </Card>
          <ScrollView style={{ marginTop: 20 }}>{listItems}</ScrollView>
        </SafeAreaView>
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
