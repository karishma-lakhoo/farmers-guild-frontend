import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';


import Icon from "react-native-vector-icons/MaterialIcons";
import SelectBox from "react-native-multi-selectbox";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";
import Lottie from 'lottie-react-native';
const GardenScreen = ({navigation}) => {

export default function Animation() {
    return (
        <Lottie source={require('../images/lf20_sgn7zslb.json')} autoPlay loop />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default GardenScreen;
