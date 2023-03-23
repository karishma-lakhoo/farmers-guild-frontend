import React from 'react';
import{
StyleSheet, Text,View, TouchableOpacity,Dimensions
} from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT_popup = 150;

const Home_popup = () => {


    return (
        <TouchableOpacity
        disabled = {true}
        style = {styles.container}
        >

            <View style = {styles.popup}>

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    popup:{
        height: HEIGHT_popup,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        width: WIDTH - 80,
        
    },
})

export {Home_popup}