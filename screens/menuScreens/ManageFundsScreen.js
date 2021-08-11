// import React, { useState } from "react";
// import * as firebase from "firebase";
// import "firebase/database";
// const db = firebase.firestore();
// import {
//   SafeAreaView,
//   Dimensions,
//   Text,
//   View,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   Image,
//   useMemo,
//   useCallback,
// } from "react-native";
// import {
//   Title,
//   Button,
//   Card,
//   IconButton,
//   Colors,
//   ToggleButton,
//   Icon,
// } from "react-native-paper";
// import { LineChart } from "react-native-chart-kit";
// import { Separator } from "native-base";
// import { AccordionList } from "accordion-collapse-react-native";
// import { styles } from "../../css/styles.js";
// import header from "../../components/header.js";
// import navBar from "../../components/navBar.js";
// import { Ionicons, EvilIcons } from "@expo/vector-icons";
// const screenWidth = Dimensions.get("window").width;

// import {
//   getBalance,
//   getFinnhubPrices,
//   getFinnhubChart,
//   getFinnhubCompanyProfile,
//   getToken,
//   getSecclStock,
//   bankTransferIn,
//   createOrder,
//   getAccountInfo,
//   getUserInfo,
//   getUserId,
//   currentStock,
// } from "../../utils/functions";

// let timestamp = Math.round(Date.now() / 1000);
// let yesterday = timestamp - 604800;

// let from = yesterday.toString();
// let to = timestamp.toString();

// const apiKey = "c29d3o2ad3ib4ac2prkg";

// export default function ManageFundsScreen(props) {
//   const [chartData, setChartData] = useState(props.route.params.chartData);
//   const [loaded, setLoaded] = useState(false);
//   const [ownedShares, setOwnedShares] = useState(0);
//   const [stock, setStock] = useState(props.route.params.stock);
//   const [infoSelected, setInfoSelected] = useState(false);
//   const [descSelected, setDescSelected] = useState(false);
//   const [selectedChart, setSelectedChart] = useState("7D");

//   function toggleDesc() {
//     if (descSelected) {
//       return (
//         <View style={styles.infoContents}>
//           <Text style={styles.infoText}>{props.route.params.desc}</Text>
//         </View>
//       );
//     }
//   }

//   function ToggleInfo() {
//     if (infoSelected) {
//       return (
//         <View style={styles.infoContents}>
//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Your shares</Text>
//             <Text style={styles.listText2}>{ownedShares}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Name</Text>
//             <Text style={styles.listText2}>{params.name}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Total employees</Text>
//             <Text style={styles.listText2}>
//               {Math.round(params.employeeTotal)}
//             </Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Industry</Text>
//             <Text style={styles.listText2}>{params.industry}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>groupe</Text>
//             <Text style={styles.listText2}>{params.group}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>sector</Text>
//             <Text style={styles.listText2}>{params.sector}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Market cap</Text>
//             <Text style={styles.listText2}>{params.marketCap}</Text>
//           </View>

//           <View
//             style={{ flexDirection: "row", justifyContent: "space-between" }}
//           >
//             <Text style={styles.listText1}>Shares outstanding</Text>
//             <Text style={styles.listText2}>{params.shareOutstanding}</Text>
//           </View>
//         </View>
//       );
//     }
//   }

//   function icon(section) {
//     if (section) {
//       return <EvilIcons name="chevron-down" size={40} color="white" />;
//     } else {
//       return <EvilIcons name="chevron-right" size={40} color="white" />;
//     }
//   }

//   function callChartData() {
//     setLoaded(true);
//     console.log("called");
//     let stockCandle = {};
//     let loadedStock = [];

//     async function adddata(user) {
//       const userRef = db
//         .collection("users")
//         .doc(user.uid)
//         .collection("practiceInvestments")
//         .doc(stock);

//       const doc = await userRef.get();

//       if (!doc.exists) {
//         console.log("No such document!");
//         let amount = 0;
//         return amount;
//       } else {
//         let amount = doc.data()["amount"];
//         console.log("Document data:", amount);
//         return amount;
//       }
//     }

//     firebase.auth().onAuthStateChanged((user) => {
//       adddata(user).then((amount) => {
//         setOwnedShares(amount);
//       });
//     });
//   }

//   if (!loaded) {
//     callChartData();
//   } else {
//     console.log("nooooo");
//   }
//   const params = props.route.params;

