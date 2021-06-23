import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, TextInput, Text,TouchableWithoutFeedback } from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import Logo from "../assets/Peak-App-Logo.svg";
import { CheckBox } from "react-native-elements";
import { styles } from "../css/styles.js";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen3(props) {
  const [checked, setChecked] = React.useState(false);
  const [NI, setNI] = useState("");

  const [NIStyle, setNIStyle] = useState(styles.noWarning);


  function nextButtonPressed() {
    if (NI) {
      firebase.auth().onAuthStateChanged((user) => {
        async function getData(uid) {
          const userRef = db
            .collection("users")
            .doc(uid)
            .collection("userInfo")
            .doc("signUp");
          console.log(doc);
          const doc = await userRef.get();
          if (!doc.exists) {
            console.log("No such document!");
            console.log("uid");
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
            console.log(userData);
            let token = "";

            
            //--------------------------------SECCL API --------------------------------
            fetch("https://pfolio-api-staging.seccl.tech/authenticate", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                firmId: "PKINV",
                id: "029B5J4",
                password: "Peakofficial2023!",
              }),
            })
              .then((response) => response.json())
              .then((res) => {
                console.log(res.data.token);
                token = res.data.token;
                fetch("https://pfolio-api-staging.seccl.tech/client", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                    Accept: "application/json",
                    "api-token": res.data.token,
                  },
                  body: JSON.stringify({
                    firmId: "PKINV",
                    nodeId: ["0"],
                    clientType: "Individual",
                    title: userData.title,
                    firstName: userData.firstName,
                    surname: userData.lastName,
                    gender: userData.gender,
                    currency: "GBP",
                    addressDetail: {
                      flatNumber: userData.flatNumber,
                      address1: userData.address,
                      address2: userData.city,
                      country: "GB",
                      postCode: userData.postcode,
                    },
                    nationality: "GB",
                    language: "en",
                    email: user.email,
                    mobile: {
                      number: "07777000000",
                      locale: "en-GB",
                      isMobile: true,
                    },
                    nationalInsuranceNo: userData.NI,
                    dateOfBirth: "1982-10-01",
                    taxDomicile: "GB",
                    amlStatus: "Approved",
                    termsAccepted: true,
                  }),
                })
                  .then((result) => result.json())
                  .then((res) => {
                    console.log(res);

                    db.collection("users")
                      .doc(user.uid)
                      .collection("userInfo")
                      .doc("signUp")
                      .update({
                        secclID: res.data.id,
                        NI: NI,
                        termsAcepted: true,
                        signUp: "compleat",
                      });

                    fetch("https://pfolio-api-staging.seccl.tech/account", {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                        Accept: "application/json",
                        "api-token": token,
                      },
                      body: JSON.stringify({
                        firmId: "PKINV",
                        nodeId: "0",
                        accountType: "Wrapper",
                        name: "Peak GIA account",
                        status: "Active",
                        currency: "GBP",
                        clientId: res.data.id,
                        wrapperDetail: {
                          wrapperType: "GIA",
                        },
                      }),
                    })
                      .then((result) => result.json())
                      .then((res) => {
                        console.log("sign up compleated");
                        console.log(res);
                      })
                      .catch((err) => console.log(err));
                  })

                  .catch((err) => console.log(err));
              });
          }
        }
        getData(user.uid);
      });
      props.navigation.navigate("Stock");
    }else{
      setNIStyle(styles.warning)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
       <View style={styles.imageContainer}>
        <Logo/>
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
        <Text style={NIStyle}>please fill in your National Insurance number</Text>
    <View style={{marginLeft:20,marginRight:0}}>
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
                <Text style={styles.hyperlinkText}>
                  {" "}
                  Privacy Policy
                </Text>
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
        <View style={{justifyContent:'center',flexDirection:'row'}}>
                  <Text style={styles.bottomSubText}>Already hane an account? <Text style={{color:"#ff7f00"}}>Sign In</Text></Text>

        </View>
      </View>

 
    </SafeAreaView>
  );
}
