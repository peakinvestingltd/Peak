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
import { styles } from "../css/styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "../assets/Peak-App-Logo.svg";
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

  const [firstStyle, setFirstStyle] = useState(styles.noWarning);
  const [lastStyle, setLastStyle] = useState(styles.noWarning);
  const [titleStyle, setTitleStyle] = useState(styles.noWarning);

  function nextButtonPressed() {
    if (value && firstName && lastName) {
      firebase.auth().onAuthStateChanged((user) => {
        console.log(user);
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
            phoneNumber: props.route.params.phone,
          });
      });
      props.navigation.navigate("Register3");
    } else {
      if (!value) {
        setTitleStyle(styles.warning);
      }
      if (!firstName) {
        setFirstStyle(styles.warning);
      }
      if (!lastName) {
        setLastStyle(styles.warning);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
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
              style={styles.logoStyle1}
              source={require("../assets/newLogo.png")}
            />
            <Image
              style={styles.logoStyle2}
              source={require("../assets/Logotext.png")}
            />
          </View>
        </View>

        <View style={styles.loadBar}>
          <View style={styles.loadBar2Compleated}></View>
        </View>
        <View style={styles.signupCard}>
          <Text style={styles.head1}>
            Sign Up <Text style={styles.head2}>| Step 1 of 4</Text>
          </Text>

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
            style={styles.input}
            placeholder={"Select Your Title"}
          />
          <Text style={titleStyle}>please select your title</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name*"
            onChangeText={(val) => setFirstName(val)}
          ></TextInput>
          <Text style={firstStyle}>please fill in your first name</Text>
          <TextInput
            style={styles.input}
            placeholder="Middle Name (optional)"
            onChangeText={(val) => setMiddleName(val)}
          ></TextInput>
          <Text style={styles.warning}></Text>
          <TextInput
            style={styles.input}
            placeholder="Last Name*"
            onChangeText={(val) => setLastName(val)}
          ></TextInput>
          <Text style={lastStyle}>please fill in your surname</Text>
        </View>
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Button
            style={styles.buttonReg}
            title="Next"
            onPress={() => {
              nextButtonPressed();
            }}
          >
            <Text style={styles.buttonText}>Next</Text>
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
