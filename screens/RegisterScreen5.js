import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
} from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import Logo from "../assets/Peak-App-Logo.svg";
import { CheckBox } from "react-native-elements";
import { styles } from "../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

import {
  getToken,
  createClient,
  signUp4,
  createAccount,
  getUserInfo,
  getUserId,
} from "../utils/functions";

export default function RegisterScreen3(props) {
  const [checked, setChecked] = React.useState(false);
  const [NI, setNI] = useState("");

  const [NIStyle, setNIStyle] = useState(styles.noWarning);
  const [warning, setWarning] = useState(" ");

  function nextButtonPressed() {
    if (NI && checked) {
      getUserId().then((user) => {
        getUserInfo(user.uid).then((doc) => {
          if (!doc.exists) {
            console.log("No such document!");
          } else {
            let data = doc.data();
            let userData = {
              title: data.title,
              firstName: data.firstName,
              middleName: data.middleName,
              lastName: data.lastName,
              flatNumber: data.flatNumber,
              address: data.address,
              postcode: data.postcode,
              city: data.city,
              gender: data.gender,
              nationality: data.nationality,
              NI: NI,
              dob: "1991-09-17",
              phoneNumber: data.phoneNumber,
            };
            getToken()
              .then((token) => {
                createClient(userData, token, user)
                  .then((id) => {
                    createAccount("GIA", id, token).then((res) => {
                      console.log(user);
                      console.log(res);
                      signUp4(id, NI, true, user, res);
                    });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          }
        });
      });
      props.navigation.navigate("Stock");
    } else {
      if (!NI) {
        setWarning("* please fill in your National Insurance number");
      } else {
        setWarning("* you must accept the terms and conditions");
      }
      setNIStyle(styles.warning);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
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
          <View style={styles.loadBar5Compleated}></View>
        </View>
        <View style={styles.signupCard}>
          <Text style={styles.head1}>
            Sign Up <Text style={styles.head2}>| Step 5 of 5</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="NI Number*"
            onChangeText={(val) => setNI(val)}
          ></TextInput>
          <Text style={NIStyle}>{warning}</Text>
          <View style={{ marginLeft: 20, marginRight: 0 }}>
            <CheckBox
              Component={TouchableWithoutFeedback}
              containerStyle={{
                backgroundColor: "#1B2754",
                borderColor: "#1B2754",
              }}
              checked={checked}
              checkedColor={"#FF8001"}
              uncheckedColor={"#FF8001"}
              title={
                <Text
                  style={{
                    color: "white",
                    width: "94%",
                    marginVertical: "2%",
                  }}
                >
                  By signing up you accept the
                  <Text style={styles.hyperlinkText}>
                    {" "}
                    Terms of Service
                  </Text>{" "}
                  and
                  <Text style={styles.hyperlinkText}> Privacy Policy</Text>
                </Text>
              }
              onIconPress={() => {
                setChecked(!checked);
              }}
            />
          </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}
