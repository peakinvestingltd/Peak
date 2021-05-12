import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/companyDetailsScreen';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
