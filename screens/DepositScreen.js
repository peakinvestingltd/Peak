import React from 'react';
import {SafeAreaView, View, StyleSheet} from 'react-native';
import {Text, Card, IconButton, Colors, Title} from 'react-native-paper';


export default function DepositScreen({navigation}){

    return( 
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Text style={styles.text}>Deposit</Text>
                 <View style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
                    <IconButton icon="bank"
                    color={Colors.white}
                    size={40}
                    />
                    <IconButton icon="apple"
                    color={Colors.white}
                    size={40}
                    />
                    <IconButton icon="google"
                    color={Colors.white}
                    size={40}
                    />
                </View>
            </Card>

            <View>
                <Title style={styles.title}>
                    $9,000
                </Title>
            </View>

            <View style={{display:'flex', flexDirection:'row',}}>
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-1-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-2-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-3-circle"
                />
            </View>
             <View style={{display:'flex', flexDirection:'row', }}>
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-4-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-5-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-6-circle"
                />
            </View>
             <View style={{display:'flex', flexDirection:'row', justifyContent:'', }}>
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-7-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-8-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-9-circle"
                />
            </View>
            <View style={{display:'flex', flexDirection:'row', }}>
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="circle-small"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="numeric-0-circle"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="arrow-left-circle"
                />
            </View>

             <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon="backspace"
                />
                <IconButton
                    color={Colors.white}
                    size={70}
                    icon=""
                />
                 <IconButton
                    color={Colors.white}
                    backgroundColor="whitesmoke"
                    size={70}
                    icon="chevron-right-circle"
                />
            </View>
           
           
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'#676FC9'
        
    },
    text:{
        fontFamily:'Futura',
        fontSize:30,
        color:'whitesmoke',
        textAlign:'center',
        margin:10,
    },
    card:{
        width:'80%',
        height:'auto',
        backgroundColor:'#515DC2',
        borderRadius:20,
        padding:20,
    },
    
    title:{
        fontSize:40,
        paddingTop:80,
        fontFamily:'Futura',
        color:'whitesmoke'
    }




    

})