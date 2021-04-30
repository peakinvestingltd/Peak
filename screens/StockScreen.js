
import React, { useEffect, useState } from 'react';
import { DefaultTheme,  Card, Button, Paragraph, Searchbar, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView,Image, View, ScrollView, StyleSheet, Text, FlatList, Linking} from 'react-native';
import axios from 'axios';
// const finnhub = require('finnhub');

// const api_key = finnhub.ApiClient.instance.authentications['api_key'];
// api_key.apiKey = "sandbox_c0lsa3f48v6r1vcsdurg" // Replace this
// const finnhubClient = new finnhub.DefaultApi()

// getCurrentPrice("TSLA");

export class StockRoute extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
       
      } 
      console.log(this.state.data)
  }


  componentDidMount() {
 
  }
  
  render() {
    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={styles.container}>
 
            <Title style={styles.text}>Stocks</Title>  
              <Searchbar mode="contained" style={{margin:20}} inputStyle={{fontSize:14, fontFamily:'Futura', letterSpacing:2, margin:2}}/>  
              <ScrollView style={{marginTop:80}}>      
              
              </ScrollView>
            </SafeAreaView>
        </PaperProvider>
    ); 
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222948",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 150,
    backgroundColor:'#95ff95'
  },
  text:{
    textAlign:'center',
    color: 'whitesmoke',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  card:{
    padding:20,
    margin:5,
  }
});

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222948',
    accent: '#f1c40f',
  },
};
