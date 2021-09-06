import React from "react";
import { AuthUserProvider } from "./AuthUserProvider";
import Routes from "./Routes";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import header from "../components/header.js";
import navBar from "../components/navBar.js";
/**
 * Wrap all providers here
 */

export default function Providers(props) {
  return (
    <AuthUserProvider>
      {header()}
      <Routes />
    </AuthUserProvider>
  );
}
