import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    Pressable,
    useWindowDimensions,
    ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api_url } from '../consts/api_url';
import COLORS from '../consts/colors';

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExODM1NjA3LCJpYXQiOjE2ODAyOTk2MDcsImp0aSI6ImMyZDQyYTdkNmI5MzRlNTZhNWQ1NzZiNWMwNTdhM2YzIiwidXNlcl9pZCI6IjliNzUxNDMzLTlhZWUtNDU5My04ZjJjLWU5M2MzM2Q2Yjg0NiJ9.5Sep2XrKNjMho1B9J4DNViMAjULnq_fuJs-IXPXrKB4'

// const headers = {
//     'Authorization': `Bearer ${token}`,
// };

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUsernameChange = (text) => {
        setUsername(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleFirstNameChange = (text) => {
        setFirstName(text);
    };

    const handleLastNameChange = (text) => {
        setLastName(text);
    };

    const onSignUpPressed = () => {
        fetch(api_url + '/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
                first_name: firstName,
                last_name: lastName,
            }),
        })
            .then((response) => {
                if (response.status === 200 || response.status === 201) {
                    return response.json();
                } else if (response.status === 400) {
                    throw new Error('Invalid username or password');
                } else {
                    throw new Error('An error occurred');
                    console.log(response.status);
                }
            })
            .then((data) => {
                AsyncStorage.setItem('token', data.access);
                AsyncStorage.setItem('username', username);
                console.log(username)
                console.log(data.access)
                // Clear input fields
  
            })
            .then(() => {
                navigation.navigate('Home');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert(error.message);
            })
            .finally(() => {
                setUsername('');
                setPassword('');
                setEmail('');
                setFirstName('');
                setLastName('');
            })
    };

    const onSignUpPressed1 = () => {
        alert("user created")
    }

    return (
        <View style={styles.container}>
            <Text  style={styles.title}> Create Account </Text>
            <TextInput
                onChangeText={handleUsernameChange}
                value={username}
                style={styles.input}
                placeholder="Username"/>
            <TextInput
                onChangeText={handleEmailChange}
                value={email}
                style={styles.input}
                placeholder="Email"/>
            <TextInput
                onChangeText={handlePasswordChange}
                value={password}
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}/>
            <TextInput
                onChangeText={handleFirstNameChange}
                value={firstName}
                style={styles.input}
                placeholder="First Name"/>
            <TextInput
                onChangeText={handleLastNameChange}
                value={lastName}
                style={styles.input}
                placeholder="Last Name"/>

<Pressable
  onPress={() => {
    navigation.navigate('Login');
    onSignUpPressed();
  }}
  testID="signup-button" // Add this line to set the testID for the button
  style={Btn.container}
>
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
        color: COLORS.primary,
        marginVertical: 50,
        marginHorizontal : 50,
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
        paddingHorizontal: 90,
        paddingVertical: 10,
        width: '90%',
        //  placeholderTextColor: '#006400',
        backgroundColor: COLORS.light,
        marginVertical: 5,
        marginHorizontal: 10,


    },
});

const Btn = StyleSheet.create({
    container : {
        backgroundColor: COLORS.primary,
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
        width: '90%',
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