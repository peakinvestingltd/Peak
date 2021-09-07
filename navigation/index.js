import React from "react";
import { AuthUserProvider } from "./AuthUserProvider";
import Routes from "./Routes";
import header from "../components/header";
export default function Providers(props) {
  return (
    <AuthUserProvider>
      <Routes />
    </AuthUserProvider>
  );
}
