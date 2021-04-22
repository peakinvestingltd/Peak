import * as React from 'react';
import {Button, SafeAreaView, View, Text, StyleSheet, Image, ImageBackground, Alert } from 'react-native';
import {TextInput, } from 'react-native-paper';
import { FacebookSocialButton, GoogleSocialButton, TwitterSocialButton } from "react-native-social-buttons";

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Login({navigation}) {
  return (
    
    <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
      <SafeAreaView style={styles.container}>
      
        <Image style={styles.logo} source={require('../assets/Logo1.png')} />

         <Text style={styles.h1}>
          Welcome back {"\n"} Login.
        </Text>

        <TextInput
            style={styles.input}
            mode="outlined"
            label="Username/Email"
            placeholder="Enter your email."
            placeholderTextColor='#ffffff'
            theme={{
            colors: 
            {
                placeholder: 'black', text: 'black', primary: 'black',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />
        <TextInput
            style={styles.input}
            mode="outlined"
            label="Password"
            labelColor='white'
            theme={{
            colors: 
            {
                placeholder: 'black', text: 'black', primary: 'black',
                underlineColor: 'red', background: '#003489'
            }
            }}
        />

        <Button 
          buttonStyle={styles.button}
          color={"#111111"}
          title="Login."  
          onPress={() => Alert.alert('Login Button pressed')}      
        />
          
       

        <Button
          title="Not a member yet? Sign up here."
          onPress={() => navigation.navigate('Signup')}
          color="black"
        />
    
      <View style={styles.socialButtonContainer}>
        <GoogleSocialButton buttonViewStyle={styles.socialButton}/>
        <FacebookSocialButton buttonViewStyle={styles.socialButton} />
        <TwitterSocialButton buttonViewStyle={styles.socialButton}/>
      </View>
         
      </SafeAreaView>
    </ImageBackground>
   
  );
}


const styles = StyleSheet.create({

  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',

  },
  input:{
    width: '80%',
    margin:20,
    backgroundColor: "#C0E6FC",
    color: '#ffffff',
    height: 40
  },
   button:{
   width:'80%',
   backgroundColor:'#006A9B'
  },
  text:{
    fontFamily:'Futura',
    color:'#666'
  },
  h1:{
    color:'#666',
    textAlign:'center',
    fontSize:30,
    fontFamily:'Futura'
  },
  image:{
    height:'100%',
    width:'100%',
  },
  logo:{
      height:100,
      width:100,
  },
  socialButtonContainer:{
      display:'flex',
      flexDirection:'row',
      margin:20,
  },
  socialButton:{
    borderRadius:10,
    borderWidth:0,
    width:'15%',
    color:'black',
  }
});