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
import { styles } from "../css/styles.js";
import DropDownPicker from "react-native-dropdown-picker";
import Logo from "../assets/Peak-App-Logo.svg";
import { registerWithEmail } from "../components/Firebase/firebase";

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
  const [emailStyle, setEmailStyle] = useState(styles.noWarning);
  const [passwordStyle, setPasswordStyle] = useState(styles.noWarning);
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
      setEmailStyle(styles.warning);
    }
  }

  function nextButtonPressed() {
    if (!password) {
      setPasswordMessage("* Password must be filled in");
      setPasswordStyle(styles.warning);
    } else {
    }
    if (!email) {
      setErrorMessage("* Email must be filled in");
      setEmailStyle(styles.warning);
    }
    let re = /^(?=.*\d)(?=.*[!-@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (re.test(password)) {
      if (password === password2) {
        handleSubmit(email, password);
        console.log("passed");
      } else {
        console.log("fail");
        setPasswordMessage("* Passwords do not match");
        setPasswordStyle(styles.warning);
      }
    } else if (password) {
      setPasswordMessage(
        "* password must be at least 8 characters long and contain 1 upper + lower case letter a number and a special character"
      );
      setPasswordStyle(styles.warning);
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
              style={{
                height: ScreenWidth / 3,
                width: "40%",
                marginTop: -12,
                marginBottom: 0,
                alignSelf: "center",
                resizeMode: "contain",
              }}
              source={require("../assets/Logotext.png")}
            />
          </View>
        </View>

        <View>
          <View style={styles.loadBar}>
            <View style={styles.loadBar2Compleated}></View>
          </View>
          <View style={styles.signupCard}>
            <Text style={styles.head1}>
              Sign Up <Text style={styles.head2}>| Step 1 of 5</Text>
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Email *"
              keyboardType="email-address"
              onChangeText={(val) => setEmail(val)}
            ></TextInput>
            <Text style={emailStyle}>{errorMessage}</Text>
            <TextInput
              style={styles.input}
              placeholder="Mobile Number"
              keyboardType="phone-pad"
              onChangeText={(val) => setPhone(val)}
            ></TextInput>

            <Text style={styles.noWarning}>.</Text>
            <TextInput
              style={styles.input}
              placeholder="Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword(val)}
            ></TextInput>
            <Text style={styles.noWarning}>.</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password *"
              secureTextEntry={true}
              onChangeText={(val) => setPassword2(val)}
            ></TextInput>
            <Text style={passwordStyle}>{passwordMessage}</Text>
          </View>
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
            <Text style={styles.bottomSubText}
            
            onPress={() => {
              props.navigation.navigate("Welcome")
            }} >
              Already have an account?{" "}
              <Text style={{ color: "#ff7f00" }}>Sign In</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
