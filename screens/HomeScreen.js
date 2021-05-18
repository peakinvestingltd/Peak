import React from 'react';
import {SafeAreaView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, List,Paragraph, Colors, Title, Menu, Divider, Card, Button, BottomNavigation} from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import useStatusBar from '../hooks/useStatusBar';
import { logout, user} from '../components/Firebase/firebase';
import {HomeRoute} from '../screens/HomeTabScreen.js'
import {NewsRoute} from '../screens/NewsScreen.js'
import {StockScreen} from '../screens/StockScreen.js'
import { ListItem, Avatar, Icon } from 'react-native-elements';


export default function HomeScreen({navigation}) {
useStatusBar('dark-content');
const list = [
  {
    title: 'Email',
    icon: 'email'
  },
]

const list2 = [
  {
    title: 'Passwords',
    icon: 'fingerprint',
    
  },
  {
    title: 'Theme',
    icon: 'lightbulb',
  },
  {
    title: 'Legal',
    icon: 'info'
  },
  {
    title: 'Updates',
    icon: 'update'
  },

]

const list3 = [
  {
    title: 'Passwords',
    icon: 'fingerprint',
    
  },
  
]

const RecentsRoute = () => 
  <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
          
        <ListItem.Accordion
          theme={{ colors: { primary: '#fff' }}}
          content={
            <>
              <Icon name="person" size={30} />
              <ListItem.Content>
                <ListItem.Title>Profile</ListItem.Title>
              </ListItem.Content>
            </>
            
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
        <View backgroundColor="gainsboro">
        
          {
            list.map((item, i) => (
              <ListItem key={i} bottomDivider ListItem key={i} bottomDivider containerStyle={{backgroundColor:"#BDCAE0"}}>
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title >{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))
          }
        </View>
      </ListItem.Accordion>
      <View backgroundColor="gainsboro">
          {
            list2.map((item, i) => (
              <ListItem key={i} bottomDivider containerStyle={{backgroundColor:"#BDCAE0"}} titleStyle={{backgroundColor:"#fff"}} >
                <Icon name={item.icon} />
                <ListItem.Content>
                  <ListItem.Title styles={styles.text}>{item.title}</ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            ))
          }
        </View>
        <ListItem.Accordion
         theme={{ colors: { primary: '#fff' }}}
          content={
            <>
              <Icon name="logout" size={30} />
              <ListItem.Content
              >
                
                <ListItem.Title></ListItem.Title>
              </ListItem.Content>
            </>
            
          }
          isExpanded={expanded}
          onPress={() => {
            setExpanded(!expanded);
          }}
        >
       <Button mode="outlined" 
           style={styles.logout}
           onPress={handleSignOut}
         >
           Logout
        </Button>
      </ListItem.Accordion>
     
        
      </SafeAreaView>
   </PaperProvider>

  const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fff',
    accent: '#95ff55',
  },
};

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

 const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'home', title: 'Home', icon: 'home', color:'teal' },
    { key: 'news', title: 'News', icon: 'newspaper', color:'#027C7C'},
    { key: 'stock', title: 'Stock', icon: 'details', color:'#036E6F' },
    { key: 'recents', title: 'Settings', icon: 'cog', color: '#026263'},

  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    news: NewsRoute,
    stock: StockScreen,
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
    backgroundColor: "#BDCAE0",
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
      alignSelf:'center',
      width:'40%',
      bottom:50,
      padding:5,
      left:0,
      right:0,
  }
});
