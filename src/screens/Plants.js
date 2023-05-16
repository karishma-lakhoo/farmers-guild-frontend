import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions, TouchableHighlight
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import COLORS from '../consts/colors'
import Icon from "react-native-vector-icons/MaterialIcons";
import {FlatList, TextInput} from "react-native-gesture-handler";
import categories from "../consts/categories";
import foods from "../consts/foods";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MyContext} from "../../App";
const {width} = Dimensions.get("screen");
const cardWidth = width/2-20;
const url = api_url + '/food/';

const PlantsScreen = ({navigation}) => {
    const [selectedCategoryIndex,setSelectedCategoryIndex] = React.useState(0);
    const {myState, setMyState} = useContext(MyContext);
    const [data, setData] = useState([])
    const [token, setToken] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    setToken(value);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        getToken();
    }, []);

    useEffect(() => {
        if (!token) {
            return;
        }

        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setData(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, [token]);


    const ListCategories = () => {
        return(
            <ScrollView horizontal showHorizontalScrollIndicator={false} contentContainerStyle={styles.categoriesListContainer}>
                {categories.map((category,index) => (
                    <TouchableOpacity key={index} activeOpacity={0.8} onPress={() =>{handleSearch2(category.name); setSelectedCategoryIndex(index);}} >
                        <View style ={{
                            backgroundColor:
                                selectedCategoryIndex === index
                                    ? COLORS.primary
                                    :COLORS.secondary,
                            ...styles.categoryBtn
                        }}>
                            <View style={styles.categoryBtnImgCon}>
                                <Image source={category.image} style={{height:27,width:27,resizeMode:'cover'}}/>
                            </View>
                            <Text style={{
                                fontSize:10,
                                fontWeight:'bold',
                                marginLeft:10,
                                color:selectedCategoryIndex === index? COLORS.white:COLORS.primary}}>{category.name}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        )
    }

    const Card = ({food}) =>{
        return(
            <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => {
                setMyState(food);
                navigation.navigate('PlantDetails')
            }}>
                <View style={styles.card}>
                    <View style={{alignItems:'center', top:-40}}>
                        {/*<Image source={food.image} style={{height:120, width:120}}/>*/}
                    </View>
                    <View style={{marginHorizontal:20}}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginTop:10}}>{food.food}</Text>
                        <Text style={{fontSize:13, color:COLORS.grey}}>{food.supertype}</Text>

                    </View>
                    <View style={styles.plantAt}>
                        <Icon name="add" size={20} color={COLORS.white}/>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }

    const handleSearch = text => {
        setSearchText(text);
        const filtered = data.filter(
            item =>
                item.food.toLowerCase().includes(text.toLowerCase()) ||
                item.supertype.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleSearch2 = text => {
        setSearchText(text);
        const filtered = data.filter(
            item =>
                item.supertype.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.head}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Harvest')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Plant</Text>
            </View>
            <View style={styles.header}>
                <View>
                    <Text style={{marginTop:5,marginLeft: 25, fontSize:22,color:COLORS.grey}}>What do you want to plant today?</Text>
                </View>
            </View>
            <View style={{marginTop:40,flexDirection:'row',paddingHorizontal:20}}>
                <View style={styles.inputContainer}>
                    <Icon name="search" size={28} style={{width: 28}} />
                    <TextInput
                        style={{flex: null, width: '100%', fontSize: 18}}
                        placeholder="Search for Plant"
                        onChangeText={text => handleSearch(text)}
                        value={searchText}
                    />
                </View>
            </View>
            <View>
                <ListCategories
                    value = {searchText}
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={searchText !== '' ? filteredData : data}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Card food={item} />}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    head: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor:  COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 8, // This is for Android
    },
    plantAt:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

});

export default PlantsScreen;