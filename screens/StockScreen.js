
import React, { useEffect, useState } from 'react';
import { withNavigation } from 'react-navigation';
import { DefaultTheme, Card, Button, Avatar, Paragraph, Searchbar, IconButton, FAB, Title, Provider as PaperProvider } from 'react-native-paper';
import {LineChart} from "react-native-chart-kit";
import {SafeAreaView, Dimensions, Image, View, ScrollView, TouchableOpacity, StyleSheet, Text, FlatList, Linking} from 'react-native';

import axios from 'axios';
import { object } from 'yup';

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 86400;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export class StockRoute extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        loadingPrice:true,
        loadingData: true, 
        loadingCandle:true,
        loaded:[],
        datePrice:[],
        dataCandle:[],
        data: [],
        stocks:[],
        candles:[],
        price:[],
        stockList:['AAPL', 'TSLA', 'GOOGL', 'FB', 'BP', 
        "TWTR", "AMZN", "BAC", "BA", "AXS", "ADCT", "ATR", 
        "ALV", "ALK", "AU", "ASPN", "AAT"]
      } 
  }

  getCurrentPrice(){
      let priceData = {}
      let loadedStock = []
      for (let i = 0; i < this.state.stockList.length; i++){

        const stock = this.state.stockList[i]
        fetch(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${apiKey}`)
        .then((response) => response.json())
        .then(priceList => {
          this.setState({dataPrice: priceList})
          let priceChange = this.state.dataPrice.pc - this.state.dataPrice.c
          let percentage = (100 / this.state.dataPrice.pc) * priceChange
          priceData[stock] = {
            currentPrice: this.state.dataPrice.c,
            open: this.state.dataPrice.o,
            low: this.state.dataPrice.l,
            high: this.state.dataPrice.h,
            previousClose: this.state.dataPrice.pc,
            priceChange: priceChange,
            percentage: percentage
          }
          loadedStock.push(stock)
        })
        .then(() => {
          if (this.state.stockList.length == Object.keys(priceData).length  && this.state.loadingCandle == false && this.state.loadingData == false){
            this.setState({ 
              price: priceData,
              loaded: loadedStock
             });
          }else if(this.state.stockList.length == Object.keys(priceData).length){
            console.log('*')
            console.log(this.state.stockList.length)
          console.log(Object.keys(priceData).length)
          console.log(this.state.loadingCandle)
          console.log(this.state.loadingData)
            this.setState({ 
              price: priceData,
              loadingPrice: false
             });
          }
        })
      }
    }


    callChartData(){
      let stockCandle = {};
      let loadedStock = []
      for (let i = 0; i < this.state.stockList.length; i++) {
        const stock = this.state.stockList[i]
        fetch(
          `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=30&from=${from}&to=${to}&token=${apiKey}`
        )
          .then((response) => response.json())
          .then((chartData) => {
            this.setState({dataCandle: chartData})
            stockCandle[stock] = {
              open: this.state.dataCandle.o,
              high: this.state.dataCandle.h,
              low: this.state.dataCandle.l,
              close: this.state.dataCandle.c,
              volume: this.state.dataCandle.v,
              timestamp: this.state.dataCandle.t,
              status: this.state.dataCandle.s
            } 
            loadedStock.push(stock)
          }).then(() => {  
              if(Object.keys(stockCandle).length == this.state.stockList.length && this.state.loadingData == false && this.state.loadingPrice == false ){
              
                this.setState({
                  candles: stockCandle,
                  loaded: loadedStock
                  })
              }else if(Object.keys(stockCandle).length == this.state.stockList.length){
                console.log('*')
                      console.log(this.state.stockList.length)
              console.log(Object.keys(stockCandle).length)
              console.log(this.state.loadingCandle)
              console.log(this.state.loadingPrice)
                this.setState({
                  candles: stockCandle,
                  loadingData: false
                  })
              } 
          })
      }
      
    }
  

  getData(){
    let stockData = {};
    let loadedStock = [];
    for (let i = 0; i < this.state.stockList.length; i++){
      const stock = this.state.stockList[i]
        fetch(`https://finnhub.io/api/v1/stock/profile?symbol=${stock}&token=c29d3o2ad3ib4ac2prkg`) // hide api key from
            .then((response) => response.json())
            .then(stocksList => {
                this.setState({ data: stocksList });
                stockData[stock] = {
                    name: this.state.data.name,
                    currency: this.state.data.currency,
                    ticker: this.state.data.ticker,
                    price: this.state.data.shareOutstanding,
                    logo: `https://storage.googleapis.com/iex/api/logos/${this.state.data.ticker}.png`,
                    exchange: this.state.data.exchange, 
                    industry: this.state.data.finnhubIndustry,
                }
                loadedStock.push(stock)
            }).then(() => {

           

                if (this.state.stockList.length == Object.keys(stockData).length  && this.state.loadingCandle == false && this.state.loadingPrice == false){
                  this.setState({ 
                    stocks: stockData,
                    loaded: loadedStock
                   });
                }else if(this.state.stockList.length == Object.keys(stockData).length){
                  console.log('*')
                  console.log(this.state.stockList.length)
                  console.log(Object.keys(stockData).length)
                  console.log(this.state.loadingCandle)
                  console.log(this.state.loadingPrice)
                  this.setState({ 
                    stocks: stockData,
                    loadingData: false
                   });
                }

            });
    }
  }

  componentDidMount() {
      this.getData();
      this.callChartData();
      this.getCurrentPrice();
  }

  
  render() {
      const candles = this.state.candles
      const stockData = this.state.stocks
      const loaded = this.state.loaded
      const priceData = this.state.price
      

      const listItems = loaded.map((stock) =>
        <Card style={styles.card}>
            <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
            <Image style={styles.image} source = {{uri:`https://storage.googleapis.com/iex/api/logos/${stockData[stock].ticker}.png`}}/> 
              <Text style={styles.titleText}>${priceData[stock].currentPrice.toFixed(2)}</Text>
             </View>
             <Text style={styles.titleText}>{priceData[stock].priceChange.toFixed(2)} ({priceData[stock].percentage.toFixed(2)}%)</Text>
             <Text style={styles.titleText}>{stockData[stock].name}</Text>
              <Text style={styles.titleText}>{stockData[stock].ticker}</Text>
            <View style={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
              
            <LineChart
                bezier
                hideLegend={true}
                segments={1}
                withHorizontalLabels={false}
                data={{
                datasets: [
                    {
                     data: candles[stock].open
                    }
                ]
                }}
                width={screenWidth-60} // from react-native
                height={80}
                chartConfig={{
                    backgroundColor: "#666",
                    backgroundGradientFrom: "#111",
                    backgroundGradientTo: "teal",
                    decimalPlaces: 0, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(240, 240, 214, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255,2555,255, ${opacity})`,
                    propsForBackgroundLines:{
                       stroke:"transparent"
                    },
                    propsForDots: {
                      r: "1",
                      strokeWidth: "1",
                      stroke: "#ffa726"
                    }
                }}
          
                style={{
                    borderRadius:10,
                    paddingRight:10
                }}
            />
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
    backgroundColor: "gainsboro",
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
    padding:30,
    backgroundColor:'gainsboro',
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
