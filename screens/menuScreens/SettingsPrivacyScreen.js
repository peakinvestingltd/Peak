import React from "react";
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
import header from "../../components/header";
import navBar from "../../components/navBar";
import {
  bankTransferIn,
  getToken,
  getUserId,
  getUserInfo,
  getAccountInfo,
  createOrder,
  getSecclStock,
} from "../../utils/functions";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

export default function SettingPrivacyScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      {header(props, props.route.params.funds)}
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Settings and Privacy</Text>
        </Button>

        <View style={styles.settingsCard}>
          <TouchableOpacity
            onPress={() => {
              console.log("reset password");
              props.navigation.navigate("ResetPassword", {
                funds: props.route.params.funds,
              });
            }}
          >
            <View style={styles.settingsButtonTop}>
              <Text
                style={{
                  textTransform: "none",
                  color: "white",
                  flexDirection: "row",
                  marginLeft: 20,
                  fontSize: 18,
                }}
              >
                Reset Password
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              console.log("reset password");
            }}
          >
            <View style={styles.settingsButtonBottom}>
              <Text
                style={{
                  textTransform: "none",
                  color: "white",
                  flexDirection: "row",
                  marginLeft: 20,
                  fontSize: 18,
                }}
              >
                Utilities
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}></View>
      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}

{
  /* <Button
style={styles.pageButton}
onPress={() => {
  console.log("yay");
  getToken().then((token) => {
    console.log(token);
    console.log("tokk");
    bankTransferIn(50000, token);
  });
}}
>
<Text style={styles.pageButtonText}>add 50000 to account</Text>
</Button>
<Button
style={styles.pageButton}
onPress={() => {
  console.log("yay");
  getToken().then((token) => {
    console.log(token);
    console.log("tokk");
    getUserId().then((user) => {
      getUserInfo(user.uid).then((doc) => {
        let data = doc.data();
        getAccountInfo(token, data.GIA);
      });
    });
    // createOrder(token, "2921C", 2);
  });
}}
>
<Text style={styles.pageButtonText}>get account info</Text>
</Button>
<Button
style={styles.pageButton}
onPress={() => {
  console.log("yay");
  getToken().then((token) => {
    createOrder(token, "2921C", 2);
  });
}}
>
<Text style={styles.pageButtonText}>buy stock</Text>
</Button>
<Button
style={styles.pageButton}
onPress={() => {
  console.log("yay");
  getToken().then((token) => {
    console.log(token);
    console.log("tokk");

    fetch(
      "https://pfolio-api-staging.seccl.tech/portfoliotransaction/PKINV?transactionType=Order",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "api-token": token,
        },
      }
    )
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}}
>
<Text style={styles.pageButtonText}>retrive orders</Text>
</Button>
<Button
style={styles.pageButton}
onPress={() => {
  let isin = "GB0031215220";
  console.log("yay");
  getToken().then((token) => {
    getSecclStock(isin, token);
  });
}}
>
<Text style={styles.pageButtonText}>get stock id</Text>
</Button>
<Button
style={styles.pageButton}
onPress={() => {
  let isin = "GB0031215220";
  console.log("yay");
  getToken();
}}
>
<Text style={styles.pageButtonText}>get token</Text>
</Button> */
}