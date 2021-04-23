import * as React from 'react';
import {SafeAreaView, View, Text, ImageBackground, StyleSheet } from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import GradientButton from 'react-native-gradient-buttons';
export default function Signup({navigation}) {
  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
         <Text style={styles.text}>
           TO CONTINUE
        </Text>
        <TextInput
            style={styles.input}
            mode="flat"
            label="Username"
            placeholder="Enter your email."
            placeholderTextColor='#ffffff'
            theme={{
            colors: 
            {
                placeholder: 'whitesmoke', text: 'white', primary: '#CB9274',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />
        <TextInput
            style={styles.input}
            mode="flat"
            label="Email"
            placeholder="Enter your email."
            placeholderTextColor='#ffffff'
            theme={{
            colors: 
            {
                placeholder: 'whitesmoke', text: 'white', primary: '#CB9274',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />
        <TextInput
            style={styles.input}
            mode="flat"
            label="Password"
            labelColor='white'
            theme={{
            colors: 
            {
                placeholder: 'whitesmoke', text: 'white', primary: '#CB9274',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />
        <TextInput
            style={styles.input}
            mode="flat"
            label="Confirm Password"
            labelColor='white'
            theme={{
            colors: 
            {
                placeholder: 'whitesmoke', text: 'white', primary: '#CB9274',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />

        <GradientButton
          style={{ marginVertical: 8 }}
          text="SIGN UP"
          textStyle={{ fontSize: 20 }}
          gradientBegin="#737495"
          gradientEnd="#8A84A2"
          gradientDirection="diagonal"
          height={40}
          width={300}
          radius={15}
          impact
          impactStyle='Light'
          onPressAction={() => alert('LOGIN')}
        />


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
    margin:10,
    backgroundColor: 'transparent',
    color: '#ffffff',
    height:40,
  },
  image:{
    height:'100%',
    width:'100%',
  },
  button:{
   width:'80%',
   backgroundColor:'#59A6FE',
   marginTop: 50,
  },
  title:{
    color:'#CB9274',
    fontSize:25,
    fontFamily:'Futura',
  },
  text:{
    fontFamily:'Futura',
    color:'#EFDAB9',
    marginBottom:20,
    letterSpacing: 5,
  },
});
