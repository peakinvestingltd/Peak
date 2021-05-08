import React, { useEffect, useState } from 'react';
import { DefaultTheme, Title, Button, Card, Text, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView, Image, ImageBackground, View, FlatList, StyleSheet, ScrollView, Linking} from 'react-native';
import Background from '../assets/background.png';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

export class HomeRoute extends React.Component{

  constructor(props) {
      super(props);
      this.state = {
        data: [],
        IPO: [],
      } 

  }

  
  getData(){
    fetch('https://finnhub.io/api/v1/news?category=general&token=bt2nu2748v6sj2tj2ij0')
            .then((response) => response.json())
            .then(stocksList => {
                this.setState({ data: stocksList });
            });
  }

  getIPOData(){
    fetch('https://finnhub.io/api/v1/calendar/ipo?from=2020-01-01&to=2020-04-30&token=bt2nu2748v6sj2tj2ij0')
            .then((response) => response.json())
            .then(ipoList => {
                this.setState({ IPO: ipoList.ipoCalendar });
            });
  }
  componentDidMount() {
    this.getData();
    this.getIPOData();
  }
  render(){
    
    const listItems = this.state.data.map((stock) =>
        <Card style={{margin:5, padding:20, width:300, backgroundColor:'gainsboro', borderWidth:1, borderColor:'whitesmoke'}}> 
          <Title>{stock.source}</Title>
          <Text style={{textTransform:"capitalize"}}>{stock.category}</Text> 
          <Text style={styles.subtitle}>{stock.headline}</Text> 
          <Text>{stock.summary}</Text> 
          <Image source={{uri: stock.image}} />
          <Button mode="contained"  style={{backgroundColor:'#222948', position:"absolute", color:'whitsmoke', botttom:30, right:20,}} onPress={() => Linking.openURL(stock.url)}>
            Read
          </Button>
    
        </Card>
    );
     const ipoItems = this.state.IPO.map((ipo) =>
        <Card key={ipo.id} style={{margin:5, padding:20, width:300, backgroundColor:'gainsboro', borderWidth:1, borderColor:'whitesmoke'}}> 
          <Title>{ipo.date}</Title>
          <Text>{ipo.name}</Text>
          <Text>{ipo.exchange}</Text>
          <Text style={styles.subtitle}>${ipo.price}</Text>
          <Text style={styles.subtitle}>${ipo.totalSharesValue}</Text>
        </Card>
    );
  return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.image} source={require('../assets/background.png')}>
            <Card style={{margin:1}}>
                <Card.Cover style={styles.card} source={require('../assets/basicCard.png')} />
            </Card>
            <Title style={styles.text}>Total BALANCE</Title>
            <Text style={styles.text, styles.xl}> $300 </Text>
            <ScrollView >
              <Card style={styles.cardChart}>
                <Title style={styles.subtext}>Portfolios</Title>
                <View style={{flex:1, display:'flex', flexDirection:"column"}}>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>Stocks</Text>
                      
                  </Card>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>ETF's</Text>
                      
                  </Card>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>ISA</Text>
                      
                  </Card>  
                </View>
            </Card>
             <Title style={styles.text}>News</Title>
             <ScrollView horizontal={true}>
             
              {listItems}
              
           </ScrollView>
           <Title style={styles.text}>Upcoming IPO's</Title>
           <ScrollView horizontal={true}>
             {ipoItems}
            </ScrollView>
           </ScrollView>
          
           </ImageBackground> 
        </SafeAreaView>  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#04D370"
  },
  xl:{
    fontSize:45,
    fontWeight:'bold',
    fontFamily:'Futura',
    color:'ghostwhite',
  },
  image: {
    flex: 1,
    padding:5,
    shadowColor:'whitesmoke',
    borderBottomWidth:10,
    borderColor:'#04D370',
  
  },
  card: {
     resizeMode:"cover",
  },
  text:{
    color: 'ghostwhite',
    margin:10,
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  subtext:{
    textAlign:'left',
    color: 'white',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  subtitle:{
    fontSize:18,
    margin:10,
    fontWeight:"bold",
    fontFamily:'Futura',
    color:'#222948',
  },
  cardChart:{
      backgroundColor:'#212940',
      padding:10,
      borderColor:'#212948',
      borderWidth:1,
      margin:10,
      marginTop:50,

  },
  portfolioCard:{
    backgroundColor:'#45666F',
    width:'100%',
    height:60,
    padding:10,
    margin:2,
  }
});
