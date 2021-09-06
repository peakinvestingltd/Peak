import React, { useState } from "react";
import { View, Alert, Text, Image, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import AppButton from "../components/AppButton";
import Colors from "../utils/colors";
import useStatusBar from "../hooks/useStatusBar";
import { getUserId } from "../utils/functions";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { loginWithEmail } from "../components/Firebase/firebase";
import * as firebase from "firebase";
import * as LocalAuthentication from 'expo-local-authentication';
import "firebase/database";

const db = firebase.firestore();

export default function WelcomeScreen({ navigation }) {
  const [phone, setPhone] = useState(" ");
  const [errorStyle, setErrorStyle] = useState(styles.noWarning);
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
        throw new Error('Your device isn\'t compatible.')
      }

      // Checking if device has biometrics records
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      
      if (!isEnrolled) {
        throw new Error('No Faces / Fingers found.')
      }

      // Authenticate user
      await LocalAuthentication.authenticateAsync();

     navigation.navigate("Stock")
    } catch (error) {
      Alert.alert('An error as occured', error?.message);
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
        setErrorStyle(styles.warning);
      }
    }
  }

  return (
    <View style={styles.container}>
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

      <View>
        <View style={styles.welcomeCard}>
          <Text style={styles.head1}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          ></TextInput>
          <View style={{ height: 10 }} />
          <TextInput
            style={styles.input}
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
              <Text
                style={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Forgotten Password?
              </Text>
            </Button>
            <Button
              title="Login"
              style={{
                width: "100%",
                height: 42,
                backgroundColor: "#ff7f00",
                alignSelf: "center",
                borderRadius: 10,
                justifyContent: "center",
                marginBottom: 10,
              }}
              onPress={() => logginTapped()}
            >
              <Text
                style={{
                  color: "white",
                  textTransform: "none",
                }}
              >
                Login
              </Text>
            </Button>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                height:50
              }}
            >
              <View
                style={{ flexDirection: "column", justifyContent: "center" }}
              >
                <Text style={{ color: "white" }}>Don't have an account?</Text>
              </View>

              <Button
                style={{
                  alignSelf: "center",
                  justifyContent: "center",
                }}
                onPress={() => navigation.navigate("Register")}
              >
                <Text
                  style={{
                    color: "#ff7f00",
                    textTransform: "none",
                    height:50
                  }}
                >
                  Sign Up
                </Text>
              </Button>
              
            </View>
            
          </View>
        </View>
        <Button title="Sign in with Face ID" onPress={onFaceId}> Face ID</Button>
      </View>
    </View>
  );
}
