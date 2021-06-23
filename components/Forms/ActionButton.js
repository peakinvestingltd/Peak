import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFormikContext } from "formik";

export default function ActionButton({
  title,
  buttonStyles = null,
  textStyles = null,
  ...props
}) {
  const { handleSubmit } = useFormikContext();

  return (
    <TouchableOpacity
      style={[styles.button, buttonStyles]}
      onPress={handleSubmit}
      {...props}
    >
      <Text style={[styles.buttonText, textStyles]}> {title} </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
