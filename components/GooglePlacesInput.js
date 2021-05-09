import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCvM47_dqykeZekkdBTDyc1L7T0IbbAivM';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
    
      enablePoweredByContainer={false}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: 'en', // language of the results
      }}
      onPress={(data, details) => console.log(data, details)}
      textInputProps={{
        InputComp: Input,
        fontSize:14,
        fontFamily:'Futura',
        errorStyle: { color: 'red' },
      }}
    />
  );
};

export default GooglePlacesInput;