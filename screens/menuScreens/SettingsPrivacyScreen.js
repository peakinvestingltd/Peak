import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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
import Header from "../../components/header";
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
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

export default function SettingPrivacyScreen(props) {
  const [privacy, setPrivacy] = useState(false);
  const [password, setPassword] = useState(false);
  const [terms, setTerms] = useState(false);
  const [about, setAbout] = useState(false);

  function privacySelected(selected) {
    if (selected) {
      return (
        <View style={styles.infoContents}>
          <Text style={styles.infoText}>here</Text>
        </View>
      );
    }
  }
  function aboutSelected(selected) {
    if (selected) {
      return (
        <View style={styles.infoContents}>
          <Text style={styles.infoText}>here</Text>
        </View>
      );
    }
  }
  function passwordSelected(selected) {
    if (selected) {
      return (
        <View style={styles.infoContents}>
          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              onChangeText={(input) => {
                email = input;
              }}
            ></TextInput>
          </View>
          <Button
            color="white"
            uppercase={false}
            style={styles.orangeFillButton}
            onPress={() => {
              console.log(email);
              passwordReset(email).then((res) => {
                console.log(res);
              });
            }}
          >
            Reset Password
          </Button>
          <View style={{ height: 20 }} />
        </View>
      );
    }
  }
  function termsSelected(selected) {
    if (selected) {
      return (
        <View style={styles.infoContents}>
          <Text style={styles.infoText}>here</Text>
        </View>
      );
    }
  }
  function icon(section) {
    if (section) {
      return <EvilIcons name="chevron-down" size={40} color="white" />;
    } else {
      return <EvilIcons name="chevron-right" size={40} color="white" />;
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; Settings and Privacy</Text>
        </Button>

        <TouchableOpacity
          onPress={() => {
            setPassword(!password);
          }}
        >
          <View style={styles.cardTop}>
            <View style={styles.innerCardView}>
              <Text style={styles.infoTopText}>Reset Password</Text>
            </View>
            <View style={styles.innerCardView}>{icon(password)}</View>
          </View>
        </TouchableOpacity>
        {passwordSelected(password)}
        <TouchableOpacity
          onPress={() => {
            setPrivacy(!privacy);
          }}
        >
          <View style={styles.infoSection}>
            <View style={styles.innerCardView}>
              <Text style={styles.infoTopText}>Privacy Policy</Text>
            </View>
            <View style={styles.innerCardView}>{icon(privacy)}</View>
          </View>
        </TouchableOpacity>
        {privacySelected(privacy)}
        <TouchableOpacity
          onPress={() => {
            setTerms(!terms);
          }}
        >
          <View style={styles.infoSection}>
            <View style={styles.innerCardView}>
              <Text style={styles.infoTopText}>Terms &amp; Conditions</Text>
            </View>
            <View style={styles.innerCardView}>{icon(terms)}</View>
          </View>
        </TouchableOpacity>
        {termsSelected(terms)}
        <TouchableOpacity
          onPress={() => {
            setAbout(!about);
          }}
        >
          <View style={styles.infoCardBottom}>
            <View style={styles.innerCardView}>
              <Text style={styles.infoTopText}> About Us</Text>
            </View>
            <View style={styles.innerCardView}>{icon(about)}</View>
          </View>
        </TouchableOpacity>
        {aboutSelected(about)}
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
