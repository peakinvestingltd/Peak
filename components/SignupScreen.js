import * as React from "react";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { validationPage1 } from "./utils/signUpFunctions";

export const user = {
  name: null,
  surname: null,
  dob: null,
};

export default function Signup({ navigation }) {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [error, setError] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  function nextPage() {
    user.name = name;
    user.surname = surname;
    user.dob = date;
    navigation.navigate("Signup2");
  }

  function handleError(bool) {
    console.log("here");
    if (bool) {
      setError("Must be at least 18!");
    } else {
      setError("Please fill in all the fields.");
    }
  }

  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.image}
    >
      <View style={styles.shade}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>SIGN UP</Text>
          <Text style={styles.text}>TO CONTINUE</Text>
          <TextInput
            style={styles.input}
            mode="flat"
            label="Name"
            placeholder="Enter your first name."
            placeholderTextColor="#ffffff"
            onChangeText={(text) => setName(text)}
            theme={{
              colors: {
                placeholder: "whitesmoke",
                text: "white",
                primary: "#CB9274",
                underlineColor: "transparent",
                background: "#003489",
              },
            }}
          />
          <TextInput
            style={styles.input}
            mode="flat"
            label="surname"
            placeholder="Enter your surname."
            onChangeText={(text) => setSurname(text)}
            placeholderTextColor="#ffffff"
            theme={{
              colors: {
                placeholder: "whitesmoke",
                text: "white",
                primary: "#CB9274",
                underlineColor: "transparent",
                background: "#003489",
              },
            }}
          />
          <Text style={styles.dob}>Enter you date of birth</Text>
          <DateTimePicker
            style={{ width: "80%" }}
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            textColor="white"
            onChange={onChange}
          />
          <Text style={styles.error}>{error}</Text>
          <GradientButton
            style={{ marginVertical: 8 }}
            text="NEXT"
            textStyle={{ fontSize: 20 }}
            gradientBegin="#737495"
            gradientEnd="#8A84A2"
            gradientDirection="diagonal"
            height={40}
            width={300}
            radius={15}
            impact
            impactStyle="Light"
            onPressAction={() =>
              validationPage1(name, surname, date, nextPage, handleError)
            }
          />
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "80%",
    margin: 0,
    backgroundColor: "transparent",
    color: "#ffffff",
    height: 75,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  shade: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  button: {
    width: "80%",
    backgroundColor: "#59A6FE",
    marginTop: 50,
  },
  title: {
    color: "#CB9274",
    fontSize: 25,
    fontFamily: "Futura",
  },
  text: {
    fontFamily: "Futura",
    color: "#EFDAB9",
    marginBottom: 20,
    letterSpacing: 5,
  },
  error: {
    color: "red",
  },
  dob: {
    color: "white",
    fontSize: 18,
    fontFamily: "Futura",
    marginTop: 10,
    marginBottom: -7,
  },
});
