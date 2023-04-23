import React, { useState } from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import {api_url} from "../consts/api_url";
import {foods, foodSubCategories} from "../consts/foods";
import {SelectList} from 'react-native-dropdown-select-list'


const Analytics_FilterScreen = ({ navigation }) => {

    const [category, setCategory] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");

    const categories = foods
    const subCategories = foodSubCategories

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>New Screen Title</Text>
            </View>
            <View style={{paddingHorizontal: 10, paddingTop: 20}}>
                <SelectList
                    setSelected={setCategory}
                    data={categories}
                    placeholder={"Select Category"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                />

                <SelectList
                    setSelected={setSubCategory}
                    data={subCategories[category]}
                    placeholder={"Select SubCategory"}
                    // defaultOption={{key: '1', value: 'Fruits'}}
                />
            </View>
        </SafeAreaView>
    );
};

export default Analytics_FilterScreen;

const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 30,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});