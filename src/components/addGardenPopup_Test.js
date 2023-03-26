import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import {IStackScreenProps} from "../../src/library/StackScreenProps"

const AddGardenPopup: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp,value, setValue, placeholder, secureTextEntry, onPress, text} = props;

    const {garden_name, set_garden_name} = useState('');

    const onAddGardenPressed = () => {
   //     console.warn("Enter a garden name");
    };

   

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Enter garden name below </Text>

            <TextInput
                value ={value}
                onChangeText = {setValue}
                value = {garden_name}
                setValue = {set_garden_name}
                style={styles.input}
                placeholder= {'Garden Name'}
            />
            
            <TouchableOpacity onPress={onAddGardenPressed}  style={Btn.container}>
                <Text style={Btn.text}> Add Garden </Text>
            </TouchableOpacity>

            <TouchableOpacity style = {styles.touchableOpacity}
                onPress = {() => closeModal(false,'Close',false)}
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