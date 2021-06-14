import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { styles } from "../css/styles.js";
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <View style={styles.container}>
       
      <View style={styles.logo}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>
      
      <View style={styles.buttonContainer}>
        <AppButton title="Login" onPress={() => navigation.navigate('Login')} />
        <AppButton
          style={styles.buttonText}
          title="Register"
          color="secondary"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
      <Text style={styles.footerText}>Peak ltd. ™ - 2021</Text>
    </View>
  );
}

