import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import log from "./Log";
import {SecondaryButton} from "../consts/button";
import {tags as item} from "react-native-svg/src/xml";
import plants from "./Plants";
import {MyContext} from "../../App";


const PlantDetailsScreen= ({navigation}) => {
    const [data, setData] = useState([{}])
    const { myState } = useContext(MyContext);


    const onPlantPressed = () => {
        fetch('https://7e0c-102-219-180-122.eu.ngrok.io/api/plants_in_garden/', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "food": myState.id,
                "garden": myState.garden,
            })
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setData(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }

    useEffect(() => {
        fetch('https://7e0c-102-219-180-122.eu.ngrok.io/api/food/', {
            method: "GET"
        })

            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setData(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, []);


    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={style.header}>
                <Icon name="arrow-back-ios" size={28} onPress={() => navigation.navigate('Plants')} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Details</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                        <Text
                            style={{fontSize: 25, fontWeight: 'bold', color: COLORS.white}}>
                            {item.name}
                        </Text>

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
                    <Text style={style.detailsText}>Current state: {myState.food}</Text>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                        {/*do a post request here*/}
                        <SecondaryButton title="Plant It" onPress={() => {
                            onPlantPressed();
                            navigation.navigate('Harvest');
                        }
                            } />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    details: {
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 60,
        backgroundColor: COLORS.primary,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
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

export default PlantDetailsScreen;