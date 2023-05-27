import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useContext, useState} from 'react';
import {api_url} from "../consts/api_url";
import {MyContext} from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
const url = api_url + '/plants_in_garden/';

const HarvestWeightScreen = ({navigation}) => {
    const [harvestWeight, setHarvestWeight] = useState('');
    const { myState } = useContext(MyContext);
    // adding a harvest
    const onAddHarvest = async (harvestWeight, ) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({
                food: myState.food,
                weight: harvestWeight,
                garden: myState.garden});


            const response = await fetch(api_url + '/harvest_log/', {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.status === 201) {
                // The garden was added successfully, so close the modal
                console.log('yey')
            } else {
                // There was an error adding the garden, so display an error message
                console.error('Error adding food:', response.status);
            }
        } catch (error) {
            // There was an error retrieving the token, so display an error message
            console.error('Error retrieving food:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Enter amount in grams </Text>
            {/*<Text  style={styles.title}> hasfas </Text>*/}

            <TextInput
                value = {harvestWeight}
                onChangeText = {setHarvestWeight}
                style={styles.input}
                placeholder= {'Harvest amount'}/>

            <TouchableOpacity
                onPress = {() => {
                    navigation.navigate('Log');
                    onAddHarvest(harvestWeight);
                    // console.log(harvestWeight)
                    // console.log(myState.garden.id)
                }}
                style={Btn.container}>
                <Text style={Btn.text}> Confirm harvest </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.touchableOpacity}
                              onPress = {() => navigation.navigate('Home')}>
                <Text style = {styles.text}>
                    Close
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    touchableOpacity: {
        backgroundColor: '#006400',
        width: '80%',
        padding: 15,
        alignItems:'center',
        borderRadius: 25,
        top: 70,
        marginVertical: 40,
    },
    container: {
        left: '5%',
        top: '10%',
        width: '90%',
        height: '80%',
        backgroundColor: '#D3D3D3',
        alignItems: 'center',
        //  justifyContent: 'center',
        borderRadius: 50,
    },

    input : {
        borderRadius: 100,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: '#fff',
        marginVertical: 25,
        textAlign: 'center',

    },

    title:{
        fontSize : 29,
        fontWeight: 'bold',
        color: '#006400',
        margin: 10,
        //  top: 10,
        marginVertical: 50,
        textAlign: 'center',

    },
    text:{
        fontWeight:'bold',
        color:'white',
    },
});

const Btn = StyleSheet.create({
    container : {
        backgroundColor: '#006400',
        width: '80%',
        padding: 15,
        alignItems:'center',
        borderRadius: 25
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});


export default HarvestWeightScreen;