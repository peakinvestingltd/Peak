import React from 'react';
import { Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Input } from 'react-native-elements';

const GOOGLE_PLACES_API_KEY = 'AIzaSyCvM47_dqykeZekkdBTDyc1L7T0IbbAivM';

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
        enablePoweredByContainer={false}
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => console.log(data)}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />
  );
};

export default GooglePlacesInput;