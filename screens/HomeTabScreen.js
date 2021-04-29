import React, { useEffect, useState } from 'react';
import { DefaultTheme, Title, Card, Text, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView, ImageBackground, View, FlatList, StyleSheet, ScrollView} from 'react-native';
import Background from '/Users/mahirahmed/PeakApp/assets/background.png';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

const image = { uri: "https://reactjs.org/logo-og.png" };

export const HomeRoute = () => {
return (
        <SafeAreaView style={styles.container}>
            <ImageBackground style={styles.image} source={require('/Users/mahirahmed/PeakApp/assets/background.png')}>
            <Card style={{margin:5,}}>
                <Card.Cover source={{ uri: 'https://cdn.dribbble.com/users/6519429/screenshots/14789659/media/d2b859fb65d963a8d563624b463955ce.png?compress=1&resize=400x300' }} />
            </Card>
            <Title style={styles.text}>Total BALANCE</Title>
            <Text style={styles.text, styles.xl}> $300 </Text>
            <ScrollView>
              <Card style={styles.cardChart}>
                <Title style={styles.subtext}>Portfolios</Title>
                <View style={{flex:1, display:'flex', flexDirection:"row"}}>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>Stocks</Text>
                      
                  </Card>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>Crypto</Text>
                      
                  </Card>
                  
                </View>
                <View style={{flex:1, display:'flex', flexDirection:"row"}}>
                  <Card style={styles.portfolioCard} >
                      <Text style={styles.text}>ISA</Text>
                      
                  </Card>  
                </View>
            </Card>
           </ScrollView>
           </ImageBackground> 
        </SafeAreaView>  
         

   
  );
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
    resizeMode: "stretch",

  },
  text:{
    color: 'ghostwhite',
    margin:5,
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
  cardChart:{
      backgroundColor:'#212948',
      padding:10,
      borderColor:'#212948',
      borderWidth:1,
      margin:10,
      marginTop:50,

  },
  portfolioCard:{
    backgroundColor:'#45666F',
    width:'50%',
    height:60,
    margin:2,
  }
});