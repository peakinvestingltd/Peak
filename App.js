// In App.js in a new project

import * as React from 'react';
import {Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './components/LoginScreen'
import SignUpScreen from './components/SignupScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Peak Investing" component={LoginScreen}
          options={{
            title: 'Peak Investing',
            headerStyle: {
              backgroundColor: '#C0E6FC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}     
        />
        <Stack.Screen 
        options={{
            title: 'Create An Account',
            headerStyle: {
              backgroundColor: '#C0E6FC',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}  
        name="Signup" component={SignUpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

