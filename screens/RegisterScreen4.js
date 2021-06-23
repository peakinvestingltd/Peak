import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, TextInput, Text } from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import Logo from "../assets/Peak-App-Logo.svg";

//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

export default function RegisterScreen3(props) {
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");

  const [genderStyle, setGenderStyle] = useState(styles.noWarning);
  const [nationalityStyle, setNationalityStyle] = useState(styles.noWarning);

  function nextButtonPressed() {
    if (nationality) {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .update({
            gender: gender,
            nationality: nationality,
            signUp: 5,
          });
      });
      props.navigation.navigate("Register5");
    }else{
      if(!gender){
        setGenderStyle(styles.warning)
      }
      if(!nationality){
        setNationalityStyle(styles.warning)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Logo/>
      </View>
      <View style={styles.loadBar}>
        <View style={styles.loadBar4Compleated}></View>
      </View>
      <View style={styles.signupCard}>
        <Text style={styles.head1}>
          Sign Up <Text style={styles.head2}>| Step 3 of 4</Text>
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Gender"
          onChangeText={(val) => setGender(val)}
        ></TextInput>
        <Text style={genderStyle}>please fill in your gender</Text>

        <TextInput
          style={styles.input}
          placeholder="Nationality"
          onChangeText={(val) => setNationality(val)}
        ></TextInput>
        <Text style={nationalityStyle}>please fill in your nationality</Text>

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
