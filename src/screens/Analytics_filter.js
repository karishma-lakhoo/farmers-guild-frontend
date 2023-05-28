import React, { useState } from 'react';
import {StyleSheet, Text, View, SafeAreaView, Button, Pressable} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import COLORS from "../consts/colors";
import {api_url} from "../consts/api_url";
import {foods, foodSubCategories, foodSubCategoriesLine, foodSubCategoriesPie} from "../consts/foods";
import {SelectList} from 'react-native-dropdown-select-list'
import {TouchableOpacity} from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Picker} from "@react-native-picker/picker";


const Analytics_FilterScreen = ({ navigation }) => {
    const [firstYear, setFirstYear] = useState(2010)
    const n_years = (2023-firstYear) + 1
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedYear2, setSelectedYear2] = useState(null);
    const years1 = Array.from({ length: n_years }, (_, i) => (2023 - i).toString()); // generates an array of 100 years, from "2023" to "1924"
    const years2 = Array.from({ length: years1.indexOf(selectedYear)+1 }, (_, j) => (2023 - j).toString()); // generates an array of years, from "2023" down to the selected year as a string


    const renderPickerItems1 = () => {
        return years1.map(year => (
            <Picker.Item key={year} label={year.toString()} value={year} />
        ));
    };
    const renderPickerItems2 = () => {
        return years2.map(year => (
            <Picker.Item key={year} label={year.toString()} value={year} />
        ));
    };
    const [category, setCategory] = React.useState("");
    const [subCategory, setSubCategory] = React.useState("");
    const [graph, setGraph] = React.useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    const [subCategories, setSubCategories] = useState(foodSubCategoriesLine); // initialize subCategories to foodSubCategoriesLine

    const categories = foods
    const graphs = [
        {key: "Line Graph", value: "Line Graph"},
        {key: "Pie Graph", value: "Pie Chart"}
    ]

    const handlePress = () => {
        // console.log(graph)
        if(graph === "Pie Graph"){
            navigation.navigate('AnalyticsPie', {
                category: selectedCategory,
                subcategory: selectedSubCategory,
                start_date: selectedYear,
                end_date: selectedYear2
            });
        }
        if(graph === "Line Graph") {
            navigation.navigate('AnalyticsLine', {
                category: selectedCategory,
                subcategory: selectedSubCategory,
                start_date: selectedYear,
                end_date: selectedYear2
            });
        }
    };

    const handleGraphSelection = (selected) => {
        setGraph(selected);
        const selectedGraph = graphs.find(item => item.key === selected);
        if(selectedGraph.value === "Pie Chart") {
            setSubCategories(foodSubCategoriesPie); // update subCategories to foodSubCategoriesPie
            // console.log(subCategories);
        } else {
            setSubCategories(foodSubCategoriesPie); // set subCategories back to foodSubCategoriesLine
        }
        // console.log("Selected graph:", selectedGraph.value);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Graph Filters</Text>
            </View>
            <View style={{paddingHorizontal: 10, paddingTop: 20}}>
                <Text style = {{marginBottom: 5}}>
                    {`From January:`}
                </Text>
                <SelectList
                    setSelected={(selected) => {
                        setSelectedYear(selected);
                        // console.log("Selected category:", selected);
                    }}
                    data={years1}
                    placeholder={"Start Date"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                    boxStyles={{backgroundColor:"white"}}
                />
                <Text>

                </Text>
                <Text style = {{marginBottom: 5}}>
                    {`To December:`}
                </Text>
                <SelectList
                    setSelected={(selected) => {
                        setSelectedYear2(selected);
                        // console.log("Selected category:", selected);
                    }}
                    data={years2}
                    placeholder={"End Date"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                    boxStyles={{backgroundColor:"white"}}

                />
                <Text>

                </Text>

                <Text style = {{marginBottom: 5}}>
                    {`Graph Type:`}
                </Text>
                <SelectList
                    setSelected={handleGraphSelection}
                    data={graphs}
                    placeholder={"Select Graph Type"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                    boxStyles={{backgroundColor:"white"}}

                />
                <Text>

                </Text>

                <Text style = {{marginBottom: 5}}>
                    {`Category Type:`}
                </Text>
                <SelectList
                    setSelected={(selected) => {
                        setSelectedCategory(selected);
                        // console.log("Selected category:", selected);
                    }}
                    data={categories}
                    placeholder={"Select Category"}
                    // defaultOption={{key: 'SUP', value: 'SuperType'}}
                    boxStyles={{backgroundColor:"white"}}

                />
                <Text>

                </Text>
                <Text>

                </Text>
                {selectedCategory && (
                    <SelectList
                        setSelected={(selected) => {

                            const selectedCategoryObj = subCategories[selectedCategory].find(item => item.key === selected);
                            setSelectedSubCategory(selectedCategoryObj.value);
                            // console.log("Selected subcategory:", selectedCategoryObj.value);
                        }}
                        data={subCategories[selectedCategory]}
                        placeholder={`Select Subcategory`}
                        boxStyles={{backgroundColor:"white"}}

                    />
                )}
            </View>
            <View style={{ padding: 50 }}>
                <Pressable style={styles.button} onPress={handlePress} textStyle={{ color: 'white' }}>
                    <Text style={styles.text}>{`Generate ${graph}`}</Text>
                </Pressable>
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
    picker: {
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
        marginTop: 30,
    },
    dateContainer: {
        height: 50
    },
    dateContainer2: {
        height: 80,
        paddingVertical: 20
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
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 8,
        elevation: 3,
        backgroundColor: COLORS.primary,
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});