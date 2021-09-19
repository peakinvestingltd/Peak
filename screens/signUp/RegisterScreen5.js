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
import { views, texts, images, inputs, buttons } from "../../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";

import {
  getToken,
  createClient,
  updateSignUp,
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

  const [NIStyle, setNIStyle] = useState(texts.noWarning);
  const [checkedStyle, setCheckedStyle] = useState(texts.noWarning);
  const [niWarning, setNiWarning] = useState(" ");
  const [checkedWarning, setCheckedWarning] = useState(" ");

  function nextButtonPressed() {
    if (NI && checked) {
      getUserId().then((user) => {
        //   updateSignUp(user, {
        //     secclID: id,
        //     NI: NI,
        //     termsAcepted: checked,
        //     signUp: "compleat",
        //     GIA: "GIAnum",
        //   });
        getToken().then((token) => {
          getUserInfo(user.uid).then((res) => {
            console.log(res.title);
            console.log(res.firstName);
            console.log(res.lastName);
            console.log(res.gender);
            console.log(res.address);
            console.log(res.city);
            console.log(res.country);
            console.log(res.postcode);
            console.log(res.dob);
            console.log(res.nationality);
            createClient(res, token, user).then((id) => {
              updateSignUp(user, {
                secclID: id,
                NI: NI,
                termsAcepted: checked,
                signUp: "compleat",
              });
            });
          });
        });
      });

      //  props.navigation.navigate("Stock");
    } else {
      if (!NI) {
        setNiWarning("* Please fill in your National Insurance number");
        setNIStyle(texts.warning);
      } else {
        setNIStyle(texts.noWarning);
      }
      if (!checked) {
        setCheckedWarning("* You must accept the terms and conditions");
        setCheckedStyle(texts.warning);
      } else {
        setCheckedStyle(texts.noWarning);
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
          <View style={views.loadBar5Compleated}></View>
        </View>
        <View style={views.card}>
          <View style={views.innerMargin}>
            <Text style={texts.white20}>
              Sign Up | <Text style={texts.white15}>Step 5 of 5</Text>
            </Text>
          </View>

          <TextInput
            style={inputs.input}
            placeholder="NI Number*"
            onChangeText={(val) => setNI(val)}
          ></TextInput>
          <Text style={NIStyle}>{niWarning}</Text>
          <View style={{ marginLeft: 20, marginRight: 0 }}>
            <View style={{ width: ScreenWidth - 60 }}>
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
                  <Text style={texts.white15}>
                    By signing up you accept the
                    <Text style={texts.orange15}> Terms of Service</Text> and
                    <Text style={texts.orange15}> Privacy Policy</Text>
                  </Text>
                }
                onIconPress={() => {
                  setChecked(!checked);
                }}
              />
            </View>
          </View>
          <Text style={checkedStyle}>{checkedWarning}</Text>
          <View style={{ height: 15 }} />
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
              marginTop: 10,
              marginBottom: 5,
            }}
          >
            <Text style={texts.white13}>
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
