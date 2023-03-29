import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import {IStackScreenProps} from "../../src/library/StackScreenProps"

const Harvest_popup: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp,value, setValue, placeholder, secureTextEntry, onPress, text} = props;

    const {Harvest_name, set_Harvest_name} = useState('');

    const onHarvestPressed = () => {
   //     console.warn("Enter a garden name");
    };


    closeModal = (bool,data) => {
        props.changeHarvestPopupVisible(bool);
        props.setData(data);
      //  props.changeAddGardenPopupVisible(bool2);
    }
   

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Enter amount in grams </Text>

            <TextInput
                value ={value}
                onChangeText = {setValue}
                value = {Harvest_name}
                setValue = {set_Harvest_name}
                style={styles.input}
                placeholder= {'Harvest amount'}
            />
            
            <TouchableOpacity onPress={onHarvestPressed}  style={Btn.container}>
                <Text style={Btn.text}> Confirm harvest </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.touchableOpacity}
                onPress = {() => closeModal(false,'Close')}
                >
                    <Text
                    style = {styles.text}>
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