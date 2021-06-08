import React, {Component} from 'react';
import {SafeAreaView, Dimensions, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import {Title, Button, Card} from 'react-native-paper';
import {LineChart} from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default class DetailsScreen extends React.Component {

  constructor(props) {
      super(props); 
  }


    render(){
        console.log(this.props)
         return (
                <SafeAreaView style={styles.container}>
                <Title style={{textAlign:'center', color:"#95ff95", fontFamily:'Futura', fontWeight:'900'}}>{this.props.route.params.stock}</Title>
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
                            Math.random() * 100
                            
                        ]
                        }
                    ]
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
                 <View style={{flexDirection:'row', justifyContent:'space-around', margin:10}}>
                    </View>
                        <Card style={{margin:10, backgroundColor:'teal'}}>
                            <View style={{flexDirection:'row', padding:20,  justifyContent:'space-between'}}>
                                <Text style={{color:'whitesmoke', fontFamily:'Futura'}}> Open: {this.props.route.params.price.open} </Text>
                                <Text style={{color:'whitesmoke', fontFamily:'Futura'}}> High: {this.props.route.params.price.high} </Text>
                                <Text style={{color:'whitesmoke', fontFamily:'Futura'}}> Low: {this.props.route.params.price.low} </Text>
                            </View>
                        </Card>
                    <Slider
                        style={{width: Dimensions.get("window").width, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        <Button icon="plus" style={styles.button} mode="outlined">BUY</Button>
                        
                        <Button icon="minus" style={styles.button} mode="outlined">SELL</Button>
                    </View>
                   
                </SafeAreaView>
         );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#001434",
  },
  text:{
      margin:10,
      fontSize:20,
      textAlign:'right',
      letterSpacing:2,
      fontFamily:'Futura',
      color:'#FFE5B4'
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
  }
})
