import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import AppButton from '../components/AppButton';
import Colors from '../utils/colors';
import useStatusBar from '../hooks/useStatusBar';

export default function WelcomeScreen({ navigation }) {
  useStatusBar('light-content');

  return (
    <LinearGradient
          // Background Linear Gradient
          colors={['#222948', '#222948', '#676DDD']}
          style={styles.background}
      >
    <View style={styles.container}>
       
      <View style={styles.logoContainer}>
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
      <Text style={styles.text}>Peak ltd. ™ - 2021</Text>
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 100,
    height: 100,
    borderWidth:2,
    borderColor: 'ghostwhite',
    backgroundColor: '#222948',
    borderRadius:10,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  text:{
    fontFamily:'Futura',
    color:'whitesmoke',
    position:'absolute',
    bottom:40,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 60,
    width: '80%',
  },
  buttonText: {
    fontFamily:'Futura',
  }
});
