import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
} from "react-native";
import { Button } from "react-native-paper";
import Logo from "../assets/Peak-App-Logo.svg";
import { styles } from "../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen3(props) {
  const [postcode, setPostcode] = useState("");
  const [flatNum, setFlatNum] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [postStyle, setPostStyle] = useState(styles.noWarning);
  const [numStyle, setNumStyle] = useState(styles.noWarning);
  const [addressStyle, setAddressStyle] = useState(styles.noWarning);
  const [cityStyle, setCityStyle] = useState(styles.noWarning);

  function nextButtonPressed() {
    if (postcode && address && city && flatNum) {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .update({
            postcode: postcode,
            flatNumber: flatNum,
            address: address,
            city: city,
            signUp: 4,
          });
      });
      props.navigation.navigate("Register4");
    } else {
      if (!postcode) {
        setPostStyle(styles.warning);
      }
      if (!address) {
        setAddressStyle(styles.warning);
      }
      {
        setNumStyle(styles.warning);
      }
      if (!flatNum) {
        setNumStyle(styles.warning);
      }
      if (!city) {
        setCityStyle(styles.warning);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View>
          <Image
            style={{
              height: ScreenWidth / 3,
              width: "33%",
              marginTop: 40,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../assets/newLogo.png")}
          />
          <Image
            style={{
              height: ScreenWidth / 3,
              width: "50%",

              marginBottom: 0,
              alignSelf: "center",
              resizeMode: "contain",
            }}
            source={require("../assets/Logotext.png")}
          />
        </View>
      </View>

      <View style={styles.loadBar}>
        <View style={styles.loadBar3Compleated}></View>
      </View>
      <View style={styles.signupCard}>
        <Text style={styles.head1}>
          Sign Up <Text style={styles.head2}>| Step 2 of 4</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Postcode"
          onChangeText={(val) => setPostcode(val)}
        ></TextInput>
        <Text style={postStyle}>please fill in your surname</Text>

        <TextInput
          style={styles.input}
          placeholder=" Flat Or House Number"
          onChangeText={(val) => setFlatNum(val)}
        ></TextInput>
        <Text style={numStyle}>please fill in your surname</Text>

        <TextInput
          style={styles.input}
          placeholder="Address"
          onChangeText={(val) => setAddress(val)}
        ></TextInput>
        <Text style={addressStyle}>please fill in your surname</Text>

        <TextInput
          style={styles.input}
          placeholder="City"
          onChangeText={(val) => setCity(val)}
        ></TextInput>
        <Text style={cityStyle}>please fill in your surname</Text>

        <Button
          style={styles.buttonReg}
          title="Next"
          onPress={() => {
            nextButtonPressed();
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Button>
        <View style={{ justifyContent: "center", flexDirection: "row" }}>
          <Text style={styles.bottomSubText}>
            Already hane an account?{" "}
            <Text style={{ color: "#ff7f00" }}>Sign In</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
