import React, { useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import Colors from "../utils/colors";
import SafeView from "../components/SafeView";
import Form from "../components/Forms/Form";
import FormField from "../components/Forms/FormField";
import FormButton from "../components/Forms/FormButton";
import IconButton from "../components/IconButton";
import { passwordReset } from "../components/Firebase/firebase";
import FormErrorMessage from "../components/Forms/FormErrorMessage";
import useStatusBar from "../hooks/useStatusBar";
import { View } from "react-native";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .label("Email")
    .email("Enter a valid email")
    .required("Please enter a registered email"),
});

export default function ForgotPasswordScreen({ navigation }) {
  useStatusBar("light-content");

  const [customError, setCustomError] = useState("");

  async function handlePasswordReset(values) {
    const { email } = values;

    try {
      await passwordReset(email);
      navigation.navigate("Login");
    } catch (error) {
      setCustomError(error.message);
    }
  }

  return (
    <SafeView style={styles.container}>
      <Form
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => handlePasswordReset(values)}
      >
        <FormField
          style={{ fontFamily: "Futura" }}
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
        />
        <FormButton title="Forgot Password" />
        {<FormErrorMessage error={customError} visible={true} />}
      </Form>
      <IconButton
        style={styles.backButton}
        iconName="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    width: "25%",
    marginLeft: "37.5%",
    borderColor: "white",
    padding: 10,
    borderRadius: 500,
    color: "whitesmoke",
  },
});
