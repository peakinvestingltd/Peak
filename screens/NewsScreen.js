import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Linking } from "react-native";
import { Text, Button } from "react-native-paper";
import { styles } from "../css/styles.js";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import header from "../components/header.js";
import navBar from "../components/navBar.js";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import { fonts } from "react-native-elements/dist/config";
export default function NewScreen(props) {
  const [loaded, setLoaded] = useState(false);
  const [news, setNews] = useState();

  const getData = () => {
    setLoaded(true);

    fetch(
      "https://finnhub.io/api/v1/news?category=general&token=c29d3o2ad3ib4ac2prkg"
    )
      .then((response) => response.json())
      .then((newsList) => {
        setNews(newsList);
      });
  };

  if (!loaded) {
    getData();
  }
  const newsList = () => {
    console.log(news);
    if (news) {
      return news.map((newsStory, index) => {
        if (index < 15) {
          return (
            <TouchableOpacity onPress={() => Linking.openURL(newsStory.url)}>
              <View
                style={{
                  margin: 8,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  backgroundColor: "#1b2855",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    width: ScreenWidth / 2,
                  }}
                >
                  <Text
                    style={{
                      color: "#ff7f00",
                      fontSize: 12,
                      paddingTop: 20,
                    }}
                  >
                    {newsStory.category.toUpperCase()} | {newsStory.source}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      marginTop: 10,
                      fontWeight: "bold",
                    }}
                  >
                    {newsStory.headline}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 11,
                      marginTop: 10,
                      flexWrap: "wrap",
                    }}
                  >
                    {newsStory.summary}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 9,
                      marginTop: 10,
                      paddingBottom: 20,
                    }}
                  >
                    {moment(newsStory.datetime * 1000).format("MMM Do YY")}
                  </Text>
                </View>

                <Image
                  style={{
                    width: 120,
                    resizeMode: "cover",
                    marginRight: -35,
                    padding: 0,
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  source={{
                    uri: newsStory.image,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }
      });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ marginBottom: 50 }}>
        <Button
          style={styles.pageButton}
          onPress={() => props.navigation.goBack()}
        >
          <Text style={styles.pageButtonText}>&lt; News</Text>
        </Button>
        <Text style={styles.titleText}>Most Recent</Text>
        {newsList()}
      </ScrollView>

      {navBar(props, props.route.params.funds)}
    </SafeAreaView>
  );
}
