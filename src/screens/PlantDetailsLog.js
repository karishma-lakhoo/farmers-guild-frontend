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
import types from "../consts/types";
const url = api_url + '/plants_in_garden/';
const { width, height } = Dimensions.get('window');


const PlantDetailsLogScreen= ({navigation}) => {
    // state variables
    const [data, setData] = useState([{}])
    // getting the data from the Log page
    const {myState} = useContext(MyContext);
    const type = types.find((item) => item.name === myState.type);

    // renders the plant details log screen
    return (
        <SafeAreaView>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
            </View>
            <View style={{ alignItems: 'center', top: 0 }}>
                <Image
                    source={type?.image} // Use the image from the matched type object
                    style={{ height: 170, width: 170, marginBottom: 20 }}
                />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{marginTop: 10, lineHeight: 40, fontWeight:"bold" ,fontSize: 40, color: COLORS.white,}}>{myState.food}</Text>


                    </View>
                    {/*display all the plant information here*/}
                    {/*<Text style={style.detailsText}>*/}
                    {/*    Lets Talk About SuvGay. This is the Gayest person you would know. He is mad in his head*/}
                    {/*    and talks at night in sleep with her gay people. Just to let you know if u see this guys just avoid him or he might*/}
                    {/*    end up giving u kisses. Keep your children away from him and yourself. As they say in planes*/}
                    {/*    help yourself before helping others.*/}
                    {/*</Text>*/}
                    <Text style={style.detailsText}>Name: {myState.food}</Text>
                    <Text style={style.detailsText}>Sow: {myState.sow}</Text>
                    <Text style={style.detailsText}>Plant Season: {myState.plant}</Text>
                    <Text style={style.detailsText}>Harvest Season: {myState.harvest_info}</Text>
                    <Text style={style.detailsText}>Sun: {myState.sun}</Text>
                    <Text style={style.detailsText}>pH: {myState.ph}</Text>
                    <Text style={style.detailsText}>Subtype: {myState.subtype}</Text>
                    <Text style={style.detailsText}>Type: {myState.type}</Text>
                    <Text style={style.detailsText}>Supertype: {myState.supertype}</Text>
                    <Text style={style.detailsText}>Description: {myState.description}</Text>
                    <Text style={style.detailsText}>Current state: {myState.food}</Text>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        paddingVertical: height * 0.03,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.05,
    },
    details: {
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.02,
        paddingBottom: height * 0.15,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: width * 0.1,
        borderTopLeftRadius: width * 0.1,
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 16,
        color: COLORS.white,
    },
});

export default PlantDetailsLogScreen;