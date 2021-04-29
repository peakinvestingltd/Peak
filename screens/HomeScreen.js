import React from 'react';
import {SafeAreaView, View, StyleSheet, } from 'react-native';
import {Text, List,Paragraph, Title, Menu, Divider, Card, Button, BottomNavigation} from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useStatusBar from '../hooks/useStatusBar';
import { logout, user} from '../components/Firebase/firebase';
import {HomeRoute} from '../screens/HomeTabScreen.js'
import {StockRoute} from '../screens/StockScreen.js'


export default function HomeScreen() {

const RecentsRoute = () => 
  <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
          {/* <Title style={styles.text}>{user.email}</Title> */}
          {/* <Title style={styles.text}>{user.providerId}</Title> */}
          <List.Section title="Settings">
              
              <List.Accordion
                style={styles.text}
                title="Language"
                left={props => <List.Icon {...props} icon="translate" />}>
                <List.Item left={props => <List.Icon {...props} icon=""/>} title="Change language" />
              </List.Accordion>

              <List.Accordion
                title="Account"
                left={props => <List.Icon {...props} icon="account" />}>
                <List.Item  left={props => <List.Icon {...props} icon="lock-alert"/>} title="Reset password" />
              </List.Accordion>

              <List.Accordion
                title="Theme"
                left={props => <List.Icon {...props} icon="brightness-4" />}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item left={props => <List.Icon {...props} icon="weather-night"/>} title="Dark" />
                <List.Item left={props => <List.Icon {...props} icon="weather-sunny"/>} title="Day" />
              </List.Accordion>

              
              <List.Accordion
                title="Exit"
                expanded={expanded}
                onPress={handlePress}>

                  <Button mode="contained" 
                    style={styles.logout}
                    onPress={handleSignOut}
                  >
                    Logout
                </Button>
                
              </List.Accordion>
        </List.Section> 
      </SafeAreaView>
   </PaperProvider>

  const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#04D370',
    accent: '#222948',
  },
};

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

 const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'stock', title: 'Stocks', icon: 'briefcase' },
    { key: 'recents', title: 'Settings', icon: 'cog', color: '#607D8B' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    stock: StockRoute,
    recents: RecentsRoute,
  });

  useStatusBar('dark-content');
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
        barStyle={{backgroundColor: '#212948' }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
    />
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222948",
    color:'whitesmoke'
  },
  text:{
    textAlign:'center',
    color: 'whitesmoke',
    letterSpacing:2,
    fontSize:15,
    marginTop:10,
    fontWeight:'800',
    textTransform:'uppercase'
  },
  logout:{
      color:'whitesmoke',
      alignSelf:'center',
      position:'absolute',
      bottom:20,
      left:10,
      right:10,
  }
});
