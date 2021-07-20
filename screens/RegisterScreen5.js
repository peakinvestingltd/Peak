import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import Logo from "../assets/Peak-App-Logo.svg";
import { CheckBox } from "react-native-elements";
import { styles } from "../css/styles.js";

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

  function nextButtonPressed() {
    if (NI) {
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
            };
            getToken()
              .then((token) => {
                createClient(userData, token, user)
                  .then((id) => {
                    createAccount("GIA", id, token).then((res) => {
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
      setNIStyle(styles.warning);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Logo />
      </View>
      <View style={styles.loadBar}>
        <View style={styles.loadBar5Compleated}></View>
      </View>
      <View style={styles.signupCard}>
        <Text style={styles.head1}>
          Sign Up <Text style={styles.head2}>| Step 4 of 4</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="NI Number*"
          onChangeText={(val) => setNI(val)}
        ></TextInput>
        <Text style={NIStyle}>
          please fill in your National Insurance number
        </Text>
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
                <Text style={styles.hyperlinkText}> Terms of Service</Text> and
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
    </SafeAreaView>
  );
}
