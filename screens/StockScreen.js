
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
              <Text style={styles.titleText}>${stock.price}</Text>
             </View>
             <Text style={styles.titleText}>{stock.name}</Text>
              <Text style={styles.titleText}>{stock.ticker}</Text>
            <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
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
                width={screenWidth/1.6} // from react-native
                height={100}
                // yAxisLabel="$"
                // yAxisSuffix="k"
                // yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    backgroundColor: "#666",
                    backgroundGradientFrom: "#651fff",
                    backgroundGradientTo: "#111",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(240, 240, 214, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255,2555,255, ${opacity})`,
                    propsForBackgroundLines:{
                       stroke:"transparent"
                    },
                    
                    propsForDots: {
                        r: "0.5",
                        strokeWidth: "2",
                        stroke: "#95ff95"
                    }
                }}
               
              
                style={{
                    marginVertical: 0,


                }}
            />
            <View style={{display:'flex', justifyContent:'space-around', flexDirection:'column'}}>
              <Text style={styles.titleText}>1H: 3.4 %</Text>
              <Text style={styles.titleText}>7D: 1.6 %</Text>
            </View>
            </View>
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
    backgroundColor: "whitesmoke",
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
    fontSize:20,
    marginTop:10,
    fontWeight:'900',
    textTransform:'uppercase'
  },
  marginAdd:{
      margin: 1,
  },
  titleText:{
    color: 'black',
    fontFamily:'Futura',
    letterSpacing:2,
    fontWeight:'900',
    textTransform:'uppercase',
    fontSize:15,
    margin:4,
  },
  card:{
    margin:10,
    padding:25,
    backgroundColor:'whitesmoke',
    shadowColor:'black', 
    shadowColor: "#111",
    shadowOffset: {width: 0,height: 10,},
    shadowOpacity: 0.5, 
    shadowRadius: 10, 
    elevation: 10, 
  },
  image:{
     
      borderRadius:30,
      resizeMode:'contain', 
      height:50, 
      width:50, 
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
