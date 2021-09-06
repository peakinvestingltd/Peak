import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RegisterScreen2 from "../screens/RegisterScreen2";
import RegisterScreen3 from "../screens/RegisterScreen3";
import RegisterScreen4 from "../screens/RegisterScreen4";
import RegisterScreen5 from "../screens/RegisterScreen5";
import LoginScreen from "../screens/LoginScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import DepositScreen from "../screens/DepositScreen";

const Stack = createStackNavigator();
console.log("in auth");
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Welcome" headerMode="none">
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Register2" component={RegisterScreen2} />
      <Stack.Screen name="Register3" component={RegisterScreen3} />
      <Stack.Screen name="Register4" component={RegisterScreen4} />
      <Stack.Screen name="Register5" component={RegisterScreen5} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
