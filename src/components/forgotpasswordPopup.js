import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

import {IStackScreenProps} from "../../src/library/StackScreenProps"

const Forgotpw_popup: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp,value, setValue, placeholder, secureTextEntry, onPress, text} = props;

    const {forgotpw_name, set_forgotpw_name} = useState('');

    const onforgotpwPressed = () => {
   //     console.warn("Enter a garden name");
    };


    closeModal = (bool,data) => {
        props.changeforgotpwPopupVisible(bool);
        props.setData(data);
      //  props.changeAddGardenPopupVisible(bool2);
    }
   

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Forgot password? </Text>

            <TextInput
             //   value ={value}
             //   onChangeText = {setValue}
             //   value = {forgotpw_name}
             //   setValue = {set_forgotpw_name}
                style={styles.input}
                placeholder= {'Enter username'}
            />
            <TextInput
             //   value ={value}
             //   onChangeText = {setValue}
             //   value = {forgotpw_name}
             //   setValue = {set_forgotpw_name}
                style={styles.input}
                placeholder= {'Enter new password'}
            />
            <TextInput
             //   value ={value}
             //   onChangeText = {setValue}
             //   value = {forgotpw_name}
             //   setValue = {set_forgotpw_name}
                style={styles.input}
                placeholder= {'Confirm new password'}
            />




            
            <TouchableOpacity onPress = {() => closeModal(false,'Close')}  style={Btn.container}>
                <Text style={Btn.text}> Confirm password </Text>
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
        //top: 10,
        marginVertical: 30,
    },
    container: {
        left: '1%',
        top: '10%',
        width: '98%',
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
        marginVertical: 5,
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
        marginVertical: 20,
        alignItems:'center',
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});



export {Forgotpw_popup};