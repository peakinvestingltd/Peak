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
import { IconButton, Colors, Button } from "react-native-paper";
import { views, texts, images, inputs, buttons } from "../../css/styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "../../assets/Peak-App-Logo.svg";
import { ScreenWidth } from "react-native-elements/dist/helpers";
//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen2(props) {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");

  const [open, setOpen] = useState(false);
  const [registerError, setRegisterError] = useState("");
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mr", value: "Mr" },
    { label: "Ms", value: "Ms" },
    { label: "Mrs", value: "Mrs" },
    { label: "Miss", value: "Miss" },
    { label: "Dr", value: "Dr" },
  ]);

  const [firstStyle, setFirstStyle] = useState(texts.noWarning);
  const [lastStyle, setLastStyle] = useState(texts.noWarning);
  const [titleStyle, setTitleStyle] = useState(texts.noWarning);

  function nextButtonPressed() {
    if (value && firstName && lastName) {
      console.log("trigger firebaqse");
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user.uid);
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .set({
            title: value,
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            signUp: 3,
          });
      });
      props.navigation.navigate("Register3");
    } else {
      if (!value) {
        setTitleStyle(texts.warning);
      }
      if (!firstName) {
        setFirstStyle(texts.warning);
      }
      if (!lastName) {
        setLastStyle(texts.warning);
      }
    }
  }

  return (
    <SafeAreaView style={views.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
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
          <View style={views.loadBar2Compleated}></View>
        </View>
        <View style={views.card}>
          <View style={views.innerMargin}>
            <Text style={texts.white20}>
              Sign Up | <Text style={texts.white15}>Step 2 of 5</Text>
            </Text>
          </View>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
            style={inputs.input}
            placeholder={"Select Your Title"}
          />
          <Text style={titleStyle}>please select your title</Text>
          <TextInput
            style={inputs.input}
            placeholder="First Name*"
            onChangeText={(val) => setFirstName(val)}
          ></TextInput>
          <Text style={firstStyle}>please fill in your first name</Text>
          <TextInput
            style={inputs.input}
            placeholder="Middle Name (optional)"
            onChangeText={(val) => setMiddleName(val)}
          ></TextInput>
          <Text style={texts.warning}></Text>
          <TextInput
            style={inputs.input}
            placeholder="Last Name*"
            onChangeText={(val) => setLastName(val)}
          ></TextInput>
          <Text style={lastStyle}>please fill in your surname</Text>
          <View style={{ height: 10 }} />
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Button
            style={buttons.orangeFill}
            title="Next"
            onPress={() => {
              nextButtonPressed();
            }}
          >
            <Text style={texts.buttonText}>Next</Text>
          </Button>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 10,
            }}
          >
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
