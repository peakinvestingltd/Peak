import React, { Component, useState } from "react";
import { styles } from "../css/styles.js";
import {
  SafeAreaView,
  Dimensions,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  DefaultTheme,
  Card,
  Chip,
  Button,
  Searchbar,
  Colors,
  IconButton,
  Title,
  Provider as PaperProvider,
} from "react-native-paper";



export default function ChatScreen ({navigation}) {
     return (
      <SafeAreaView style={styles.container}>

      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', }}>
        <Image
            style={styles.avatarSmall}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSO6BJZGYecexQmJTsc-OPa4IFiyJsOUP7Hw&usqp=CAU",
            }}
          />
        <Text style={styles.titleText}>Chat </Text>
        <IconButton icon="dots-horizontal" color={Colors.white} />
        </View>
      </SafeAreaView>
    );

}