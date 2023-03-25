import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image} from 'react-native';
import React from 'react';


import {IStackScreenProps} from "../../src/library/StackScreenProps"
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import log from "./Log";
import {SecondaryButton} from "../consts/button";
import {tags as item} from "react-native-svg/src/xml";
import plants from "./Plants";

const PlantDetsScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp} = props;
    const plant = route.params;


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
                        <View style={style.iconContainer}>
                            <Icon name="favorite-border" color={COLORS.primary} size={25} />
                        </View>
                    </View>
                    <Text style={style.detailsText}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text
                        ever since the 1500s, when an unknown printer took a galley of type
                        and scrambled it to make a type specimen book. It has survived not
                        only five centuries.
                    </Text>
                    <View style={{marginTop: 40, marginBottom: 40}}>
                        <SecondaryButton title="Plant It" />
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

export default PlantDetsScreen;