import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import {
  Text,
  List,
  Paragraph,
  Colors,
  Title,
  Menu,
  Divider,
  Card,
  Button,
  BottomNavigation,
  IconButton,
} from "react-native-paper";

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";

import { ScreenWidth } from "react-native-elements/dist/helpers";
import Svg, { Path } from "react-native-svg";
import * as path from "svg-path-properties";
import * as shape from "d3-shape";
import { styles } from "../../css/styles.js";
import { getFinnhubChart, buildChart } from "../../utils/functions";

const height = 200;
const width = ScreenWidth - 30;
const d3 = {
  shape,
};

import { scaleTime, scaleLinear, scaleQuantile } from "d3-scale";
import { TextInput } from "react-native";
import { Label } from "native-base";

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();

const { Defs, LinearGradient, Stop } = Svg;
const cursorRadius = 6;
const lableWidth = 100;

export default class NotificationSettingsScreen extends React.Component {
  cursor = React.createRef();
  label = React.createRef();

  getChart = getFinnhubChart();
  state = {
    x: new Animated.Value(0),
    loaded: false,
    data: [],
  };
  moveCursor(value) {
    if (this.state.loaded) {
      const scaleY = scaleLinear()
        .domain([
          this.state.low - this.state.low / 100,
          this.state.high + this.state.high / 100,
        ])
        .range([height, 0]);
      const properties = path.svgPathProperties(
        buildChart(this.state.data, this.state.low, this.state.high)
      );
      const lineLength = properties.getTotalLength();
      const { x, y } = properties.getPointAtLength(lineLength - value);
      this.cursor.current.setNativeProps({
        top: y - cursorRadius,
        left: x - cursorRadius,
      });
      const label = scaleY.invert(y);
      this.label.current.setNativeProps({ text: `${label.toFixed(2)}` });
    }
  }

  testing(loaded) {
    console.log(this.state.data);
    if (this.state.loaded) {
      const properties = path.svgPathProperties(
        buildChart(this.state.data, this.state.low, this.state.high)
      );
      const lineLength = properties.getTotalLength();
      const { x } = this.state;
      return (
        <View style={styles.chartContainer}>
          <View
            style={{
              width,
              height,
              // backgroundColor: "white",
              marginTop: 50,
              alignSelf: "center",
            }}
          >
            <Svg>
              <Path
                d={buildChart(this.state.data, this.state.low, this.state.high)}
                stroke={"#1D9440"}
                strokeWidth={1}
              />

              <Path
                d={`${buildChart(
                  this.state.data,
                  this.state.low,
                  this.state.high
                )} L ${width} ${height} L 0 ${height}`}
                fill={"#1D9440"}
                opacity={0.5}
              />

              <View
                ref={this.cursor}
                style={{
                  width: cursorRadius * 2,
                  height: cursorRadius * 2,
                  borderRadius: cursorRadius,
                  borderColor: "#367be2",
                  borderWidth: 2,
                  backgroundColor: "white",
                }}
              />
            </Svg>
            <Animated.View
              style={[
                {
                  position: "absolute",
                  top: -50,
                  left: 0,
                  backgroundColor: "lightgray",
                  padding: 2,
                  paddingRight: 5,
                  paddingLeft: 5,
                  marginTop: 5,
                  marginLeft: 5,
                },
              ]}
            >
              <TextInput ref={this.label}></TextInput>
            </Animated.View>
            <Animated.ScrollView
              style={StyleSheet.absoluteFill}
              contentContainerStyle={{ width: lineLength * 2 }}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={16}
              bounces={false}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { x },
                    },
                  },
                ],
                { useNativeDriver: true }
              )}
              horizontal
            />
          </View>
        </View>
      );
    }
  }

  componentDidMount() {
    console.log(this.state.x);
    this.state.x.addListener(({ value }) => this.moveCursor(value));
    this.moveCursor(0);

    getFinnhubChart("TSLA", from, to, "30").then((chartData) => {
      let open = chartData.o;
      let data = [];
      let low = open[0];
      let high = open[0];
      for (let i = 0; i < open.length; i++) {
        data.push({ x: i, y: open[i] });
        if (open[i] < low) {
          low = open[i];
        }
        if (open[i] > high) {
          high = open[i];
        }
      }
      this.setState({
        loaded: true,
        data,
        low,
        high,
      });
    });
  }

  render() {
    console.log(this.state.loaded);

    return (
      <PaperProvider theme={theme}>
        <SafeAreaView style={styles.container}>
          <Card style={styles.topCard}>
            {/* --------------header------------------------------ */}
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
                <Button mode="contained" style={styles.headerBall}>
                  <Text style={{ color: "white" }}>£add funds</Text>
                </Button>
              </View>
              <IconButton
                icon="bell-outline"
                color={Colors.orange500}
                size={30}
              />
            </View>
          </Card>
          {/* --------------header------------------------------ */}
          <ScrollView>
            <Button
              style={styles.pageButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.pageButtonText}>
                &lt; Notifications Settings
              </Text>
            </Button>

            {this.testing(this.state.loaded)}
          </ScrollView>

          <View style={styles.footer}></View>
          <View style={styles.navBar}>
            <IconButton
              icon={"chart-line-variant"}
              color={"white"}
              size={35}
              style={styles.navButton}
              onPress={() => this.props.navigation.navigate("Stock")}
            ></IconButton>
            <IconButton
              icon={"account"}
              style={styles.navButton}
              size={35}
              color={"white"}
              onPress={() => this.props.navigation.navigate("Portfolio")}
            ></IconButton>
            <IconButton
              icon={"newspaper"}
              style={styles.navButton}
              size={35}
              color={"white"}
              onPress={() => this.props.navigation.navigate("News")}
            ></IconButton>
            <IconButton
              icon={"magnify"}
              style={styles.navButton}
              size={35}
              color={"white"}
              onPress={() => this.props.navigation.navigate("Search")}
            ></IconButton>
            <IconButton
              icon={"menu"}
              style={styles.navButton}
              size={35}
              color={"white"}
              onPress={() => this.props.navigation.navigate("Home")}
            ></IconButton>
          </View>
        </SafeAreaView>
      </PaperProvider>
    );
  }
}

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#fff",
    accent: "#95ff55",
  },
};
