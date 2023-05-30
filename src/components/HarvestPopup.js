import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useContext, useState} from 'react';
import {api_url} from "../consts/api_url";

const url = api_url + '/garden/';
const Harvest_popup = (navigation) => {
    const [value, setValue] = useState('');
    const [harvestName, setHarvestName] = useState('');
    // const { HarvestFood } = myState.food
    const [token, setToken] = useState('');



    const onHarvestPressed = () => {
        console.log(harvestName);
        //     console.warn("Enter a garden name");

    };


    const closeModal = (bool,data) => {
        value.changeHarvestPopupVisible(bool);
        value.setData(data);
      //  props.changeAddGardenPopupVisible(bool2);
        console.log()
    }


    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Enter amount in grams </Text>

            <TextInput
                value = {harvestName}
                onChangeText = {setHarvestName}
                style={styles.input}
                placeholder= {'Harvest amount'}/>

            <TouchableOpacity onPress = {() => {
                closeModal(false,'Close');
                onHarvestPressed()}}  style={Btn.container}>
                <Text style={Btn.text}> Confirm harvest </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.touchableOpacity}
                onPress = {() => { closeModal(false,'Close')}}>
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
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});



export {Harvest_popup};