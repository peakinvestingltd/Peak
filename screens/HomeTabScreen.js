import React, { useEffect, useState } from 'react';
import { DefaultTheme, IconButton, Colors, Title, Button, Card, Text, Provider as PaperProvider } from 'react-native-paper';
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
        <Card style={{margin:5, padding:10, width:300, backgroundColor:'white', borderWidth:2, borderColor:'gainsboro'}}> 
          <Title>{stock.source}</Title>
          <Text style={{textTransform:"capitalize"}}>{stock.category}</Text> 
          <Text style={styles.subtitle}>{stock.headline}</Text> 
          <Text>{stock.summary}</Text> 
          <Image source={{uri: stock.image}} />
          <Button mode="contained"  style={{backgroundColor:'#222948', position:"absolute", color:'teal', botttom:30, right:20,}} onPress={() => Linking.openURL(stock.url)}>
            Read
          </Button>
    
        </Card>
    );
     const ipoItems = this.state.IPO.map((ipo) =>
        <Card key={ipo.id} style={{margin:5, padding:20, width:300, backgroundColor:'white', borderWidth:1, borderColor:'gainsboro'}}> 
          <View sstyle={{display:'flex', flexDirection:"column"}}>
            <Title>{ipo.date}</Title>
            <Text>{ipo.name}</Text>
            <Text>{ipo.exchange}</Text>
          </View>
        </Card>
    );
  return (
        <SafeAreaView style={styles.container}>
          <Card >
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', backgroundColor:"teal"}}>
                <IconButton
                  style={{backgroundColor: 'gainsboro'}}
                  color={Colors.black}
                  size={30}
                  icon="menu"
                />
                <IconButton
                  style={{backgroundColor: 'gainsboro'}}
                  color={Colors.black}
                  size={30}
                  icon="tune-vertical"
                />
            </View>
            </Card>
            <Card style={{marginTop:20, marginRight:10, marginLeft:10}}>
                <Card.Cover style={styles.card} source={require('../assets/basicCard.png')} />
            </Card>

            <Card style={{diplay:'flex', backgroundColor:'gainsboro', flexDirection:'row', justifyContent:'space-around', margin:10, borderRadius:20, shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.6,
              shadowRadius: 3.84,

              elevation: 5,}}>
              <Title style={styles.text}>Total BALANCE</Title>
              <Title style={styles.text}> $300 </Title>
              <View style={{diplay:'flex', flexDirection:'row', justifyContent:'space-between', borderRadius:20, shadowColor:'black', shadowColor: "#111",shadowOffset: {width: 0,height: 10,}, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10, backgroundColor:'#111'}}>
                <IconButton
                  style={{backgroundColor: 'gainsboro'}}
                  size={25}
                  color={Colors.teal600}
                  icon="wallet"
                />
                <IconButton
                  style={{backgroundColor: 'gainsboro'}}
                  size={25}
                  color={Colors.teal600}
                  icon="credit-card-plus-outline"
                  onPress={() => 
                  this.props.navigation.navigate('Deposit')}
                />
                <IconButton
                  style={{backgroundColor: 'gainsboro'}}
                  size={25}
                  color={Colors.teal600}
                  icon="gift"
                />
              </View>
            </Card>
            <ScrollView>
            <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', margin:10}}>
              <Title style={styles.subtext}>Portfolios</Title>
              <IconButton 
                icon="more"
                color={Colors.red500}
              />
            </View>

            <Card style={{margin:30, borderRadius:30,}}> 
                  <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', margin:10}}>         
                        <IconButton color={Colors.white}  icon="finance" style={{position:'absolute', left:0, backgroundColor:'#222'}} />
                        <Text style={styles.text}>Stocks</Text>  
                  </View>
                  <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', margin:10}}>         
                        <IconButton color={Colors.white}  icon="chart-pie" style={{position:'absolute', left:0, backgroundColor:'#222'}} />
                        <Text style={styles.text}>ETFs</Text>  
                  </View>
                  <View style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', margin:10}}>         
                        <IconButton color={Colors.white}  icon="home-analytics" style={{position:'absolute', left:0, backgroundColor:'#222'}} />
                        <Text style={styles.text}>ISA</Text>  
                  </View>
            </Card>
            <Title style={styles.subtext}>News</Title>
             <ScrollView horizontal={true}>
             
              {listItems}
              
           </ScrollView>
           <Title style={styles.subtext}>Upcoming IPO's</Title>
           <ScrollView horizontal={true}>
             {ipoItems}
            </ScrollView>
          </ScrollView>
        </SafeAreaView>  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    padding:5,
    shadowColor:'whitesmoke',
    borderBottomWidth:10,
    borderColor:'#04D370'
  },
  card: {
     resizeMode:"cover",
  },
  text:{
    color: '#111',
    margin:10,
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  subtext:{
    textAlign:'justify',
    color: 'black',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase',
    marginLeft: 20,
  },
  subtitle:{
    fontSize:18,
    margin:10,
    fontWeight:"bold",
    fontFamily:'Futura',
    color:'#222948',
  },
  cardChart:{
     margin:10,
     borderRadius:50,
  },   
  portfolioCard:{
    
    borderColor:'whitesmoke',
    width:'100%',
    padding:30,
  }
});
