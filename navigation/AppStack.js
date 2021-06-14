import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/companyDetailsScreen';
import StockScreen from '../screens/StockScreen.js';
import BuyScreen from '../screens/buySell/BuyScreen.js'
import ReviewScreen from '../screens/buySell/ReviewScreen.js'
import ChatScreen from '../screens/ChatScreen.js'

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Buy" component={BuyScreen} />
      <Stack.Screen name="Review" component={ReviewScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}
