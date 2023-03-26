import {View, Text, Button, StyleSheet, SafeAreaView} from 'react-native';
import React from 'react';

import {IStackScreenProps} from "../../src/library/StackScreenProps"
import Icon from "react-native-vector-icons/MaterialIcons";
import SelectBox from "react-native-multi-selectbox";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";
import Lottie from 'lottie-react-native';

export default function Animation() {
    return (
        <Lottie source={require('../images/lf20_sgn7zslb.json')} autoPlay loop />
    );
}
