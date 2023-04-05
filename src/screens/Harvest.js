import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";
import {Harvest_popup} from "../components/HarvestPopup.js"
import colors from "../consts/colors"
import { MyContext } from "../../App";
import axios from "axios";
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';

//we need to get all the plants_in_garden for shellyrishma only - have to change views to allow for filters
const url = api_url + '/plants_in_garden/';
const HarvestScreen = ({navigation}) => {
    const[isHarvestPopupVisible,setIsHarvestPopupVisible] = useState(false);
    const [harvestName, setHarvestName] = useState('');
    const [chooseData,setChooseData] = useState();
    const [info, setInfo] = useState([])
    const [token, setToken] = useState('');
    const {myState, setMyState} = useContext(MyContext);

    const fetchData = () => {
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        axios
            .get(url, {headers})
            .then((response) => {
                setInfo(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

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
        fetchData();
    }, [token]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
        return unsubscribe;
    }, [navigation]);
    // useEffect(() => {
    //     const getToken = async () => {
    //         try {
    //             const value = await AsyncStorage.getItem('token');
    //             if (value !== null) {
    //                 setToken(value);
    //             }
    //         } catch (error) {
    //             console.log('Error retrieving data:', error);
    //         }
    //     };
    //     getToken();
    // }, []);
    //
    // useEffect(() => {
    //     if (!token) {
    //         return;
    //     }
    //
    //     const headers = {
    //         'Authorization': `Bearer ${token}`,
    //     };
    //
    //     fetch(url, {
    //         method: "GET",
    //         headers: headers
    //     })
    //         .then(resp => resp.json())
    //         .then(info => {
    //             console.log(info);
    //             setInfo(info); // update the data state variable with the API response
    //         })
    //         .catch(error => console.log("error"))
    // }, [token]);


    const changeHarvestPopupVisible = (bool, plant) => {
        setIsHarvestPopupVisible(bool);
        console.log(plant)

    }

    const setData = (data) => {
        setChooseData(data);            //can be used to obtain info from popup
    }


    // const [modalVisible, setModalVisible] = useState(false); // state variable for modal visibility

    const LogCard = ({item}) =>{
        return (
            <View style={styles.LogCard}>
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    { info &&
                        <>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                {item?.food_detail?.food ?? "No food found"}
                            </Text>
                            {/*<Text style={{fontWeight: 'bold', fontSize: 16}}>*/}
                            {/*    {item?.plants_in_garden?.food?.id ?? "No food id found"}*/}
                            {/*</Text>*/}
                            <Text style={{fontWeight: 'grey', fontSize: 13}}>
                                {item?.garden_detail?.name ?? "No garden found"}
                            </Text>
                        </>
                    }

                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.id}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.food.id}</Text>
                    {/*<Text style={{ fontSize: 13, color: 'grey'}}>{item.garden.name}</Text>*/}
                </View>
                <View style={{position: 'absolute', top: 0, right: 0}}>
                    <Pressable
                        style={styles.actionBtn}
                        onPress={() => {navigation.navigate('HarvestWeight'); setMyState(item);}
                            }>
                        <Text style={styles.actionBtnText}>Harvest</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Harvest Plants</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Plants')}  style={Btn.container}>
                <Text style={Btn.text}> Add Plants </Text>
            </Pressable>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {info}
                renderItem = {({item}) => <LogCard item = {item}/>}/>

            <Modal
                transparent = {true}
                animationType = 'fade'
                visible = {isHarvestPopupVisible}
                nRequestClose = {() => changeHarvestPopupVisible(false, null)}>

                <Harvest_popup
                    changeHarvestPopupVisible = {changeHarvestPopupVisible}
                    setData = {setData}/>

            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
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
    LogCard: {
        height: 100,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 8, // This is for Android
    },
    actionBtn: {
        height: 100,
        width: 130,
        backgroundColor: '#5DBB63',
        marginBottom: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 0,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    actionBtnText:{
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',
    },

});
const Btn = StyleSheet.create({
    container : {
        backgroundColor: colors.primary,
        width: '90%',
        padding: 15,
        marginLeft: 20,
        marginVertical: 15,
        alignItems:'center',
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});


export default HarvestScreen;