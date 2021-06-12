import React, { useEffect, useState } from "react";
import {
  Avatar,
  DefaultTheme,
  IconButton,
  Colors,
  Title,
  Button,
  Card,
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  SafeAreaView,
  Image,
  ImageBackground,
  View,
  FlatList,
  StyleSheet,
  ScrollView,
  Linking,
  Dimensions,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { user } from "../components/Firebase/firebase";

import { styles } from '../css/styles.js'

const screenWidth = Dimensions.get("window").width;

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3498db",
    accent: "#f1c40f",
  },
};

let bgColor = "#151D3E";
let textColor = "whitesmoke";

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      data: [
        20, 45, 28, 80, 79, 43, 20, 45, 28, 40, 49, 43, 20, 34, 28, 60, 99, 43,
        50, 15, 28, 80, 99, 43,
      ],
    },
  ],
};

export class HomeRoute extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <Card style={styles.topCard}>     
              <View style={{ flexDirection: "row", justifyContent:'space-between', alignItems:'center'}}>
                <IconButton icon="chat-outline" color={Colors.orange500} size={30} />
                <View>
                  <Title style={styles.titleText}>Portfolio balance</Title>
                  <Button mode="contained" style={{backgroundColor:Colors.orange500, borderRadius:20,}}>
                    
                  </Button>
                  
                </View>
                <IconButton icon="bell-outline" color={Colors.orange500} size={30} />
              </View>
             
          </Card>

        <Title
          style={{
            fontSize: 20,
            color: "whitesmoke",
            fontWeight: "bold",
            marginLeft: 20,
            fontFamily: "Futura",
          }}
        >
          Portfolio
        </Title>

        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <Button
            mode="contained"
            raised={true}
            style={{
              width: screenWidth / 2 - 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#3751DA",
            }}
          >
            <Text style={styles.titleText}>  Invested {'\n'} 900 </Text>
          </Button>
          <Button
            compact={true}
            mode="contained"
            style={{
              width: screenWidth / 2 - 20,
              padding: 10,
              borderRadius: 10,
              backgroundColor: "#50C156",
            }}
          >
           <Text style={styles.titleText}> Returns {'\n'} 900 </Text>
          </Button>
        </View>

        <Card
          style={{
            margin: 10,
            backgroundColor: "#1E2556",
            padding: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Title style={styles.titleText}>Activity</Title>
            <Button mode="outlined" style={{ color: "orange" }}>
              Year
            </Button>
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
              barPercentage: 0.29,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(200, 200, 255, ${opacity})`,
              style: {
                borderRadius: 36,
                barRadius: 10,
                fontFamily: "Futura",
              },
              propsForLabels: {
                fontFamily: "Futura",
                fontWeight: "bold",
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

        <Card style={{backgroundColor:"#3751DA", margin:10}}>
          <View style={{flexDirection: "row", justifyContent:'space-around', alignItems:'center'}}>
            <Image
            style={{width:50, height:50, margin:10, borderRadius:25, borderWidth:1, backgroundColor:'white'}}
            source={{
              uri: 'https://lh3.googleusercontent.com/proxy/9YQnuA08eGT-0h1C45gRSt142bW_aC02W-8s88bdCsuIe7JowqVvNTIYE9tMhYPOnDsr9G7vcUpwuSzJ5A_VLOsW-wsmeX4NEZxLcvHKUQBFqxOp3vPHSg',
            }}/>
            <Text style={styles.cardText}>Shares {'\n'} <Text style={styles.titleText}> 2</Text> </Text>
            <Text style={styles.cardText}>Invested {'\n'} <Text style={styles.titleText}> 900 </Text></Text>
            <Text style={styles.cardText}>Returns {'\n'} <Text style={styles.titleText}> 1100</Text></Text>
          </View>
        </Card>
         <Card style={{backgroundColor:"#3751DA", margin:10}}>
          <View style={{flexDirection: "row", justifyContent:'space-around', alignItems:'center'}}>
            <Image
            style={{width:50, height:50, margin:10, borderRadius:25, borderWidth:1, backgroundColor:'white'}}
            source={{
              uri: 'data:image/png;base64,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',
            }}/>
            <Text style={styles.cardText}>Shares {'\n'} <Text style={styles.titleText}> 2</Text> </Text>
            <Text style={styles.cardText}>Invested {'\n'} <Text style={styles.titleText}> 900</Text></Text>
            <Text style={styles.cardText}>Returns {'\n'} <Text style={styles.titleText}> 1100</Text></Text>
          </View>
        </Card>
      </SafeAreaView>
    );
  }
}


