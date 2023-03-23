import { SafeAreaView, Text, Button, StyleSheet, View, Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {IStackScreenProps} from "../../src/library/StackScreenProps"
import foods from "../consts/foods";

const LogScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp} = props;
    const LogCard = ({item}) =>{
        return (
            <View style={styles.LogCard}>
            <Image source={item.image} style={{height: 60,width: 60 }}/>
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey'}}>{item.weight}</Text>
                    <Text style={{color: 'grey', fontSize: 13}}>{item.Date_harvested}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Harvest Log</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {foods}
                renderItem = {({item})=><LogCard item = {item}/>}
            />
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
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    LogCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

export default LogScreen;