//   function chartButtons(value) {
//     let style;
//     if (selectedChart == value) {
//       style = styles.selectedChartIcon;
//     } else {
//       style = styles.chartIcon;
//     }
//     return (
//       <TouchableOpacity
//         onPress={() => {
//           const todayTimestamp = Math.round(Date.now() / 1000);
//           const today = todayTimestamp.toString();
//           const day = 86400;
//           const week = 604800;
//           const mounth = 2629746;
//           const threeMounth = 7889238;
//           const year = 31556952;

//           const max = 473354280;

//           // ========================= try and save the data to reuse if needed =======================
//           if (value == "1D") {
//             const from = (todayTimestamp - day).toString();
//             setSelectedChart("1D");
//             getFinnhubChart(stock, from, today, "5").then((chartData) => {
//               if (chartData.o) {
//                 setChartData(chartData.o);
//               }

//               console.log(chartData);
//               console.log(
//                 "==========================================================here"
//               );
//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                   props.route.params.price.currentPrice,
//                 ]);
//               }
//             });
//           } else if (value == "7D") {
//             const from = (todayTimestamp - week).toString();
//             setSelectedChart("7D");
//             getFinnhubChart(stock, from, today, "30").then((chartData) => {
//               setChartData(chartData.o);

//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([props.route.params.price.currentPrice]);
//               }
//             });
//           } else if (value == "1M") {
//             const from = (todayTimestamp - mounth).toString();
//             setSelectedChart("1M");
//             getFinnhubChart(stock, from, today, "60").then((chartData) => {
//               setChartData(chartData.o);

//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([props.route.params.price.currentPrice]);
//               }
//             });
//           } else if (value == "3M") {
//             const from = (todayTimestamp - threeMounth).toString();
//             setSelectedChart("3M");
//             getFinnhubChart(stock, from, today, "D").then((chartData) => {
//               setChartData(chartData.o);

//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([props.route.params.price.currentPrice]);
//               }
//             });
//           } else if (value == "1Y") {
//             const from = (todayTimestamp - year).toString();
//             setSelectedChart("1Y");
//             getFinnhubChart(stock, from, today, "D").then((chartData) => {
//               setChartData(chartData.o);

//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([props.route.params.price.currentPrice]);
//               }
//             });
//           } else if (value == "MAX") {
//             const from = (todayTimestamp - max).toString();
//             setSelectedChart("MAX");
//             getFinnhubChart(stock, from, today, "W").then((chartData) => {
//               setChartData(chartData.o);

//               if (chartData.s == "no_data" || chartData.o == null) {
//                 setChartData([props.route.params.price.currentPrice]);
//               }
//             });
//           }
//           console.log(value);
//         }}
//       >
//         <View style={style}>
//           <View style={{ flexDirection: "column", justifyContent: "center" }}>
//             <Text style={styles.chartTextButton}>{value}</Text>
//           </View>
//         </View>
//       </TouchableOpacity>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {header()}
//       <ScrollView>
//         <Button
//           style={styles.pageButton}
//           onPress={() => props.navigation.goBack()}
//         >
//           <Text style={styles.pageButtonText}>&lt; Company Deatails</Text>
//         </Button>

//         <View style={styles.cardTop}>
//           <View
//             style={{
//               display: "flex",
//               marginRight: 30,
//               justifyContent: "space-between",
//               flexDirection: "row",
//             }}
//           >
//             <Image
//               style={styles.image}
//               source={{
//                 uri: props.route.params.logo,
//               }}
//             />

//             <View style={styles.stockNameView}>
//               <Text style={styles.stockName}>{props.route.params.name}</Text>
//               <Text style={styles.stockTicker}>
//                 {props.route.params.stock}-{props.route.params.country}
//               </Text>
//             </View>
//           </View>

//           <View style={styles.priceContainer}>
//             <Text style={styles.price}>
//               {props.route.params.currency}
//               {props.route.params.price.currentPrice}
//             </Text>
//             <Text style={styles[props.route.params.color]}>
//               {props.route.params.priceChange}
//               {"("}
//               {props.route.params.price.percentage.toFixed(2)}%{")"}
//             </Text>
//           </View>
//         </View>

