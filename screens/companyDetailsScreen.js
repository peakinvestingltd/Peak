import React, {Component} from 'react';
import {Button, SafeAreaView, Text, View, StyleSheet, TouchableOpacity} from 'react-native';

export default class DetailsScreen extends React.Component {

  constructor(props) {
      super(props); 
  }



    render(){
         return (
                <SafeAreaView>
                    <Text>Details</Text>
                    <Button title="go" icon="chevron-right-circle" onPress={() =>
                            this.props.navigation.navigate('Home')}></Button>
                </SafeAreaView>
         );

    }
}
