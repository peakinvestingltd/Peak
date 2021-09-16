import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  Image,
} from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import { views, buttons, texts, images, inputs } from "../../css/styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "../../assets/Peak-App-Logo.svg";
import { registerWithEmail } from "../../components/Firebase/firebase";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
import { ScreenWidth } from "react-native-elements/dist/helpers";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen2(props) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("00000000000");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [emailStyle, setEmailStyle] = useState(texts.noWarning);
  const [passwordStyle, setPasswordStyle] = useState(texts.noWarning);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(email, password) {
    try {
      await registerWithEmail(email, password).then(() => {
        props.navigation.navigate("Register2", {
          phone: phone,
        });
      });
    } catch (error) {
      setErrorMessage(error.message);
      setEmailStyle(texts.warning);
    }
  }

  function nextButtonPressed() {
    if (!password) {
      setPasswordMessage("* Password must be filled in");
      setPasswordStyle(texts.warning);
    } else {
    }
    if (!email) {
      setErrorMessage("* Email must be filled in");
      setEmailStyle(texts.warning);
    }
    let re = /^(?=.*\d)(?=.*[!-@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (re.test(password)) {
      if (password === password2) {
        handleSubmit(email, password);
      } else {
        setPasswordMessage("* Passwords do not match");
        setPasswordStyle(texts.warning);
      }
    } else if (password) {
      setPasswordMessage(
        "* password must be at least 8 characters long and contain 1 upper + lower case letter a number and a special character"
      );
      setPasswordStyle(texts.warning);
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

        <View>
          <View style={views.loadBar}>
            <View style={views.loadBar2Compleated}></View>
          </View>
          <View style={views.card}>
            <View style={views.innerMargin}>
              <Text style={texts.white25}>
                Sign Up <Text style={texts.white20}>| Step 1 of 5</Text>
              </Text>
            </View>

            <TextInput
              style={inputs.input}
              placeholder="Email *"
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
            ></TextInput>
            <Text style={emailStyle}>{errorMessage}</Text>
            <TextInput
              style={inputs.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              onChangeText={(val) => setPhone(val)}
            ></TextInput>

            <Text style={texts.noWarning}>.</Text>
            <TextInput
              style={inputs.input}
              placeholder="Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
            ></TextInput>
            <Text style={texts.noWarning}>.</Text>
            <TextInput
              style={inputs.input}
              placeholder="Confirm Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword2(val)}
            ></TextInput>
            <Text style={passwordStyle}>{passwordMessage}</Text>
          </View>
        </View>

        <View
          style={{
            marginBottom: 10,
          }}
        >
          <Button
            style={buttons.orangeFill}
            title="Next"
            onPress={() => {
              nextButtonPressed();
            }}
          >
            <Text style={texts.white13}>Next</Text>
          </Button>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={texts.white13}
              onPress={() => {
                props.navigation.navigate("Welcome");
              }}
            >
              Already have an account?{" "}
              <Text style={texts.orange15}>Sign In</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
