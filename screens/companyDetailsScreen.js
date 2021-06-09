import React, {Component} from 'react';
import {SafeAreaView, Dimensions, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Title, Button, Card, IconButton, Colors} from 'react-native-paper';
import {LineChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export default class DetailsScreen extends React.Component {

  constructor(props) {
      super(props); 
      this.state ={
          candles: {},
      }
  }

callChartData() {
    const stock = this.props.route.params.stock;
    let stockCandle = {};
    let loadedStock = [];
    console.log(stock)
      fetch(
        `https://finnhub.io/api/v1/stock/candle?symbol=${stock}&resolution=60&from=${from}&to=${to}&token=${apiKey}`
      )
        .then((response) => response.json())
        .then((chartData) => {
          stockCandle = {
            open: chartData.o,
            high: chartData.h,
            low: chartData.l,
            close: chartData.c,
            volume: chartData.v,
            timestamp: chartData.t,
            status: chartData.s,
          };
          this.setState({
            candles: stockCandle
          })
        })
        .catch((err) => {
          console.log(err);
        });
        
  }
    componentDidMount() {

    this.callChartData();

  }

    render(){
        const candles = this.state.candles;
        console.log(candles)
        console.log(this.props)
        
         return (
                <SafeAreaView style={styles.container}>
                <Title style={{textAlign:'center', color:"#95ff95", fontFamily:'Futura', fontWeight:'900'}}>{this.props.route.params.stock}</Title>
                <Card style={styles.topCard}>
                    <View style={{ flexDirection:'row', justifyContent:'space-around', alignItems:'center',marginTop:15 }}>
                        <Title style={styles.titleText}>Portfolio balance</Title>
                        <View style={{flexDirection:'row'}}>
                        <IconButton icon="bell" color={Colors.orange500} size={20} />
                        <IconButton icon="plus" color={Colors.orange500} size={20} />
                        <IconButton icon="chat" color={Colors.orange500} size={20} />
                        </View>
                    </View>
                    <View style={styles.headerBottom}>
                        <Text style={styles.balance}>£856.93</Text>
                        <Button mode="contained" style={styles.catagory}>Compare</Button>
                    </View>
                </Card>
                <Card style={{backgroundColor:'#1E2556'}}>
                <View style={styles.chart}>
                <View style={{flexDirection:'row', justifyContent:"space-between"}}>
                    <Text style={styles.text}>{this.props.route.params.price.percentage.toFixed(2)}%</Text>
                    <Text style={styles.text}>{this.props.route.params.price.currentPrice}</Text>
                </View>
                
                <LineChart
                    withInnerLines={false}
                    withOuterLines={false}
                    withHorizontalLabels={false}
                    withVerticalLabels={false}
                    data={{
                        datasets: [
                            {
                                data: [
        
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            },
                        ],
                    }}
                    width={screenWidth} // from react-native
                    height={Dimensions.get('window').height/4}
                    yAxisInterval={0} // optional, defaults to 1
                    chartConfig={{
                        backgroundGradientFromOpacity: 0.1,
                        backgroundGradientToOpacity: 1,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 0.4) => `rgba(23,24,32, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255,2555,255, ${opacity})`,
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(100, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "1",
                        strokeWidth: "1",
                        stroke: this.props.route.params.price.stockColor
                    }
                    }}
                    bezier
                    style={{
                        paddingRight: -40,
                        margin: 5,
                        borderRadius: 20,
                        marginRight: 0,
                        bottom: 1,
                    }}
                />
                </View>
              
                <View style={{flexDirection:'row', justifyContent:'space-around'}}>
                    <Text style={styles.chartInterval}>1D</Text>
                    <Text style={styles.chartInterval}>7D</Text>
                    <Text style={styles.chartInterval}>1M</Text>
                    <Text style={styles.chartInterval}>3M</Text>
                    <Text style={styles.chartInterval}>MAX</Text>
                </View>
                </Card>
                
                       
                   
                    <View style={{ flexDirection:'row', justifyContent:'space-around', marginTop:30}}>
                        <Button icon="plus" style={{backgroundColor:'teal', justifyContent:'center'}} mode="contained">BUY</Button>
                        <Button icon="minus" style={{backgroundColor:'crimson'}} mode="contained">SELL</Button>
                    </View>
                   
                </SafeAreaView>
         );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#151D3E",
  },
  text:{
      margin:10,
      fontSize:20,
      textAlign:'right',
      letterSpacing:2,
      fontFamily:'Futura',
      color:'#FFE5B4'
  },
  chartInterval:{
      color:'white',
      fontSize: 15,
      fontFamily:'Futura',
      padding:5,

  },
  chart:{
      marginTop:40,
  },
  card:{
      flex: 1,
      backgroundColor:'gainsboro',
      flexDirection:'column',
  },
  button:{
      padding:10,
      backgroundColor:'gainsboro',
  },
  topCard: {
    zIndex:5,
    backgroundColor: "#1E2556",
    height:90,
    borderBottomRightRadius:25,
    borderBottomLeftRadius:25,
    padding: 0,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
    marginBottom:20
  },
  headerBottom: {
     height:35
  },
  catagory:{
    position:"absolute",
     right:20,
      bottom:10,
      fontFamily:"Futura",
    fontSize:20,
    backgroundColor:'transparent'
  },
  balance:{
    position:"absolute",
    left:20,
     bottom:10,
     fontFamily:"Futura",
   fontSize:20,
   color:"gainsboro"
  },
  titleText: {
    color: "whitesmoke",
    fontFamily: "Futura",
    letterSpacing: 3,
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 12,
    margin: 4,
  },
})
