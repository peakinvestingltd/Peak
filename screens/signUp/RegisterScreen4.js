import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { IconButton, Colors, Button } from "react-native-paper";
import { views, texts, images, inputs, buttons } from "../../css/styles.js";
import Logo from "../../assets/Peak-App-Logo.svg";
import DropDownPicker from "react-native-dropdown-picker";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

let todayDate = Date.now();
//-------------firebase-------------
import * as firebase from "firebase";
import "firebase/database";
const db = firebase.firestore();
//-------------firebase-------------

const screenWidth = Dimensions.get("window").width;
export default function RegisterScreen3(props) {
  const [date, setDate] = useState(todayDate);
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Prefer not to say", value: "n/a" },
  ]);
  const [nationalityStyle, setNationalityStyle] = useState(texts.noWarning);
  const [genderStyle, setGenderStyle] = useState(texts.noWarning);
  const [ageStyle, setAgeStyle] = useState(texts.noWarning);
  const [datePlaceHolder, setDatePlaceHolder] = useState(
    "Select your date of birth"
  );
  function validateAge() {
    let todayDate = Date.now();
    let minAge = moment(todayDate).subtract(18, "years");
    let minAgeMil = new Date(minAge);

    let dob = new Date(date);
    if (dob.getTime() <= minAgeMil) {
      return true;
    } else {
      setAgeStyle(texts.warning);
      return false;
    }
  }
  function nextButtonPressed() {
    let age = validateAge();
    if (nationality && value && age) {
      firebase.auth().onAuthStateChanged((user) => {
        db.collection("users")
          .doc(user.uid)
          .collection("userInfo")
          .doc("signUp")
          .update({
            dob: datePlaceHolder,
            gender: value,
            nationality: nationality,
            signUp: 5,
          });
      });
      props.navigation.navigate("Register5");
    } else {
      if (!value) {
        setGenderStyle(texts.warning);
      }
      if (!nationality) {
        setNationalityStyle(texts.warning);
      }
    }
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    let dob = moment(currentDate).format("YYYY-MM-DD");
    let c = new Date(dob);
    console.log(dob);

    console.log(currentDate);
    setDatePlaceHolder(dob);
  };
  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

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
          <View style={views.loadBar4Compleated}></View>
        </View>
        <View style={views.card}>
          <View style={views.innerMargin}>
            <Text style={texts.white20}>
              Sign Up | <Text style={texts.white15}>Step 4 of 5</Text>
            </Text>
          </View>

          <Button
            style={{
              width: screenWidth - 60,
              height: 35,
              backgroundColor: "lightgray",
              marginTop: 8,
              marginBottom: 0,
              marginLeft: 20,
              marginRight: 20,
              padding: 0,
              color: "white",
              borderRadius: 10,
              flexDirection: "row",
              alignSelf: "center",
            }}
            onPress={showDatepicker}
            title="Show time picker!"
          >
            <Text
              style={{
                color: "black",
                textTransform: "none",
                alignSelf: "center",
                height: 40,
                width: screenWidth - 80,
              }}
            >
              {datePlaceHolder}
            </Text>
          </Button>
          <Text style={ageStyle}>* You must be at least 18 year old</Text>
          {show && (
            <DateTimePicker
              textColor="white"
              testID="dateTimePicker"
              value={new Date(date)}
              mode={mode}
              is24Hour={true}
              display="spinner"
              onChange={onChange}
            />
          )}

          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setValue={setValue}
            setItems={setItems}
            setOpen={setOpen}
            style={inputs.input}
            placeholder={"Select Your Gender"}
          />
          <Text style={genderStyle}>* Please select your gender</Text>

          <TextInput
            style={inputs.input}
            placeholder="Nationality"
            onChangeText={(val) => setNationality(val)}
          ></TextInput>
          <Text style={nationalityStyle}>
            * Please fill in your nationality
          </Text>
          <View style={{ height: 10 }} />

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
              marginBottom: 10,
            }}
          >
            <Button
              onPress={() => {
                props.navigation.navigate("Stock");
              }}
            >
              <Text
                style={{
                  color: "#ff7f00",
                  marginTop: 5,
                  textTransform: "none",
                }}
              >
                Skip
              </Text>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
