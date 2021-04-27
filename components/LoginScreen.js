import * as React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import GradientButton from "react-native-gradient-buttons";
import {
  FacebookSocialButton,
  GoogleSocialButton,
  TwitterSocialButton,
} from "react-native-social-buttons";

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Login({ navigation }) {
  return (
    <ImageBackground
      source={require("../assets/background.jpg")}
      style={styles.image}
    >
      <SafeAreaView style={styles.container}>
        <Image style={styles.logo} source={require("../assets/Logo.png")} />

        <Text style={styles.text}>Innovation Starts Here</Text>

        <Text style={styles.h1}>LOGIN</Text>

        <TextInput
          style={styles.input}
          mode="flat"
          label="Username/Email"
          placeholder="Enter your email."
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

        <TextInput
          style={styles.input}
          mode="flat"
          label="Password"
          labelColor="white"
          theme={{
            colors: {
              placeholder: "whitesmoke",
              text: "white",
              primary: "#CB9274",
              underlineColor: "red",
              background: "#003489",
            },
          }}
        />

        <GradientButton
          style={{ marginVertical: 8 }}
          text="LOGIN"
          textStyle={{ fontSize: 20 }}
          gradientBegin="#737495"
          gradientEnd="#8A84A2"
          gradientDirection="diagonal"
          height={40}
          width={300}
          radius={15}
          impact
          impactStyle="Light"
          onPressAction={() => alert("LOGIN")}
        />

        <Button
          style={styles.buttonTransparent}
          mode="contained"
          onPress={() => navigation.navigate("Signup")}
        >
          Not a member yet? Sign up.
        </Button>

        <Button
          style={styles.buttonTransparent}
          mode="contained"
          onPress={() => navigation.navigate("Home")}
        >
          Home
        </Button>

        <Text style={styles.OR}>----- OR -----</Text>

        <View style={styles.socialButtonContainer}>
          <GoogleSocialButton buttonViewStyle={styles.socialButton} />
          <FacebookSocialButton buttonViewStyle={styles.socialButton} />
          <TwitterSocialButton buttonViewStyle={styles.socialButton} />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    width: "80%",
    margin: 15,
    backgroundColor: "transparent",
    color: "#ffffff",
    height: 50,
  },
  button: {
    width: "80%",
    backgroundColor: "#59A6FE",
    margin: 5,
  },
  buttonTransparent: {
    width: "100%",
    margin: 10,
    backgroundColor: "transparent",
  },
  text: {
    fontFamily: "Futura",
    color: "#EFDAB9",
    marginBottom: 2,
    letterSpacing: 2,
  },
  text2: {
    fontFamily: "Futura",
    color: "#95ff95",
    marginBottom: 5,
    letterSpacing: 5,
  },
  h1: {
    color: "#CB9274",
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Futura",
    marginTop: 10,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  logo: {
    height: 100,
    width: 150,
    marginTop: 50,
    marginBottom: 5,
  },
  socialButtonContainer: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
  },
  socialButton: {
    borderRadius: 10,
    borderWidth: 0,
    width: "15%",
    color: "black",
  },
  OR: {
    fontSize: 30,
    color: "whitesmoke",
    fontFamily: "Futura",
  },
});
