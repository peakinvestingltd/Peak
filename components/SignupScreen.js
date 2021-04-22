import * as React from 'react';
import {SafeAreaView, View, Text, ImageBackground, StyleSheet } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
export default function Signup({navigation}) {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Let's get you setup.</Text>
        <TextInput
            style={styles.input}
            label="Username"
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
            label="Email"
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
            label="Password"
            labelColor='white'
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
            label="Confirm Password"
            labelColor='white'
            theme={{
            colors: 
            {
                placeholder: 'black', text: 'black', primary: 'black',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />

        <Button mode="contained" style={styles.button}>
          Signup
        </Button>


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
  },
  image:{
    height:'100%',
    width:'100%'
  },
  button:{
   width:'80%',
   backgroundColor:'#006A9B'
  },
  title:{
    color:'#666',
    fontSize:30,
    fontFamily:'Futura',
  }
});
