import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground } from 'react-native';
import React from 'react';
import {useState} from 'react';

const LoginScreen = ({navigation}) => {
    const {value, setValue} = useState('');
    const {username, setUsername} = useState('');
    const {password, setPassword} = useState('');

    const onSignInPressed = () => {
        console.warn("Sign in");
    };

    const onForgotPasswordPressed = () => {
        console.warn("Forgot Password");
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Welcome Back! </Text>

            <TextInput
                value ={value}
                onChangeText = {setValue}
                value = {username}
                setValue = {setUsername}
                style={styles.input}
                placeholder= {'Username'}
            />
            <TextInput
                value ={value}
                onChangeText = {setValue}
                value = {username}
                setValue = {setPassword}
                style={styles.input}
                secureTextEntry
                placeholder= {'Password'}
            />
            <Pressable onPress={() => navigation.navigate('Home')}  style={Btn.container}>
                <Text style={Btn.text}> SIGN IN </Text>
            </Pressable>

            <Pressable onPress={onForgotPasswordPressed}  style={Btn2.container}>
                <Text style={Btn2.text}> Forgot Password </Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('SignUp')} style={Btn2.container}>
                <Text style={Btn2.text}> Sign Up  </Text>
            </Pressable>
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
        backgroundColor: '#808080',
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
