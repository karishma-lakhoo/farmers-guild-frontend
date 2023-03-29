import {SafeAreaView, Text, Button, StyleSheet, View, Image, Alert} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import foods from "../consts/foods";

const GARDEN_OPTIONS = [
    {
        item: 'All Gardens',
        id: 'AG',
    },
    {
        item: 'Shellyrishma',
        id: 'SRM',
    },
    {
        item: 'Garden 1',
        id: 'G1',
    },
    {
        item: 'Garden 2',
        id: 'G2',
    },
]

const FILTER_OPTIONS = [
    {
        item: 'Newest to Oldest',
        id: 'NO',
    },
    {
        item: 'Oldest to Newest',
        id: 'ON',
    },
]

const LogScreen = ({navigation}) => {

    const [selectedTeam1, setSelectedTeam1] = useState({})
    const [selectedTeam2, setSelectedTeam2] = useState({})
    const [data, setData] = useState([{title:"first title"}])

    useEffect(() => {
        fetch('https://0ef1-102-219-180-122.eu.ngrok.io/api/harvest_log/', {
            method: "GET"
        })

            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setData(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, []);

    // const { navigation, route, nameProp} = props;
    const LogCard = ({item}) =>{
        return (
            <View style={styles.LogCard}>
            {/*<Image source={item.image} style={{height: 60,width: 60 }}/>*/}
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.food}</Text>
                    <Text style={{ fontSize: 13, color: 'grey'}}>{item.weight} grams</Text>
                    <Text style={{color: 'grey', fontSize: 13}}>{item.datetime}</Text>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Plants')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Harvest Log</Text>
            </View>
            <View style={styles.SelectBox}>
                <SelectBox
                    label="Select garden"
                    options={GARDEN_OPTIONS}
                    value={selectedTeam1}
                    onChange={onChange1()}
                    hideInputFilter={false}
                />
                </View>
                <View style={styles.SelectBox}>
                    <SelectBox
                        label="Time"
                        options={FILTER_OPTIONS}
                        value={selectedTeam2}
                        onChange={onChange2()}
                        hideInputFilter={false}
                    />
                </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {data}
                renderItem = {({item})=><LogCard item = {item}/>}
            />
        </SafeAreaView>
    )
    function onChange1() {
        return (val) => setSelectedTeam1(val)
    }
    function onChange2() {
        return (val) => setSelectedTeam2(val)
    }
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
        elevation: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    SelectBox: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 30,
    }
});

export default LogScreen;
