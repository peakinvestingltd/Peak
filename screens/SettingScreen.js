
import React, {Component} from 'react';
import { DefaultTheme, Title, List, Provider as PaperProvider } from 'react-native-paper';
import { View, StyleSheet} from 'react-native';
import { logout, user} from '../components/Firebase/firebase';

const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#222948',
    accent: '#222948',
  },
};


const [expanded, setExpanded] = React.useState(true);

const handlePress = () => setExpanded(!expanded);

class RecentsRoute extends Component  {

render() {
    return (

     
      <View style={styles.container}>
          <Title style={styles.text}>{user.email}</Title>
          <List.Section title="Settings">
              
              <List.Accordion
                title="Language"
                left={props => <List.Icon {...props} icon="translate" />}>
                <List.Item  left={props => <List.Icon {...props} icon=""/>} title="Change language" />
              </List.Accordion>

              <List.Accordion
                title="Account"
                left={props => <List.Icon {...props} icon="account" />}>
                <List.Item onPress=>(console.log("lol"))  left={props => <List.Icon {...props} icon="lock-alert"/>} title="Reset password" />
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
      </View>
   
  )
    }
}

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#651fff",
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
});