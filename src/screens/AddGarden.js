import { View, Text, Button, StyleSheet,TextInput, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';

const AddGardenScreen = ({navigation}) => {
    const {value, setValue} = useState();

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


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    input : {
        borderRadius: 100,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: '#808080',
        marginVertical: 8,
        textAlign: 'center',

    },

    title:{
        fontSize : 29,
        fontWeight: 'bold',
        color: '#006400',
        margin: 10,
        marginVertical: 50,
        textAlign: 'center',

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



export default AddGardenScreen;