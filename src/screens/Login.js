import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, Modal } from 'react-native';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {Forgotpw_popup} from '../components/forgotpasswordPopup.js';
import COLORS from "../consts/colors";

const LoginScreen = ({navigation}) => {

    const[isforgotpwPopupVisible,setisforgotpwPopupVisible] = useState(false);

    const[chooseData,setchooseData] = useState();

    const changeforgotpwPopupVisible = (bool) => {
        setisforgotpwPopupVisible(bool);
    }

    const setData = (data) => {
        setchooseData(data);            //can be used to obtain info from popup
    }

    const {value, setValue} = useState('');
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');

    const onSignInPressed = () => {
        fetch('https://77ed-102-219-180-122.eu.ngrok.io/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    navigation.navigate('Home');
                } else {
                    alert('Invalid username or password.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            });
    };

    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Welcome Back! </Text>

            <TextInput
                onChangeText = {setUsername}
                value = {username}
                style={styles.input}
                placeholder= {'Username'}
            />
            <TextInput
                onChangeText = {setPassword}
                value = {username}
                style={styles.input}
                secureTextEntry
                placeholder= {'Password'}
            />
            <Pressable onPress={() => onSignInPressed()}  style={Btn.container}>
                <Text style={Btn.text}> SIGN IN </Text>
            </Pressable>

            <Pressable
                onPress={() => setisforgotpwPopupVisible(true)}
                style={Btn2.container}
            >
                <Text style={Btn2.text}> Forgot Password </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignUp')} style={Btn2.container}>
                <Text style={Btn2.text}> Sign Up  </Text>
            </Pressable>



            <Modal
                transparent = {true}
                animationType = 'fade'
                visible = {isforgotpwPopupVisible}
                nRequestClose = {() => changeforgotpwPopupVisible(false)}
            >

                <Forgotpw_popup
                    changeforgotpwPopupVisible = {changeforgotpwPopupVisible}
                    setData = {setData}

                />

            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width:'100%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,

        paddingHorizontal: 5,
        marginVertical: 1,
    },

    input : {
        borderRadius: 100,
        paddingHorizontal: 120,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: COLORS.light,
        marginVertical: 8,
        marginHorizontal: 40,
    },

    title:{
        fontSize : 29,
        fontWeight: 'bold',
        color: '#006400',
        margin: 10,
        marginVertical: 50,
        fontStyle:'normal',
    },

    header:{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        flexDirection:'row',
        justifyContent: 'center'

    },
});

const Btn = StyleSheet.create({
    container : {
        backgroundColor: '#006400',
        width: '100%',
        padding: 15,
        marginVertical: 15,
        alignItems:'center',
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});

const Btn2 = StyleSheet.create({
    container : {
        width: '100%',
        padding: 15,
        marginVertical: 5,
        alignItems:'center',
        borderRadius: 5,
    },

    text:{
        fontWeight:'bold',
        color:'gray',
        textDecorationLine: 'underline',
    },
});

export default LoginScreen;
