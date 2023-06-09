import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, Modal } from 'react-native';
import React, {useContext, useEffect} from 'react';
import {useState} from 'react';
import {Forgotpw_popup} from '../components/forgotpasswordPopup.js';
import COLORS from "../consts/colors";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {api_url} from "../consts/api_url";


const LoginScreen = ({navigation}) => {
    const[isForgotPwPopupVisible,setIsForgotPwPopupVisible] = useState(false);
    const[chooseData,setchooseData] = useState();
    const changeforgotpwPopupVisible = (bool) => {
        setIsForgotPwPopupVisible(bool);
    }

    const setData = (data) => {
        setchooseData(data);            //can be used to obtain info from popup
    }
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };
    const onSignInPressed = () => {
        // console.log(username)
        // console.log(password)
        fetch(api_url + '/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error('Invalid username or password');
                } else {
                    throw new Error('An error occurred');
                }
            })
            .then((data) => {
                AsyncStorage.setItem('token', data.access);
                AsyncStorage.setItem('username', username)
                    .then(() => {
                        navigation.navigate('Home', {
                            username: username
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                        alert('An error occurred. Please try again later.');
                    });
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            });
    };
    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");

    };

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Welcome Back! </Text>

            <TextInput
                onChangeText={handleUsernameChange}
                value={username}
                style={styles.input}
                placeholder="Username"
            />
            <TextInput
                onChangeText={handlePasswordChange}
                value={password}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
            />
            <Pressable onPress={() => onSignInPressed()}  style={Btn.container}>
                <Text style={Btn.text}> SIGN IN </Text>
            </Pressable>

            <Pressable
                onPress={() => setIsForgotPwPopupVisible(true)}
                style={Btn2.container}>
                {/*<Text style={Btn2.text}> Forgot Password </Text>*/}
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignUp')} style={Btn2.container}>
                <Text style={Btn2.text}> Sign Up  </Text>
            </Pressable>



            {/*<Modal*/}
            {/*    transparent = {true}*/}
            {/*    animationType = 'fade'*/}
            {/*    visible = {isForgotPwPopupVisible}*/}
            {/*    nRequestClose = {() => changeforgotpwPopupVisible(false)}>*/}

            {/*    <Forgotpw_popup*/}
            {/*        changeforgotpwPopupVisible = {changeforgotpwPopupVisible}*/}
            {/*        setData = {setData}/>*/}

            {/*</Modal>*/}
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
        paddingHorizontal: 90,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: COLORS.light,
        marginVertical: 8,
        marginHorizontal: 40,
    },

    title:{
        fontSize : 29,
        fontWeight: 'bold',
        color: COLORS.primary,
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
        backgroundColor: COLORS.primary,
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
