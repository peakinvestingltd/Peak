import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Constants from "expo-constants";

export default function SafeViewCentered({ children, style }) {
  return (
    <SafeAreaView style={[styles.safeAreaContainer, style]}>
      <ScrollView style={[styles.container, style]}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
});
