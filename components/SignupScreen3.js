import React, {useState} from 'react';
import {SafeAreaView, View, Button, Platform, Text, StyleSheet, ImageBackground} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

export default function Signup3 ({navigation}){
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  
  return (

    <ImageBackground source={require('../assets/background.jpg')} style={styles.image}>
        <SafeAreaView style={styles.container}> 

        <TextInput
            style={styles.input}
            mode="flat"
            label="Recovery Email Address"
            placeholder="Enter recovery email address"
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
            label="Security Question"
            placeholder="Enter recovery email address"
            placeholderTextColor='#ffffff'
            theme={{
            colors: 
            {
                placeholder: 'whitesmoke', text: 'white', primary: '#CB9274',
                underlineColor: 'transparent', background: '#003489'
            }
            }}
        />
         <DateTimePicker
                    style={{ width:"80%", backgroundColor:'whitesmoke'}}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
        <View style={{flex:1, marginBottom:400, width:"80%", marginTop:20}}>
            <DropDownPicker
                    dropDownStyle={{backgroundColor: '#fafafa'}}
                    style={{paddingVertical: 20, height:100,}}
                    itemStyle={{justifyContent: 'flex-start|flex-end|center'}}
                    items={[
                        {label: 'North America', value: 'na', untouchable: true}, // North America
                        {label: 'United States', value: 'us', parent: 'na'},
                        {label: 'Canada', value: 'canada', parent: 'na'},
                        {label: 'Mexico', value: 'mexico', parent: 'na'},

                        {label: 'Europe', value: 'eu', untouchable: true}, // Europe
                        {label: 'UK', value: 'uk', parent: 'eu'},
                        {label: 'Germany', value: 'germany', parent: 'eu'},
                        {label: 'Russia', value: 'russia', parent: 'eu'},
                    ]}
                    
                />
        </View>
        </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container:{
    marginTop:'50%',
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
    color:'#111',
    letterSpacing: 5,
    textAlign:'center',
    marginBottom:20,
    backgroundColor:'#FFFFFF',
  },
});