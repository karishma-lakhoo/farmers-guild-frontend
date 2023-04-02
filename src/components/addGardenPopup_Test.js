import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const url = api_url + '/garden/';
const AddGardenPopup = (navigation) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [gardenName, setGardenName] = useState('');

    const onAddGardenPressed = async (gardenName) => {
        console.log(gardenName)
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({ name: gardenName });
            console.log(body)
            const response = await fetch(api_url + '/garden/', {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.status === 201) {
                // The garden was added successfully, so close the modal
                setIsModalVisible(false);
            } else {
                // There was an error adding the garden, so display an error message
                console.error('Error adding garden:', response.status);
            }
        } catch (error) {
            // There was an error retrieving the token, so display an error message
            console.error('Error retrieving token:', error);
        }
    };




    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Enter garden name below </Text>

            <TextInput
                onChangeText={text => setGardenName(text)}
                value={gardenName}
                style={styles.input}
                placeholder= {'Garden Name'}/>


            <TouchableOpacity onPress={() => onAddGardenPressed(gardenName)} style={Btn.container}>
                <Text style={Btn.text}> Add Garden </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.touchableOpacity}
                onPress = {() => closeModal(false,'Close',false)}>
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
        top: 40,
        marginVertical: 40,
    },
    container: {
        left: '10%',
        top: '10%',
        width: '80%',
        height: '70%',
        backgroundColor: '#fff',
        alignItems: 'center',
      //  justifyContent: 'center',
        borderRadius: 50,
    },

    input : {
        borderRadius: 100,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: '#D3D3D3',
        marginVertical: 8,
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
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});



export {AddGardenPopup};