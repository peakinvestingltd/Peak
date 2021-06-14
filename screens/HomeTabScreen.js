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

import { styles } from "../css/styles.js";

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
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <IconButton
            onPress={() =>
                  this.props.route.next.navigation.navigate("Chat")
                }
              icon="chat-outline"
              color={Colors.orange500}
              size={30}
            />
            <View>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <Button
                mode="contained"
                style={{ backgroundColor: Colors.orange500, borderRadius: 20 }}
              ></Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>

        <View style={{margin:10}}>
          <Title style={styles.titleText}>Portfolio</Title>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
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
              <Text style={styles.titleText}> Invested {"\n"} 900 </Text>
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
              <Text style={styles.titleText}> Returns {"\n"} 900 </Text>
            </Button>
          </View>

          <Card
            style={{
              margin: 10,
              backgroundColor: "transparent",
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
                backgroundColor: "transparent",
                backgroundGradientFrom: "transparent",
                backgroundGradientTo: "transparent",
                fillShadowGradient: `#fff`,
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
        </View>
        <ScrollView>
          <Card style={styles.newsCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  margin: 10,
                  borderRadius: 25,
                  borderWidth: 1,
                  backgroundColor: "white",
                }}
                source={{
                  uri: "data:image/png;base64,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",
                }}
              />
              <Text style={styles.text}>
                Shares {"\n"} <Text style={styles.centeredText}> 2</Text>{" "}
              </Text>
              <Text style={styles.text}>
                Invested {"\n"} <Text style={styles.centeredText}> 900</Text>
              </Text>
              <Text style={styles.text}>
                Returns {"\n"} <Text style={styles.centeredText}> 1100</Text>
              </Text>
            </View>
          </Card>
          <Card style={styles.newsCard}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 50,
                  height: 50,
                  margin: 10,
                  borderRadius: 25,
                  borderWidth: 1,
                  backgroundColor: "white",
                }}
                source={{
                  uri: "data:image/png;base64,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",
                }}
              />
              <Text style={styles.text}>
                Shares {"\n"} <Text style={styles.centeredText}> 2</Text>{" "}
              </Text>
              <Text style={styles.text}>
                Invested {"\n"} <Text style={styles.centeredText}> 900</Text>
              </Text>
              <Text style={styles.text}>
                Returns {"\n"} <Text style={styles.centeredText}> 1100</Text>
              </Text>
            </View>
          </Card>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
