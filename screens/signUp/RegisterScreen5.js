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
import Logo from "../../assets/Peak-App-Logo.svg";
import { CheckBox } from "react-native-elements";
import { styles } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

import {
  getToken,
  createClient,
  signUp4,
  createAccount,
  getUserInfo,
  getUserId,
} from "../../utils/functions";
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();

export default function RegisterScreen3(props) {
  const [checked, setChecked] = React.useState(false);
  const [NI, setNI] = useState("");

  const [NIStyle, setNIStyle] = useState(styles.noWarning);
  const [warning, setWarning] = useState(" ");

  function nextButtonPressed() {
    if (NI && checked) {
      console.log("in step 1");
      getUserId().then((user) => {
        console.log(user);
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .update({
            secclID: id,
            NI: NI,
            termsAcepted: checked,
            signUp: "compleat",
            GIA: "GIAnum",
          });
      });

      props.navigation.navigate("Stock");
    } else {
      if (!NI) {
        setWarning("* Please fill in your National Insurance number");
      } else {
        setWarning("* You must accept the terms and conditions");
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
              source={require("../../assets/newLogo.png")}
            />
            <Image
              style={{
                height: ScreenWidth / 3,
                width: "50%",

                marginBottom: 0,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../../assets/Logotext.png")}
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
              Already have an account?{" "}
              <Text style={{ color: "#ff7f00" }}>Sign In</Text>
            </Text>
          </View>
          <View style={{ height: 10, width: 10 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
