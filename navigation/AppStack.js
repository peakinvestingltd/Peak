import * as React from "react";
import { SafeAreaView, View, ScrollView, Image } from "react-native";
import Header from "../components/header";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import MenuScreen from "../screens/MenuScreen";
import DetailsScreen from "../screens/companyDetailsScreen";
import StockScreen from "../screens/StockScreen.js";
import StockScreen2 from "../screens/StockScreen2.js";
import BuyScreen from "../screens/buySell/BuyScreen.js";
import ReviewScreen from "../screens/buySell/ReviewScreen.js";
import ChatScreen from "../screens/ChatScreen.js";
import PortfolioScreen from "../screens/Portfolio.js";
//--------------------registration----------------------
import RegisterScreen from "../screens/RegisterScreen";
import RegisterScreen2 from "../screens/RegisterScreen2";
import RegisterScreen3 from "../screens/RegisterScreen3";
import RegisterScreen4 from "../screens/RegisterScreen4";
import RegisterScreen5 from "../screens/RegisterScreen5";

import NewsScreen from "../screens/NewsScreen";
//--menu--
import HistoryScreen from "../screens/menuScreens/HistoryScreen";
import NotificationSettingsScreen from "../screens/menuScreens/NotificationsSettingsScreen";
import ManageFundsScreen from "../screens/menuScreens/ManageFundsScreen";
import InviteFriendScreen from "../screens/menuScreens/InviteFriendScreen";
import PeakStoreScreen from "../screens/menuScreens/PeakStoreScreen";
import SettingPrivacyScreen from "../screens/menuScreens/SettingsPrivacyScreen";
import HelpCenterScreen from "../screens/menuScreens/HelpCenterScreen";
import SearchScreen from "../screens/searchScreen";
import OwnedStockScreen from "../screens/portfolio/Stock";
import ResetPassword from "../screens/menuScreens/setings/ResetPassword";
import HeaderDropDown from "../components/headerDropdown";
const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="Welcome" component={WelcomeScreen} /> */}
      <Stack.Screen name="Stock" component={StockScreen}></Stack.Screen>
      <Stack.Screen name="Header" component={HeaderDropDown}></Stack.Screen>
      <Stack.Screen name="Stock2" component={StockScreen2} />
      <Stack.Screen name="Home" component={MenuScreen} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      <Stack.Screen name="News" component={NewsScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="History" component={HistoryScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="OwnedStock" component={OwnedStockScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
      />
      <Stack.Screen name="ManageFunds" component={ManageFundsScreen} />
      <Stack.Screen name="InviteFriends" component={InviteFriendScreen} />
      <Stack.Screen name="PeakStore" component={PeakStoreScreen} />
      <Stack.Screen name="SettingPrivacy" component={SettingPrivacyScreen} />
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />

      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Register2" component={RegisterScreen2} />
      <Stack.Screen name="Register3" component={RegisterScreen3} />
      <Stack.Screen name="Register4" component={RegisterScreen4} />
      <Stack.Screen name="Register5" component={RegisterScreen5} />
    </Stack.Navigator>
  );
}
