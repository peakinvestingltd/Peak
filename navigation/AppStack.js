import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/companyDetailsScreen";
import StockScreen from "../screens/StockScreen.js";
import BuyScreen from "../screens/buySell/BuyScreen.js";
import ReviewScreen from "../screens/buySell/ReviewScreen.js";
import ChatScreen from "../screens/ChatScreen.js";
import RegisterScreen2 from "../screens/RegisterScreen2";
import RegisterScreen3 from "../screens/RegisterScreen3";
import RegisterScreen4 from "../screens/RegisterScreen4";
import RegisterScreen5 from "../screens/RegisterScreen5";

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Stock" component={StockScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      
      <Stack.Screen name="Register2" component={RegisterScreen2} />
      <Stack.Screen name="Register3" component={RegisterScreen3} />
      <Stack.Screen name="Register4" component={RegisterScreen4} />
      <Stack.Screen name="Register5" component={RegisterScreen5} />
    </Stack.Navigator>
  );
}
