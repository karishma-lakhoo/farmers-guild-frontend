import React, { useState } from 'react';
import { StyleSheet, Text, View , SafeAreaView, Button} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import {api_url} from "../consts/api_url";
import {foods, foodSubCategories} from "../consts/foods";
import {SelectList} from 'react-native-dropdown-select-list'
import {TouchableOpacity} from "react-native-web";


const Analytics_FilterScreen = ({ navigation }) => {

    const [category, setCategory] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");
    const [graph, setGraph] = React.useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");

    const categories = foods
    const subCategories = foodSubCategories
    const graphs = [
        {key: "LI", value: "Line Graph"},
        {key: "PI", value: "Pie Graph"}
    ]

    const handlePress = () => {
        navigation.navigate('AnalyticsLine', {
            category: selectedCategory,
            subcategory: selectedSubCategory
        });
    };


    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Graph Filters</Text>
            </View>
            <View style={{paddingHorizontal: 10, paddingTop: 20}}>
                <SelectList
                    setSelected={(selected) => {
                        setGraph(selected);
                        const selectedGraph = graphs.find(item => item.key === selected);
                        console.log("Selected graph:", selectedGraph.value);
                    }}
                    data={graphs}
                    placeholder={"Select Graph Type"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                />
                <SelectList
                    setSelected={(selected) => {
                        setSelectedCategory(selected);
                        console.log("Selected category:", selected);
                    }}
                    data={categories}
                    placeholder={"Select Category"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                />

                <SelectList
                    setSelected={(selected) => {

                        const selectedCategoryObj = subCategories[selectedCategory].find(item => item.key === selected);
                        setSelectedSubCategory(selectedCategoryObj.value);
                        console.log("Selected subcategory:", selectedCategoryObj.value);
                    }}
                    data={subCategories[selectedCategory]}
                    placeholder={`Select value`}
                />
            </View>
            <View>
                <Button title="Go to Second Screen" onPress={handlePress} />
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
    button: {
        backgroundColor: COLORS.primary,
        padding: 10,
        borderRadius: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    }
});