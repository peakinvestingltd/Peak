// In App.js in a new project

import * as React from 'react';
import {Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LoginScreen from './components/LoginScreen'
import SignUpScreen from './components/SignupScreen'
import SignUpScreen2 from './components/SignupScreen2'
import SignUpScreen3 from './components/SignupScreen3'
import HomeScreen from './components/HomeScreen'

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Peak Investing" component={LoginScreen}
          options={{
            title: '',
            headerStyle: {
              backgroundColor: '#2E3552',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}     
        />
        <Stack.Screen 
        options={{
            title: '',
            headerStyle: {
              backgroundColor: '#2E3552',
            },
            headerLeft: () => {
              return null;
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}  
        name="Signup" component={SignUpScreen} />

       <Stack.Screen 
        options={{
            title: '',
            headerStyle: {
              backgroundColor: '#2E3552',
            },
            headerLeft: () => {
              return null;
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}  
        name="Signup2" component={SignUpScreen2} />

        <Stack.Screen 
        options={{
            title: '',
            headerStyle: {
              backgroundColor: '#2E3552',
            },
            headerLeft: () => {
              return null;
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
          }}  
        name="Signup3" component={SignUpScreen3} />

      <Stack.Screen 
        options={{
            title: '',
            headerStyle: {
              backgroundColor: 'whitesmoke',
            },
             headerLeft: () => {
              return null;
            },
            headerTintColor: '#111',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            
            
          }}  
        name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

