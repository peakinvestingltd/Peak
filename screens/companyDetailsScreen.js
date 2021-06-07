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
                <Title style={{textAlign:'center', fontFamily:'Futura', fontWeight:'900'}}>{this.props.route.params.stock}</Title>
                <View style={styles.chart}>
                <LineChart
                    data={{
                    labels: ["January", "February", "March", "April", "May", "June"],
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
                        }
                    ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={Dimensions.get('window').height/2}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                      backgroundGradientFromOpacity: 0,
                        backgroundGradientToOpacity: 0,
                        decimalPlaces: 0, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(23,24,32, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255,2555,255, ${opacity})`,
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "1",
                        strokeWidth: "1",
                        stroke: "whitesmoke"
                    }
                    }}
                    bezier
                    style={{
                    marginVertical: 8,
                    borderRadius: 16
                    }}
                />
                </View>
                 <View style={{flexDirection:'row', justifyContent:'space-around', margin:30}}>
                        <Card style={styles.card}>
                            <Text style={styles.text}>{this.props.route.params.stock}</Text>
                            <Text style={styles.text}>MEDIA</Text>
                            <Text style={styles.text}>Stock Price: $304</Text>
                        </Card>
                    </View>
                    <Slider
                        style={{width: Dimensions.get("window").width, height: 40}}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                    />
                    <View style={{ flexDirection:'row', justifyContent:'space-around'}}>
                        <Button icon="plus" style={styles.button} mode="contained">BUY</Button>
                        
                        <Button icon="minus" style={styles.button} mode="contained">SELL</Button>
                    </View>
                   
                </SafeAreaView>
         );

    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#BDCAE0",
  },
  text:{
      margin:10,
      textAlign:'justify',
      letterSpacing:2,
      fontFamily:'Futura'
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
  }
})
