import React, { useState } from 'react';
import { StyleSheet, View} from 'react-native';
import { IconButton, Colors } from 'react-native-paper';
import * as Yup from 'yup';

import { LinearGradient } from 'expo-linear-gradient';
import SafeView from '../components/SafeView';
import Form from '../components/Forms/Form';
import FormField from '../components/Forms/FormField';
import FormButton from '../components/Forms/FormButton';
import FormErrorMessage from '../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../components/Firebase/firebase';
import useStatusBar from '../hooks/useStatusBar';
import DateTimePicker from '@react-native-community/datetimepicker';
import {launchCamera, launchImageLibrary, ImagePicker} from 'react-native-image-picker';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .label('Name'),
  email: Yup.string()
    .required('Please enter a valid email')
    .email()
    .label('Email'),
  password: Yup.string()
    .required()
    .min(6, 'Password must have at least 6 characters')
    .label('Password'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Confirm Password must match Password')
    .required('Confirm Password is required')
});

export default function RegisterScreen({ navigation }) {
  useStatusBar('light-content');
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eye');
  const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
    true
  );
  const [registerError, setRegisterError] = useState('');

  function handlePasswordVisibility() {
    if (rightIcon === 'eye') {
      setRightIcon('eye-off');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye-off') {
      setRightIcon('eye');
      setPasswordVisibility(!passwordVisibility);
    }
  }

  function selectFile() {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    
    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  };

  function handleConfirmPasswordVisibility() {
    if (confirmPasswordIcon === 'eye') {
      setConfirmPasswordIcon('eye-off');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    } else if (confirmPasswordIcon === 'eye-off') {
      setConfirmPasswordIcon('eye');
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  }

  async function handleOnSignUp(values, actions) {
    const { email, password } = values;
    try {
      await registerWithEmail(email, password);
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <LinearGradient
          // Background Linear Gradient
          colors={['#BDCAE0', '#BDCAE0', 'teal']}
          style={styles.background}
      >
    <SafeView style={styles.container}>
      <Form
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleOnSignUp(values)}
      >
        <FormField
          style={{fontFamily:'Futura', width:'80%',}}
          name="name"
          leftIcon="account"
          placeholder="Enter name"
          autoFocus={true}
        />
        <FormField
          style={{fontFamily:'Futura', width:'80%',}}
          name="email"
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
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
        <FormField
          style={{fontFamily:'Futura', width:'80%',}}
          name="confirmPassword"
          leftIcon="lock"
          placeholder="Confirm password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={confirmPasswordVisibility}
          textContentType="password"
          rightIcon={confirmPasswordIcon}
          handlePasswordVisibility={handleConfirmPasswordVisibility}
        />
        
        {/* <IconButton
            icon="camera"
            color={Colors.pink500}
        /> */}
       
        

        {/* <View>
          <DateTimePicker
            style={{padding:0, margin:0}}
            textColor="whitesmoke"
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        </View> */}
        <FormButton title={'Register'} />
        {<FormErrorMessage error={registerError} visible={true} />}
      </Form>
      
      <IconButton
        style={styles.backButton}
        icon="keyboard-backspace"
        color={Colors.white}
        size={30}
        onPress={() => navigation.goBack()}
      />
    </SafeView>
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
