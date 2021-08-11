import React, { useState, useEffect, useRef, useValue } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
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
import header from "../../components/header.js";
import navBar from "../../components/navBar.js";
const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

import { getFinnhubChart, buildChart } from "../../utils/functions";
import Animated from "react-native-reanimated";

let timestamp = Math.round(Date.now() / 1000);
let yesterday = timestamp - 604800;
let from = yesterday.toString();
let to = timestamp.toString();

export default function PeakStoreScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [low, setLow] = useState();
  const [high, setHigh] = useState();
  const [data, setData] = useState();

  const x = useValue(new Animated.Value(0)).current;

  const label = useRef(null);

  function moveCursor(value) {
    if (loaded) {
      const scaleY = scaleLinear()
        .domain([low - low / 100, high + high / 100])
        .range([height, 0]);
      const properties = path.svgPathProperties(buildChart(data, low, high));
      const lineLength = properties.getTotalLength();
      const { x, y } = properties.getPointAtLength(lineLength - value);
      this.cursor.current.setNativeProps({
        top: y - cursorRadius,
        left: x - cursorRadius,
      });
      const label = scaleY.invert(y);
      label.current.setNativeProps({ text: `${label.toFixed(2)}` });
    }
  }

  useEffect(() => {
    console.log(x);
    if (!loaded) {
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
        setLoaded(true);
        setLow(low);
        setHigh(high);
        setData(data);
      });
    }
  });

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        {header()}
        <ScrollView>
          <Button style={styles.pageButton} onPress={() => navigation.goBack()}>
            <Text style={styles.pageButtonText}>&lt; Peak Store</Text>
          </Button>
        </ScrollView>

        <View style={styles.footer}></View>
        {navBar()}
      </SafeAreaView>
    </PaperProvider>
  );
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
