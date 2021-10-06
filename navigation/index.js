import React from "react";
import { AuthUserProvider } from "./AuthUserProvider";
import Routes from "./Routes";
import header from "../components/header";
import { StatusBar } from "react-native";

export default function Providers(props) {
  return (
    <AuthUserProvider>
      <StatusBar backgroundColor="#26325F" />
      <Routes />
    </AuthUserProvider>
  );
}
