import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/companyDetailsScreen';
import StockScreen from '../screens/StockScreen.js';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Stocks" component={StockScreen} /> */}
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
