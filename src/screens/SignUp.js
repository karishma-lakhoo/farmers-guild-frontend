import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Pressable,
     useWindowDimensions,
     Scrollview,
} from 'react-native';
import React from 'react';
import {useState} from 'react';

const SignUpScreen= ({navigation}) => {
    const { value, setValue} = useState();

    const {username, setUsername} = useState('');
    const {email, setEmail} = useState('');
    const {password, setPassword} = useState('');
    const {passwordRepeat, setPasswordRepeat} = useState('');

    const onSignInPressed = () => {
        console.warn("Create Account");
    };

    const onSignInPress = () => {
        console.warn("onSignInPress");
    };

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Create Account </Text>
            <TextInput
                value ={value}
                onChangeText = {setValue}
                placeholder= {'Username'}
                value = {username}
                setValue = {setUsername}
                style={styles.input}
            />
            <TextInput
                value ={value}
                onChangeText = {setValue}
                placeholder= {'Email'}
                value = {username}
                setValue = {setPassword}
                style={styles.input}
            />
            <TextInput
                value ={value}
                onChangeText = {setValue}
                placeholder= {'Password'}
                value = {username}
                setValue = {setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Pressable onPress={() => navigation.navigate('Login')}  style={Btn.container}>
                <Text style={Btn.text}> REGISTER </Text>
            </Pressable>

            <Text style={styles.text}>
             By registering, you confirm our <Text style={styles.link}>Terms of Use</Text> and
             <Text style={styles.link}> Privacy Policy</Text>
            </Text>

            <Pressable onPress={() => navigation.navigate('Login')}  style={Btn2.container}>
                <Text style={Btn2.text}> Have an Account? Sign in! </Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent:'center',
        padding: 20,

    },

    title : {
        fontSize : 29,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#006400',
        marginVertical: 120,
        marginHorizontal : 100,
    },

    text: {
        color: 'gray',
        marginHorizontal: 5,
        marginVertical:-20,
    },

    link:{
        color: '#FDB075'

    },

        input : {
            borderRadius: 100,
            paddingHorizontal: 120,
            paddingVertical: 10,
            width: '80%',
            placeholderTextColor: '#006400',
            backgroundColor: '#808080',
            marginVertical: 5,
            marginHorizontal: 40,


        },
});

const Btn = StyleSheet.create({
    container : {
        backgroundColor: '#006400',
        width: '100%',
        padding: 15,
        marginVertical: 35,
        alignItems:'center',
        borderRadius: 100,
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

export default SignUpScreen;
