import React from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, List,Paragraph, Colors, Title, Menu, Divider, Card, Button, BottomNavigation} from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useStatusBar from '../hooks/useStatusBar';
import { logout, user} from '../components/Firebase/firebase';
import {HomeRoute} from '../screens/HomeTabScreen.js'
import {NewsRoute} from '../screens/NewsScreen.js'
import {StockRoute} from '../screens/StockScreen.js'

export default function HomeScreen() {

const RecentsRoute = () => 
  <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
          {/* <Title style={styles.text}>{user.email}</Title> */}
          {/* <Title style={styles.text}>{user.providerId}</Title> */}
          <List.Section>
              
              <List.Accordion
                style={styles.text}
                title="Language"
                titleStyle={{color:'white'}}
                left={props => <List.Icon   {...props} icon="translate" />}>
                <List.Item titleStyle={{color:"white"}} left={props => <List.Icon color={Colors.blue500} {...props} icon=""/>} title="Change language" />
              </List.Accordion>

              <List.Accordion
                title="Account"
                titleStyle={{color:'white'}}
                left={props => <List.Icon {...props} icon="account" />}>    
                  <List.Item titleStyle={{color:'white'}}left={props => <List.Icon {...props} icon=""/>} title="Reset Password" />
              </List.Accordion>

              <List.Accordion
                title="Theme"
                left={props => <List.Icon {...props} icon="brightness-4" />}
                expanded={expanded}
                onPress={handlePress}>
                <List.Item titleStyle={{color:'white'}} left={props => <List.Icon {...props} icon=""/>} title="Dark" />
                <List.Item titleStyle={{color:'white'}} left={props => <List.Icon {...props} icon=""/>} title="Day" />
              </List.Accordion>
        </List.Section> 
        <Button mode="contained" 
                    style={styles.logout}
                    onPress={handleSignOut}
                  >
                    Logout
                </Button>
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
    { key: 'home', title: 'Home', icon: 'home', color:'teal' },
    { key: 'news', title: 'News', icon: 'newspaper', color:'#d81b60'},
    { key: 'stock', title: 'Stock', icon: 'details', color:'#651fff' },
    { key: 'recents', title: 'Settings', icon: 'cog', color: '#5e35b1'},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    news: NewsRoute,
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
        barStyle={{backgroundColor: '#651fff' }}
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
    backgroundColor: "#123",
    color:'whitesmoke',

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
      bottom:50,
      padding:5,
      left:10,
      right:10,
  }
});
