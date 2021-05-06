
import React, { useEffect, useState } from 'react';
import { DefaultTheme,  Card, Button, Paragraph, Searchbar, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView,Image, View, ScrollView, StyleSheet, Text, FlatList, Linking} from 'react-native';
import axios from 'axios';

export class StockRoute extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        data: []
      } 
  }

  getData(){
    fetch('https://finnhub.io/api/v1/news?category=general&token=bt2nu2748v6sj2tj2ij0')
            .then((response) => response.json())
            .then(stocksList => {
                this.setState({ data: stocksList });
                console.log(this.state.data)
            });
  }

  componentDidMount() {
      this.getData();
  }

  
  
  render() {
    const listItems = this.state.data.map((stock) =>
        <Card style={{margin:5, padding:20, backgroundColor:'gainsboro', borderWidth:1, borderColor:'whitesmoke'}}> 
            <Title style={{textTransform:'capitalize'}}>{stock.category}</Title>
            <Text>{stock.headline}</Text>
            <Paragraph style={{padding:10,}}>{stock.summary}</Paragraph>

        </Card>
    );
    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={styles.container}>
 
            <Title style={styles.text}>Stocks</Title>  
              <Searchbar mode="contained" style={{margin:20}} inputStyle={{fontSize:14, fontFamily:'Futura', letterSpacing:2, margin:2}}/>  
              <ScrollView style={{marginTop:80}}>      
                {listItems}
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
