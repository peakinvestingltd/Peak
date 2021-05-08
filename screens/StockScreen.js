
import React, { useEffect, useState } from 'react';
import { 
DefaultTheme,  
Card, Button, Avatar, Paragraph, Searchbar, 
FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView, Dimensions, Image, View, ScrollView, StyleSheet, Text, FlatList, Linking} from 'react-native';

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import axios from 'axios';

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 86400;

let from = yesterday.toString();
let to = timestamp.toString();

export class StockRoute extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        data: [],
        dataCandle:[],
        stocks:[],
        candles:[],
        stockList:['AAPL', 'TSLA', 'GOOGL', 'FB', 'BP', 
        "TWTR", "AMZN", "BAC", "BA", "AXS", "ADCT", "ATR", 
        "ALV", "ALK", "AU", "ASPN", "AAT"]
      } 
  }

  

    getChartData(stock, from, to, interval) {
      let candleData = {};
      fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=${interval}&from=${from}&to=${to}&token=c29d3o2ad3ib4ac2prkg`
      )
        .then((response) => response.json())
        .then((chartData) => {
          this.setState({dataCandle: chartData })
          candleData[stock] = this.state.dataCandle;
          if (candleData.length ==  this.state.stockList.length){
            this.setState({candles: candleData })
          }
        });
    }

    callChartData(){
      for (let i = 0; i < this.state.stockList.length; i++) {
        this.getChartData(this.state.stockList[i], from, to, "30");
      }
    }
  

  getData(){
    let stockData = [];
    for (let i = 0; i < this.state.stockList.length; i++){
        fetch(`https://finnhub.io/api/v1/stock/profile?symbol=${this.state.stockList[i]}&token=c29d3o2ad3ib4ac2prkg`) // hide api key from
            .then((response) => response.json())
            .then(stocksList => {
                this.setState({ data: stocksList });
                let stockInfo = {
                    name: this.state.data.name,
                    currency: this.state.data.currency,
                    ticker: this.state.data.ticker,
                    price: this.state.data.shareOutstanding,
                    logo: `https://storage.googleapis.com/iex/api/logos/${this.state.data.ticker}.png`,
                    exchange: this.state.data.exchange, 
                }
                stockData.push(stockInfo);
                
                if (this.state.stockList.length == stockData.length){
                   this.setState({ stocks: stockData });
                }

            });
    }
  }

  componentDidMount() {
      this.getData();
      // this.callChartData();
  }

  
  render() {
    console.log(this.state.candles)
    const listItems = this.state.stocks.map((stock) =>
        <Card style={styles.card}>
    
            <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
              <Image style={styles.image} source = {{uri:`https://storage.googleapis.com/iex/api/logos/${stock.ticker}.png`}}/> 
              <Title style={styles.titleText}>{stock.name}</Title>
              <Paragraph style={styles.titleText}>{stock.ticker}</Paragraph>
              <Text style={styles.titleText}>${stock.price}</Text>
            </View>
            
            <LineChart
                withHorizontalLabels={false}
                data={{
                // labels: ["January", "February", "March", "April", "May", "June"],
                datasets: [
                    {
                    data: [
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                        Math.random() * 100,
                    ]
                    }
                ]
                }}
                width={screenWidth-20} // from react-native
                height={40}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                // yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#666",
                    backgroundGradientFrom: "#651fff",
                    backgroundGradientTo: "#222948",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 10) => `rgba(255,2555,255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255,2555,255, ${opacity})`,
                    propsForBackgroundLines:{
                       stroke:"transparent"
                    },
                    
                    propsForDots: {
                        r: "0.5",
                        strokeWidth: "0",
                        stroke: "#95ff95"
                    }
                }}
               
              
                style={{
                    marginVertical: 0,
                    borderRadius: 16,
                    paddingRight:30,

                }}
            />
        </Card>
    );
    return (
        <PaperProvider theme={theme}>
            <SafeAreaView style={styles.container}>
              <Searchbar mode="contained" style={{margin:10}} inputStyle={{fontSize:14, fontFamily:'Futura', letterSpacing:2, margin:2}}/>  
              <ScrollView style={{marginTop:10}}>      
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
    backgroundColor: "#123",
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
  marginAdd:{
      margin: 1,
  },
  titleText:{
    color: 'teal',
    fontFamily:'Futura',
    letterSpacing:2,
    fontSize:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  card:{
    margin:5,
    padding:5,
    backgroundColor:'whitesmoke'
  },
  image:{
     
      borderRadius:30,
      resizeMode:'contain', 
      height:30, 
      width:30, 
      marginBottom:8,
      marginTop:8,
      
  },
  
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
