import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';

import { styles } from "../css/styles.js";
import Colors from '../utils/colors';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import IconButton from '../components/IconButton';
import { loginWithEmail } from '../components/Firebase/firebase';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import useStatusBar from '../hooks/useStatusBar';
import { SocialIcon } from 'react-native-elements'

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter a registered email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password')
});

export default function LoginScreen({ navigation }) {
  useStatusBar('light-content');

  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [loginError, setLoginError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  async function handleOnLogin(values) {
    const { email, password } = values;

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      setLoginError(error.message);
    }
  }

  return (
      <SafeView style={styles.container}>
      
        <Form
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={values => handleOnLogin(values)}
        >
          <FormField
            style={{fontFamily:'Futura', width:'80%',}}
            name="email"
            leftIcon="email"
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
          />
          <FormField
            style={{fontFamily:'Futura', width:'80%',}}
            name="password"
            leftIcon="lock"
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            textContentType="password"
            rightIcon={rightIcon}
            handlePasswordVisibility={handlePasswordVisibility}
          />
          <FormButton title={'Login'} />
          {<FormErrorMessage error={loginError} visible={true} />}
        </Form>
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        <Text style={{textAlign:'center', position:'absolute', bottom:20, left:0, right:0, color:'whitesmoke', fontFamily:'Futura'}}>All rights reserved.</Text>
        <IconButton
          style={styles.backButton}
          iconName="keyboard-backspace"
          color="#fff"
          size={30}
          onPress={() => navigation.goBack()}
        />

        <Text style={{textAlign:'center', color:'whitesmoke', margin:20, fontFamily:'Futura'}}>Or Sign In With Socials</Text>
        
        <View style={{display:'flex', flexDirection:'row', justifyContent:'center',}}>
          <SocialIcon
            type='facebook'
            onPress={() => console.log('Facebook')}
          />

          <SocialIcon
            type='google'
          />

          <SocialIcon
            type='instagram'
          />
        </View>

        
       
      </SafeView>
      
  );
}

