import React, { useState } from "react";
import { View, Alert, Text, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { texts, views, buttons, images, inputs } from "../css/styles.js";
import useStatusBar from "../hooks/useStatusBar";
import { getUserId } from "../utils/functions";
import { loginWithEmail } from "../components/Firebase/firebase";
import * as firebase from "firebase";
import * as LocalAuthentication from "expo-local-authentication";
import "firebase/database";

export default function WelcomeScreen({ navigation }) {
  const [phone, setPhone] = useState(" ");
  const [errorStyle, setErrorStyle] = useState(texts.noWarning);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(
    "email or password is invalid"
  );
  const [user, setUser] = useState();

  useStatusBar("light-content");

  const onFaceId = async () => {
    try {
      // Checking if device is compatible
      const isCompatible = await LocalAuthentication.hasHardwareAsync();

      if (!isCompatible) {
        throw new Error("Your device isn't compatible.");
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (!isEnrolled) {
        throw new Error("No Faces / Fingers found.");
      }

      // Authenticate user
      await LocalAuthentication.authenticateAsync();

      navigation.navigate("Stock");
    } catch (error) {
      Alert.alert("An error as occured", error?.message);
    }
  };

  async function logginTapped() {
    console.log(email);
    if (email && password) {
      try {
        await loginWithEmail(email, password);
        firebase.auth().onAuthStateChanged((user) => {
          console.log(user.uid);
          if (user.uid) {
            navigation.navigate("Stock");
          }
        });
      } catch (error) {
        console.log(error.message);
        setErrorStyle(texts.warning);
      }
    }
  }

  return (
    <View style={views.container}>
      <View>
        <View>
          <Image
            style={images.peakLogoSignup}
            source={require("../assets/newLogo.png")}
          />
          <Image
            style={images.peakLogoSignup2}
            source={require("../assets/Logotext.png")}
          />
        </View>
      </View>

      <View>
        <View style={views.card}>
          <View style={views.innerMargin}>
            <Text style={texts.white25}>Sign In</Text>
          </View>

          <TextInput
            style={inputs.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
          <View style={{ height: 10 }} />
          <TextInput
            style={inputs.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(val) => setPassword(val)}
          ></TextInput>

          <Text style={errorStyle}>{errorMessage}</Text>
          <View
            style={{
              width: "80%",
              alignSelf: "center",
              paddingBottom: 20,
            }}
          >
            <Button
              style={{
                alignSelf: "center",
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("ResetPassword")}
            >
              <Text style={texts.white13}>Forgotten Password?</Text>
            </Button>
            <Button
              title="Login"
              style={buttons.signUp}
              onPress={() => logginTapped()}
            >
              <Text style={texts.white13}>Login</Text>
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                height: 50,
              }}
            >
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={texts.white13}>Don't have an account?</Text>
              </View>

              <Button
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={texts.orange15}>Sign Up</Text>
              </Button>
            </View>
          </View>
        </View>
        <Button title="Sign in with Face ID" onPress={onFaceId}>
          Face ID
        </Button>
      </View>
    </View>
  );
}
