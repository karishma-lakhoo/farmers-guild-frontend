import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import log from "./Log";
import {SecondaryButton} from "../consts/button";
import {tags as item} from "react-native-svg/src/xml";
import plants from "./Plants";
import {MyContext} from "../../App";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
const url = api_url + '/harvest_log/analytics/';
const { width, height } = Dimensions.get('window');
import {FlatList} from 'react-native-gesture-handler';


const TestScreen= ({navigation}) => {
    const [data, setData] = useState([{}])
    const {myState} = useContext(MyContext);
    const [gardenId, setGardenId] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    setToken(value);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
                console.log()
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




    const LogCard = ({item}) =>{
        var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        const month = item?.month;
      //  const day = String(date.getDate()).padStart(2, '0');
     //   const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = item.year;
        const formattedDate = months[month - 1];
        return (
            <View style={styles.LogCard}>
            {/*<Image source={item.image} style={{height: 60,width: 60 }}/>*/}
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 12,
                    flex: 1,
                }}>
                    { data &&
                        <>
                            
                            <Text style={{color: 'grey', fontSize: 13}}>
                                Month is : {formattedDate}
                            </Text>
                            <Text style={{color: 'grey', fontSize: 13}}>
                                Year is : {item?.year}
                            </Text>
                            
                        </>
                    }
                </View>

            </View>
        );
    };



    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={styles.header}>
                <Icon name="arrow-back-ios" size={28} onPress={() => navigation.navigate('Plants')}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {data}
                renderItem = {({item})=> <LogCard item = {item}/>}
            />














         {/*   <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 280,
                    }}>

                </View>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{marginTop: 10, lineHeight: 40, fontWeight:"bold" ,fontSize: 40, color: COLORS.white,}}>{myState.food}</Text>


                    </View> */}


                    {/*display all the plant information here*/}
                    {/*<Text style={style.detailsText}>*/}
                    {/*    Lets Talk About SuvGay. This is the Gayest person you would know. He is mad in his head*/}
                    {/*    and talks at night in sleep with her gay people. Just to let you know if u see this guys just avoid him or he might*/}
                    {/*    end up giving u kisses. Keep your children away from him and yourself. As they say in planes*/}
                    {/*    help yourself before helping others.*/}
                    {/*</Text>*/}
                    {/*<Text style={style.detailsText}>Name: {myState.food}</Text>*/}
                  {/*  <Text style={style.detailsText}>Sow: {myState.sow}</Text>
                    <Text style={style.detailsText}>Plant Season: {myState.plant}</Text>
                    <Text style={style.detailsText}>Harvest Season: {myState.harvest_info}</Text>
                    <Text style={style.detailsText}>Sun: {myState.sun}</Text>
                    <Text style={style.detailsText}>pH: {myState.ph}</Text>
                    <Text style={style.detailsText}>Subtype: {myState.subtype}</Text>
                    <Text style={style.detailsText}>Type: {myState.type}</Text>
                    <Text style={style.detailsText}>Supertype: {myState.supertype}</Text>
                    <Text style={style.detailsText}>Description: {myState.description}</Text>
                    <Text style={style.detailsText}>Current state: {myState.food}</Text>
                    <Text style={style.detailsText}>Current state: {myState.food}</Text>*/}
                  { /* <View style={{marginTop: 40, marginBottom: 40}}> */ }
                        {/*do a post request here*/}
                    {/*    <SecondaryButton title="Plant It" onPress={() => {
                            onAddPlant();
                            navigation.navigate('Home');
                        }
                        }/> 
                    </View> */}
            {/*    </View>
            </ScrollView> */}
        
        </SafeAreaView>


    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
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
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 8, // This is for Android
    },
    SelectBox: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
        marginTop:-10,
    }
});

export default TestScreen;