//         <View style={styles.chartContainer}>
//           <View style={styles.chartButtons}>
//             {chartButtons("1D")}
//             {chartButtons("7D")}
//             {chartButtons("1M")}
//             {chartButtons("3M")}
//             {chartButtons("1Y")}
//             {chartButtons("MAX")}
//           </View>
//           <LineChart
//             //   bezier
//             segments={3}
//             yAxisLabel={props.route.params.currency}
//             yAxisSuffix=""
//             withInnerLines={false}
//             withOuterLines={false}
//             width={screenWidth - 10}
//             height={screenWidth / 2 - 0}
//             data={{
//               datasets: [
//                 {
//                   data: chartData,
//                   strokeWidth: 1,
//                 },
//               ],
//             }}
//             onDataPointClick={(value) => {
//               console.log(value);
//             }}
//             chartConfig={{
//               withDots: false,
//               strokeWidth: 1.5,
//               backgroundGradientFromOpacity: 0,
//               backgroundGradientToOpacity: 0,
//               decimalPlaces: 0, // optional, defaults to 2dp
//               color: (opacity = 1) => `rgba(${params.chartColor}1)`,
//               fillShadowGradientOpacity: 0.3,
//               fillShadowGradient: params.stockColor,
//               propsForHorizontalLabels: {
//                 stroke: "white",
//                 textAnchor: "end",
//                 fontWeight: "100",
//                 fontSize: 8,
//                 letterSpacing: 3,
//               },

//               // propsForBackgroundLines: {
//               //   stroke: "transparent",
//               // },

//               propsForDots: {
//                 r: "0",
//                 strokeWidth: "5",
//                 stroke: "#fff",
//               },
//             }}
//             style={{
//               // paddingRight: 0,
//               margin: 0,
//               marginLeft: -20,
//               borderRadius: 0,
//               marginRight: 0,
//             }}
//           />
//         </View>
//         <View
//           style={{
//             flexDirection: "row",
//             marginLeft: 15,
//             marginRight: 15,
//             marginTop: 10,
//             //   justifyContent: "space-around",
//           }}
//         >
//           <Button
//             onPress={() => {
//               props.navigation.navigate("Buy", {
//                 stock: props.route.params.stock,
//                 price: props.route.params.price,
//                 logo: props.route.params.logo,
//                 name: props.route.params.name,
//                 priceChange: props.route.params.priceChange,
//                 percentage: props.route.params.price.percentage.toFixed(2),
//                 ticker: props.route.params.stock,
//                 funds: props.route.params.funds,
//                 country: props.route.params.country,
//                 color: props.route.params.color,
//                 currency: props.route.params.currency,
//                 ownedShares: ownedShares,
//               });
//             }}
//             //  width={screenWidth / 2 - 50}
//             style={styles.tradeButton}
//             mode="contained"
//           >
//             Trade
//           </Button>
//           <Button
//             marginLeft={10}
//             color={"#ff7f00"}
//             style={styles.FavouriteButton}
//           >
//             Add to List
//           </Button>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             setInfoSelected(!infoSelected);
//           }}
//         >
//           <View style={styles.infoCardTop}>
//             <View
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 marginLeft: 10,
//               }}
//             >
//               <Text style={styles.infoTopText}>Info</Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 marginRight: 10,
//               }}
//             >
//               {icon(infoSelected)}
//             </View>
//           </View>
//         </TouchableOpacity>

//         {ToggleInfo()}
//         <TouchableOpacity
//           onPress={() => {
//             setDescSelected(!descSelected);
//           }}
//         >
//           <View style={styles.infoSection}>
//             <View
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 marginLeft: 10,
//               }}
//             >
//               <Text style={styles.infoTopText}>Company Description</Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 marginRight: 10,
//               }}
//             >
//               {icon(descSelected)}
//             </View>
//           </View>
//         </TouchableOpacity>

//         {toggleDesc()}
//       </ScrollView>

//       <View style={styles.footer}></View>
//       {navBar(props, props.route.params.funds)}
//     </SafeAreaView>
//   );
// }
import React from "react";
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

const navBarColor = "black";

import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../../hooks/useStatusBar";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../../css/styles.js";

export default function ManageFundsScreen({ navigation }) {
  useStatusBar("light-content");

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
          <Button style={styles.pageButton} onPress={() => navigation.goBack()}>
            <Text style={styles.pageButtonText}>&lt; Help Center</Text>
          </Button>
        </ScrollView>

        <View style={styles.footer}></View>
        <View style={styles.navBar}>
          <IconButton
            icon={"chart-line-variant"}
            color={"white"}
            size={35}
            style={styles.navButton}
            onPress={() => navigation.navigate("Stock")}
          ></IconButton>
          <IconButton
            icon={"account"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Portfolio")}
          ></IconButton>
          <IconButton
            icon={"newspaper"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("News")}
          ></IconButton>
          <IconButton
            icon={"magnify"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Search")}
          ></IconButton>
          <IconButton
            icon={"menu"}
            style={styles.navButton}
            size={35}
            color={"white"}
            onPress={() => navigation.navigate("Home")}
          ></IconButton>
        </View>
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
