import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Text,
  List,
  Paragraph,
  Colors,
  Title,
  Menu,
  Divider,
  Card,
  Button,
  BottomNavigation,
  IconButton,
} from "react-native-paper";

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

export default function HistoryScreen({ navigation }) {
  useStatusBar("light-content");

  const [history, setHistory] = useState(null);
  const [object, setObject] = useState({});
  // const [load, setLoad] = useState(true);

  function getData() {
    let historyArr = [];
    let obj = {};
    async function getHistory(user) {
      const historyRef = db.collection("users").doc(user).collection("history");

      const snapshot = await historyRef.get();
      if (snapshot.empty) {
        console.log("No matching documents.");
      } else {
        snapshot.forEach((doc) => {
          let data = doc.data();
          historyArr.push(data);
        });
        return historyArr;
      }
    }

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user.uid);
      getHistory(user.uid).then((arr) => {
        let obj = {};
        arr.forEach((item) => {
          console.log(item.date);
          obj[item.date] = [];
        });
        console.log(obj);
        for (let i = 0; i < arr.length; i++) {
          obj[arr[i].date].push(arr[i]);
        }
        setObject(obj);
        setHistory(arr);
        console.log(obj);
      });
    });
  }

  if (history == null) {
    getData();
  }
  // const cardItem = () => {
  //   let obj = {};
  //   let date;
  //   if (history != null) {
  //     history.forEach((item) => {
  //       console.log(item.date);
  //       obj[item.date] = [];
  //     });
  //     console.log(obj);
  //     for (let i = 0; i < history.length; i++) {
  //       obj[history[i].date].push(history[i]);
  //     }
  //     setObject(obj);
  //     // return Object.keys(obj).forEach((date) => {
  //     //   console.log(obj[date]);
  //     //   return (
  //     //     <View>
  //     //       <Text>gfda</Text>;
  //     //     </View>
  //     //   );
  //     // });
  //   }
  // };

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <Card style={styles.topCard}>
          {/* --------------header------------------------------ */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
              onPress={() => this.props.navigation.navigate("Chat")}
              icon="chat-outline"
              color={Colors.orange500}
              size={30}
            />
            <View>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <Button mode="contained" style={styles.headerBall}>
                <Text style={{ color: "white" }}>£add funds</Text>
              </Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>
        {/* --------------header------------------------------ */}
        <ScrollView>
          <Button style={styles.pageButton} onPress={() => navigation.goBack()}>
            <Text style={styles.pageButtonText}>&lt; History</Text>
          </Button>
          {/* {cardItem()} */}
          {Object.keys(object).map((card) => {
            return (
              <View style={styles.cardHistory}>
                <Text style={styles.cardHeader}>{card}</Text>
                <View style={styles.cardDevider}></View>
                {object[card].map((transaction) => {
                  return (
                    <View>
                      <View style={{ flexDirection: "row" }}>
                        {/* add image url to firebase when buying or selling stock */}

                        <Image
                          style={styles.image}
                          source={{
                            uri: `https://storage.googleapis.com/iex/api/logos/${transaction.stock}.png`,
                          }}
                        />

                        <View style={{ alignSelf: "center", marginLeft: 5 }}>
                          <Text style={styles.historyName}>
                            {transaction.stock}
                          </Text>
                          <Text style={styles.historyAction}>
                            {transaction.type + " - " + transaction.amount}
                          </Text>
                        </View>

                        <View style={styles.historyValueBox}>
                          <Text style={styles.historyValue}>
                            {transaction.cost}
                          </Text>
                        </View>
                      </View>

                      <View style={styles.cardDevider}></View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.footer}></View>
        <View style={styles.navBar}>
          <IconButton
            icon={"chart-line-variant"}
            color={"white"}
            size={35}
            style={styles.navButton}
            onPress={() => navigation.navigate("Stock")}
          ></IconButton>
          <IconButton
            icon={"account"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Portfolio")}
          ></IconButton>
          <IconButton
            icon={"newspaper"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("News")}
          ></IconButton>
          <IconButton
            icon={"magnify"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Search")}
          ></IconButton>
          <IconButton
            icon={"menu"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Home")}
          ></IconButton>
        </View>
      </SafeAreaView>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    accent: "#95ff55",
  },
};
