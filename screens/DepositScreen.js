import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Text, Card} from 'react-native-paper';


export default function DepositScreen({navigation}){

    return( 
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Deposit</Text>

            <Card>

            </Card>
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({

    container:{
        flex:1,
        alignItems:'center',
        
    },
    text:{
        fontFamily:'Futura',
        fontSize:30,
    }

})