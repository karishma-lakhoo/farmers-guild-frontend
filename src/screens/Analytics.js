import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";

const AnalyticsScreen = ({navigation}) => {

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>New Screen Title</Text>
            </View>
            <View style={styles.container}>
                {<Text>"hello"</Text>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AnalyticsScreen;