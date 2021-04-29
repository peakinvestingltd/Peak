
import React, { useEffect, useState } from 'react';
import { DefaultTheme, Card, Button, Paragraph, Searchbar, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView, View, ScrollView, StyleSheet, Text, FlatList} from 'react-native';
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
        data: []
      } 
  }

  getData(){
    // fetch('https://finnhub.io/api/v1/quote?symbol=AAPL,T&token=c0lsa3f48v6r1vcsdur0')
    //         .then((response) => response.json())
    //         .then(stocksList => {
    //             this.setState({ stocks: stocksList });
              
    //         });

    const options = {
      method: 'GET',
      url: 'https://finnhub-realtime-stock-price.p.rapidapi.com/stock/symbol/?rapidapi-key=526f6bb878msh75578594898d51bp1adc7fjsn31e679e857d3',
      params: {exchange: 'US'},
      headers: {
        'x-rapidapi-key': '526f6bb878msh75578594898d51bp1adc7fjsn31e679e857d3',
        'x-rapidapi-host': 'finnhub-realtime-stock-price.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }
 

  componentDidMount() {
    this.getData();
  }
  
  render() {
    
    

    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={styles.container}>
 
            <Title style={styles.text}>Stocks</Title>  
              <Searchbar/>
              <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={() => console.log('Pressed')}
              />
                <>
                  <View>
                      {this.state.data.map(d => (<View key={d.id}><Text>{d.name}</Text></View>))} 
                  </View>
                </>
        
              <ScrollView style={{marginTop:80}}>      
                <Card style={{margin:10}}>
                  <Card.Title title="TSLA"/>
                  <Card.Actions style={{width:'100%', justifyContent:'space-between'}}>
                  <Card.Cover style={{width:50, height:50, backgroundColor:'transparent', margin:5,}} source={{ uri: 'https://cdn3.iconfinder.com/data/icons/popular-services-brands-vol-2/512/tesla-512.png' }} />
                    <Button mode="contained" onPress={() => console.log('BUY')} >BUY</Button>
                    <Button mode="outlined">SELL</Button>
                  </Card.Actions>
                </Card>
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
