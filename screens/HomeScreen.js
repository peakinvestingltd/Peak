import React from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import useStatusBar from "../hooks/useStatusBar";
import { logout, user } from "../components/Firebase/firebase";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { styles } from "../css/styles.js";

import { HomeRoute } from "../screens/HomeTabScreen.js";
import { NewsRoute } from "../screens/NewsScreen.js";
import { StockScreen } from "../screens/StockScreen.js";

export default function HomeScreen({ navigation }) {
  useStatusBar("light-content");

  const RecentsRoute = () => (
    <PaperProvider theme={theme}>
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
                £60000
              </Button>
            </View>
            <IconButton
              icon="bell-outline"
              color={Colors.orange500}
              size={30}
            />
          </View>
        </Card>
        <Image
          style={styles.avatar}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSO6BJZGYecexQmJTsc-OPa4IFiyJsOUP7Hw&usqp=CAU",
          }}
        />
        <Text style={styles.text2}>Jhon Doe</Text>
        <Text style={styles.text2}>Jhondoe@gmail.com</Text>

        <List.AccordionGroup>
          <List.Accordion
            style={styles.accordionHeader}
            titleStyle={{ color: "white" }}
            title="History"
            id="1"
            left={(props) => <List.Icon {...props} icon="history" />}
          >
            <List.Item title="Item 1" />
          </List.Accordion>
          <List.Accordion
            style={styles.accordionHeader}
            titleStyle={{ color: "white" }}
            title="Notifications"
            id="2"
            left={(props) => <List.Icon {...props} icon="bell" />}
          >
            <List.Item title="Item 2" />
          </List.Accordion>
          <List.Accordion
            style={styles.accordionHeader}
            titleStyle={{ color: "white" }}
            title="Manage Funds"
            id="3"
            left={(props) => <List.Icon {...props} icon="wallet" />}
          >
            <List.Item title="Item 3" />
          </List.Accordion>
          <List.Accordion
            style={styles.accordionHeader}
            titleStyle={{ color: "white" }}
            title="Invite Friends"
            id="4"
            left={(props) => <List.Icon style={{color:'white'}} {...props} icon="account-plus" />}
          >
            <List.Item title="Item 4" />
          </List.Accordion>

          <List.Accordion
            style={styles.accordionHeader}
            titleStyle={{ color: "white" }}
            title="Peak Points"
            id="5"
            left={(props) => <List.Icon {...props} icon="basket" />}
          >
            <List.Item title="Item 5" />
          </List.Accordion>
        </List.AccordionGroup>

        <Button mode="outlined" style={styles.logout} onPress={handleSignOut}>
          Logout
        </Button>
      </SafeAreaView>
    </PaperProvider>
  );

  const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
      ...DefaultTheme.colors,
      primary: "#fff",
      accent: "#95ff55",
    },
  };

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "stock",
      title: "Home",
      icon: "details",
      color: "#1E2556",
      next: { navigation },
    },
    { key: "home", title: "Portfolio", icon: "account", color: "#1E2556" },
    { key: "news", title: "News", icon: "newspaper", color: "#1E2556" },
    { key: "recents", title: "Settings", icon: "cog", color: "#1E2556" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    news: NewsRoute,
    stock: StockScreen,
    recents: RecentsRoute,
  });

  useStatusBar("light-content");
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <BottomNavigation
        barStyle={{ backgroundColor: "#651fff" }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </View>
  );
}
