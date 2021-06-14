import React, { Component } from "react";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Title, Button, Card, IconButton, Colors } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Separator } from "native-base";
import { AccordionList } from "accordion-collapse-react-native";
import { styles } from "../css/styles.js";

const screenWidth = Dimensions.get("window").width;

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;

let from = yesterday.toString();
let to = timestamp.toString();

const apiKey = "c29d3o2ad3ib4ac2prkg";

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candles: {},
      list: [
        {
          id: 1,
          title: "Your Investments",
          body: "React native Accordion/Collapse component, very good to use in toggles & show/hide content",
        },
        {
          id: 2,
          title: "Company info",
          body: this.props.route.params.desc,
        },
        {
          id: 3,
          title: "Company news",
          body: this.props.route.params.desc,
        },
        {
          id: 4,
          title: "History",
          body: this.props.route.params.desc,
        },
      ],
    };
  }

  _head(item) {
    return (
      <Separator
        style={{
          alignItems: "justify",
          backgroundColor: "transparent",
          fontFamily: "Futura",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Avenir",
              marginLeft: 20,
              color: "whitesmoke",
            }}
          >
            {item.title}
          </Text>
          <IconButton
            style={{ position: "absolute", left: screenWidth - 100 }}
            icon="chevron-right"
            color={Colors.white}
            size={20}
          />
        </View>
      </Separator>
    );
  }

  _body(item) {
    return (
      <View style={{ padding: 10 }}>
        <Text
          style={{ color: "whitesmoke", fontSize: 12, fontFamily: "Futura" }}
        >
          {item.body}
        </Text>
      </View>
    );
  }

  callChartData() {
    const stock = this.props.route.params.stock;
    let stockCandle = {};
    let loadedStock = [];
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
          candles: stockCandle,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  componentDidMount() {
    this.callChartData();
  }

  render() {
    const candles = this.state.candles;
    const params = this.props.route.params;
    console.log(params);
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
              onPress={() => this.props.navigation.navigate("Chat")}
              icon="chat-outline"
              color={Colors.orange500}
              size={30}
            />
            <View>
              <Title style={styles.titleText}>Portfolio balance</Title>
              <Button
                mode="contained"
                style={{ backgroundColor: Colors.orange500, borderRadius: 20 }}
              >
                £{this.props.route.params.funds}
              </Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>

        <View>
          <View>
            <Image
              style={styles.detailsImage}
              source={{ uri: this.props.route.params.logo }}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontSize: 12,
                color: "whitesmoke",
                fontFamily: "Futura",
                fontWeight: "bold",
                letterSpacing: 2,
                margin: 5,
              }}
            >
              {this.props.route.params.price.percentage.toFixed(2)}%
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: "whitesmoke",
                fontFamily: "Futura",
                fontWeight: "bold",
              }}
            >
              ${this.props.route.params.price.currentPrice} {"\n"}
            </Text>
          </View>

          <LineChart
            withInnerLines={false}
            withOuterLines={false}
            withHorizontalLabels={false}
            withVerticalLabels={false}
            data={{
              datasets: [
                {
                  data: params.chartData,
                },
              ],
            }}
            width={screenWidth} // from react-native
            height={Dimensions.get("window").height / 5}
            yAxisInterval={0} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: "#1E2556",
              backgroundGradientTo: "teal",
              backgroundColor: "whitesmoke",
              backgroundGradientFromOpacity: 0,
              backgroundGradientToOpacity: 0,
              fillShadowGradient: 0,
              fillShadowGradientOpacity: 0,
              decimalPlaces: 0, // optional, defaults to 2dp
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 2,
              },
              propsForDots: {
                r: "0",
                strokeWidth: "5",
                stroke: this.props.route.params.price.stockColor,
              },
            }}
            bezier
            style={{
              paddingRight: -40,
              borderRadius: 20,
              marginRight: 0,
              marginVertical: -20,
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <Text style={styles.chartInterval}>1D</Text>
            <Text style={styles.chartInterval}>1W</Text>
            <Text style={styles.chartInterval}>1M</Text>
            <Text style={styles.chartInterval}>3M</Text>
            <Text style={styles.chartInterval}>1Y</Text>
            <Text style={styles.chartInterval}>MAX</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Button
            icon="plus"
            onPress={() => {
              this.props.navigation.navigate("Buy", {
                stock: this.props.route.params.stock,
                price: this.props.route.params.price,
                logo: this.props.route.params.logo,
                name: this.props.route.params.name,
                priceChange: this.props.route.params.priceChange,
                percentage: this.props.route.params.percentage,
                ticker: this.props.route.params.stock,
                funds: this.props.route.params.funds,
              });
            }}
            width={screenWidth / 2 - 50}
            style={{
              backgroundColor: Colors.orange500,
              justifyContent: "center",
              padding: 5,
              borderRadius: 20,
            }}
            mode="contained"
          >
            BUY
          </Button>
          <Button
            icon="minus"
            width={screenWidth / 2 - 50}
            style={{
              backgroundColor: "crimson",
              padding: 5,
              borderRadius: 20,
            }}
            mode="contained"
          >
            SELL
          </Button>
        </View>
        <AccordionList
          style={{ margin: 20, borderRadius: 20 }}
          list={this.state.list}
          header={this._head}
          body={this._body}
          keyExtractor={(item) => `${item.id}`}
        />
      </SafeAreaView>
    );
  }
}
