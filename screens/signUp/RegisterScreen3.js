import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import Logo from "../../assets/Peak-App-Logo.svg";
import { views, texts, images, inputs, buttons } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen3(props) {
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [postStyle, setPostStyle] = useState(texts.noWarning);
  const [numStyle, setNumStyle] = useState(texts.noWarning);
  const [addressStyle, setAddressStyle] = useState(texts.noWarning);
  const [cityStyle, setCityStyle] = useState(texts.noWarning);

  function nextButtonPressed() {
    if (postcode && address && city && country) {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .update({
            postcode,
            country,
            address,
            city,
            signUp: 4,
          });
      });
      props.navigation.navigate("Register4");
    } else {
      if (!postcode) {
        setPostStyle(texts.warning);
      }
      if (!address) {
        setAddressStyle(texts.warning);
      }
      {
        setNumStyle(texts.warning);
      }
      if (!flatNum) {
        setNumStyle(texts.warning);
      }
      if (!city) {
        setCityStyle(texts.warning);
      }
    }
  }

  return (
    <SafeAreaView style={views.container}>
      <ScrollView>
        <View>
          <View>
            <Image
              style={images.peakLogoSignup}
              source={require("../../assets/newLogo.png")}
            />
            <Image
              style={images.peakLogoSignup2}
              source={require("../../assets/Logotext.png")}
            />
          </View>
        </View>

        <View style={views.loadBar}>
          <View style={views.loadBar3Compleated}></View>
        </View>
        <View style={views.card}>
          <View style={views.innerMargin}>
            <Text style={texts.white20}>
              Sign Up | <Text style={texts.white15}>Step 2 of 4</Text>
            </Text>
          </View>

          <TextInput
            style={inputs.input}
            placeholder="Postcode"
            onChangeText={(val) => setPostcode(val)}
          ></TextInput>
          <Text style={postStyle}>please fill in your postcode</Text>

          <TextInput
            style={inputs.input}
            placeholder="Enter Address"
            onChangeText={(val) => setAddress(val)}
          ></TextInput>
          <Text style={numStyle}>please fill in your Adress</Text>

          <TextInput
            style={inputs.input}
            placeholder="City"
            onChangeText={(val) => setCity(val)}
          ></TextInput>
          <Text style={addressStyle}>please fill in your City</Text>

          <TextInput
            style={inputs.input}
            placeholder="Country"
            onChangeText={(val) => setCountry(val)}
          ></TextInput>
          <Text style={cityStyle}>please fill in your Country</Text>
          <View style={{ height: 10 }} />
          <Button
            style={buttons.orangeFill}
            title="Next"
            onPress={() => {
              nextButtonPressed();
            }}
          >
            <Text style={texts.buttonText}>Next</Text>
          </Button>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            <Button
              onPress={() => {
                props.navigation.navigate("Stock");
              }}
            >
              <Text
                style={{
                  color: "#ff7f00",
                  marginTop: 5,
                  textTransform: "none",
                }}
              >
                Skip
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
