import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import {Searchbar} from 'react-native-paper';
import * as Yup from 'yup';

import Colors from '../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import GooglePlacesInput from '../components/GooglePlacesInput';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';



const validationSchema = Yup.object().shape({
  line1: Yup.string()
    .required()
    .label('line1'),
 
});

export default function RegisterScreen2({ navigation }) {
  useStatusBar('light-content');
  return (
    <LinearGradient
          // Background Linear Gradient
          colors={['#072039', '#676DDD']}
          style={styles.background}
      >
  
      <Form
        initialValues={{
          line1: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
      >

      <SafeAreaView style={{height:'100%'}}>
          <GooglePlacesInput 
          fetchDetails={true}
          />            
      </SafeAreaView>
        

      </Form>
      
     

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
   background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth:1,
    width:'25%',
    marginLeft:'37.5%',
    borderColor:'white',
    padding:10,
    borderRadius:500,
    color:'whitesmoke',
  }
});
