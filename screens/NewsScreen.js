
import React, { useEffect, useState } from 'react';
import { DefaultTheme, Chip, Card, Button, Paragraph, Searchbar, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView,Image, View, ScrollView, StyleSheet, Text, FlatList, Linking} from 'react-native';
import axios from 'axios';
import Spinner from '../components/Spinner';

export class NewsRoute extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        data: []
      } 
  }

  getData(){
    fetch('https://finnhub.io/api/v1/news?category=general&token=c29d3o2ad3ib4ac2prkg')
            .then((response) => response.json())
            .then(stocksList => {
                this.setState({ data: stocksList });
            });
  }

  componentDidMount() {
      this.getData();
  }

  
  
  render() {
    const listItems = this.state.data.map((stock) =>
        <Card style={{marginRight:15, marginLeft:15, marginBottom:10, padding:20, backgroundColor:'#1E2556', shadowColor:'black', shadowColor: "gainsboro",shadowOffset: {width: 0,height: 1,}, shadowOpacity: 0.5, shadowRadius: 2, elevation: 10,}}> 
            <Title style={styles.titleText}>{stock.category}</Title>
            <Button onPress={()=> {Linking.openURL(stock.url)}} mode="contained" style={{positon:'absolute', bottom:30, left:200, width:'30%'}}> Read </Button>
            <Text style={{fontFamily:"Futura", fontSize:18, fontWeight:'700', color:'gainsboro'}}>{stock.headline}</Text>
            <Paragraph style={{marginTop:15, fontFamily:"Futura", border:2, color:'whitesmoke'}}>{stock.summary}</Paragraph>
        </Card>
    );

    if (this.state.data.length == 0) {
      return <Spinner />;
    }

    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={styles.container}>
              <Searchbar mode="contained" style={{margin:10, backgroundColor:'gainsboro'}} inputStyle={{fontSize:14, fontFamily:'Futura', letterSpacing:2, margin:2, }}/>  
              <ScrollView horizontal={true} styles={{display:'flex', flexDirection:'column'}}>
                <Chip style={styles.chip}>
                  <Text style={styles.chip}>All</Text>
                </Chip>
                <Chip style={styles.chip}>
                 <Text style={styles.chip}>News</Text>
                </Chip>
                <Chip style={styles.chip}>
                 <Text style={styles.chip}>Learn</Text>
                </Chip>
              </ScrollView>
              <ScrollView style={{marginTop:20}}>      
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
    backgroundColor: "#151D3E",
  },
  fab: {
    position: 'absolute',
    margin: 16,
    left: 0,
    top: 150,
    backgroundColor:'#001434'
  },
  text:{
    textAlign:'center',
    color: 'whitesmoke',
    fontFamily:'Futura',
    color:'white',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  titleText:{
    color: 'white',
    fontFamily:'Futura',
    letterSpacing:2,
    fontSize:14,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  card:{
    padding:20,
    backgroundColor:'#001434'
  },
  chip:{
    padding:5,
    margin:5,
    fontFamily:'Futura'
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
