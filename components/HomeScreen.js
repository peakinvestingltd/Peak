import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import {Card, Title, Paragraph} from 'react-native-paper'

export default Home = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.polygon.io/v2/reference/tickers?sort=ticker&market=STOCKS&perpage=50&page=1&apiKey=3g7pzSJLIdyzg2UUHtZqeHtfeEnpMjqX')
      .then((response) => response.json())
      .then((json) => setData(json.data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}          
          keyExtractor={({ tickers }, index) => tickers}
          renderItem={({ item }) => (
              <Card style={styles.card}>
                <Card.Content>
                    <Title>{item.ticker}</Title>              
                </Card.Content>               
             </Card>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({

  container:{
      backgroundColor:'whitesmoke'
  },
  card:{
      margin:2,
      backgroundColor: 'white',
      color: 'white',
      borderWidth:2,
      borderColor: 'whitesmoke',

  },
  text:{
      display:'flex',
      color: '#111',
      fontSize:14,
      fontFamily:'Futura',
      padding:10,
      justifyContent:'space-between'
  },
  open:{
      color: '#111',
      fontSize:20,
      textAlign:'left',
      fontFamily:'Futura'
  },
  close:{
      color: '#111',
      fontSize:20,
      textAlign:'right',
      fontFamily:'Futura'
  },
  closeOpen:{
      display:'flex',
      flexDirection:'row',
      justifyContent: 'space-between'
  },
  stockImage:{
      width: 40,
      height: 40,
  }

});