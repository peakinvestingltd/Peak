
import React, { useEffect, useState } from 'react';
import { DefaultTheme, Chip, Card, Button, Paragraph, Searchbar, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView,Image, View, ScrollView, StyleSheet, Text, FlatList, Linking} from 'react-native';
import axios from 'axios';

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
        <Card style={{marginRight:15, marginLeft:15, marginBottom:10, padding:20, backgroundColor:'gainsboro', borderWidth:3, borderColor:'whitesmoke', shadowColor:'black', shadowColor: "#111",shadowOffset: {width: 0,height: 10,}, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10,}}> 
            <Title style={styles.titleText}>{stock.category}</Title>
            <Button mode="contained" style={{positon:'absolute', bottom:30, left:200, width:'30%'}}> Read </Button>
            <Text style={{fontFamily:"Futura", fontSize:18, fontWeight:'700', color:'#111'}}>{stock.headline}</Text>
            <Paragraph style={{marginTop:15, fontFamily:"Futura", border:2}}>{stock.summary}</Paragraph>
        </Card>
    );
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
    backgroundColor: "gainsboro",
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
    fontFamily:'Futura',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  titleText:{
    color: '#333',
    fontFamily:'Futura',
    letterSpacing:2,
    fontSize:14,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  card:{
    padding:20,
    backgroundColor:'gainsboro'
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
