import React, { useEffect, useState } from 'react';
import { Avatar, DefaultTheme, IconButton, Colors, Title, Button, Card, Text, Provider as PaperProvider } from 'react-native-paper';
import {SafeAreaView, Image, ImageBackground, View, FlatList, StyleSheet, ScrollView, Linking, Dimensions} from 'react-native';
import {BarChart} from "react-native-chart-kit";
import {user} from '../components/Firebase/firebase';

import Background from '../assets/background.png';

const screenWidth = Dimensions.get("window").width;

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
};

let bgColor = "#151D3E";
let textColor = "whitesmoke"

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [20, 45, 28, 80, 79, 43, 20, 45, 28, 40, 49, 43, 20, 34, 28, 60, 99, 43, 50, 15, 28, 80, 99, 43,]
    }
  ]
};

export class HomeRoute extends React.Component{

  constructor(props) {
      super(props);
  }
  render(){ 
    return (
        <SafeAreaView style={styles.container}>

          <Card style={styles.topCard}>
            <View style={{ flexDirection:'row', justifyContent:'space-around', alignItems:'center',marginTop:15, }}>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <View style={{flexDirection:'row'}}>
              <IconButton icon="bell" color={Colors.orange500} size={20} />
              <IconButton icon="plus" color={Colors.orange500} size={20} />
              <IconButton icon="chat" color={Colors.orange500} size={20} />
              </View>
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', margin:10, alignItems:'center'}}>
                 <Text style={styles.titleText}>£856.93</Text>
                 <Button style={{outline:'none'}} mode="outlined">Watch Lists</Button>
            </View>
        </Card>
        
        <Title style={{fontSize:20, color:'whitesmoke', fontWeight:"bold", marginLeft:20, fontFamily:'Futura'}}>Portfolio</Title>
         

        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
           <Button mode="contained" style={{width:screenWidth/2-20, padding:10, borderRadius:10, backgroundColor:'#3751DA'}}>Invested</Button>
           <Button mode="contained" style={{width:screenWidth/2-20, padding:10, borderRadius:10, backgroundColor:'#50C156'}}>Returns</Button>
        </View>

        <Card style={{margin:10, backgroundColor:'#1E2556', padding:5, justifyContent:'center', alignItems:'center'}}>
          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Title style={styles.titleText}>Activity</Title>
            <Button mode="outlined" style={{color:"orange"}}>Year</Button>
          </View>
          <BarChart
            data={data}
            width={screenWidth * 0.9}
            height={180}
            yAxisLabel="$"
            chartConfig={{
              backgroundColor: "#1E2556",
              backgroundGradientFrom: "#1E2556",
              backgroundGradientTo: "#1E2556",
              fillShadowGradient: `#95ff95`,
              fillShadowGradientOpacity: 1,
              barPercentage:0.29,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(200, 200, 255, ${opacity})`,
              style: {
                borderRadius: 36,
                barRadius : 10,
                fontFamily:'Futura',
              },
              propsForLabels: {
                fontFamily: "Futura",
                fontWeight:"bold",
              },
            }}
            
            style={{ paddingRight: 0 }}
            spacingInner={0}
            verticalLabelRotation={0}
            showBarTops={false}
            withInnerLines={false}
            fromZero={true}
          />
        </Card>

        <Card>
          <View>

          </View>
        </Card>

        </SafeAreaView>  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:bgColor,
  },
  topCard: {
    zIndex:5,
    backgroundColor: "#1E2556",
    height:120,
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
  titleText: {
    color: "whitesmoke",
    fontFamily: "Futura",
    letterSpacing: 3,
    fontWeight: "900",
    textTransform: "uppercase",
    fontSize: 12,
    margin: 4,
  },
  balance:{
    position:"absolute",
    left:20,
    bottom:10,
    fontFamily:"Futura",
    fontSize:20,
    color:"gainsboro"
  },
  category:{
    position:"relative",
    top:0,
    right:0,
    bottom:0,
    backgroundColor:'transparent'
  },
});
