import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet, Pressable, Modal} from 'react-native';
import axios from 'axios';
import {MyContext} from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api_url} from "../consts/api_url";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import {SecondaryButton} from "../consts/button";

// const url = api_url  + "/invites/";

const NotificationScreen = ({navigation}) => {
    const [invites, setInvites] = useState([]);
    const [token, setToken] = useState('');
    const [myUsername, setMyUsername] = useState('');
    useEffect(() => {
        const getUsername = async () => {
            try {
                const value = await AsyncStorage.getItem('username');
                if (value !== null) {
                    setMyUsername(value);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        getUsername();
    }, []);

    const filteredInfo = invites.filter(item => item.receiver_detail.username === myUsername);



    useEffect(() => {
        // Function to retrieve the token from AsyncStorage
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    // Construct the authorization headers
                    const headers = {
                        'Authorization': `Bearer ${value}`
                    };
                    // Make an API request to fetch invites data
                    fetch(url, { headers })
                        .then(response => response.json())
                        .then(data => {
                            // Store the response data in the invites state variable
                            setInvites(data);
                        })
                        .catch(error => console.log(error));
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };

        // Call the getToken function on initial render
        getToken();
    }, []);


    const LogCard = ({item}) => {
        return (
            <View style={styles.LogCard}>
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    { invites &&
                        <>
                            {/* Display the garden name and sender username */}
                            <Text style={{fontWeight: 'bold', fontSize: 15, marginTop:10 ,marginLeft:-15}}> {item.garden_detail.name} by {item.sender_detail.username}</Text>
                            {/* Uncomment the lines below if needed */}
                            {/*<Text style={{fontWeight: 'bold', fontSize: 16}}>*/}
                            {/*  {item?.plants_in_garden?.food?.id ?? "No food id found"}*/}
                            {/*</Text>*/}
                            {/*<Text style={{fontWeight: 'bold', fontSize: 13, marginLeft:-15}}>*/}
                            {/*  {item?.garden_detail?.name ?? "No garden found"}*/}
                            {/*</Text>*/}
                        </>
                    }
                    {/* Display the receiver username */}
                    <Text style={{ fontSize: 13, color: 'grey'}}>{item.receiver_detail.username}</Text>
                </View>
                {/* Accept button */}
                <View style={{ marginBottom: 50, right: 85}}>
                    <Pressable style={styles.actionBtn} onPress={() => handleAccept(item.garden_detail.id)}>
                        <Text style={styles.actionBtnText}>Accept</Text>
                    </Pressable>
                </View>
                {/* Decline button */}
                <View style={{ marginBottom: 50, right: 0}}>
                    <Pressable
                        style={styles.actionBtn2}
                        onPress={() => {
                            console.log("Decline pressed");
                            // console.log(item);
                        }}>
                        <Text style={styles.actionBtnText}>Decline</Text>
                    </Pressable>
                </View>
            </View>
        );
    };


    // const renderItem = ({ item }) => (
    //     <View style={styles.inviteContainer}>
    //         <Text style={styles.inviteText}>You have been invited to {item.garden_detail.name} by {item.sender_detail.username}</Text>
    //         <SecondaryButton style={styles.acceptButton}>Accept</SecondaryButton>
    //         <SecondaryButton style={styles.declineButton}>Decline</SecondaryButton>
    //     </View>
    // );

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')} testID="material-icons"/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Invites</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80 }}
                data={filteredInfo}
                renderItem={({ item }) => <LogCard item={item} />}
            />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    inviteContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inviteText: {
        fontSize: 16
    },
    acceptButton: {
        backgroundColor: COLORS.secondary,
        marginLeft: 10
    },
    declineButton: {
        backgroundColor: COLORS.dark,
        marginLeft: 10
    },
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop:20,
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
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 8, // This is for Android
    },
    actionBtn: {
        height: 50,
        width: 80,
        backgroundColor: '#5DBB63',
        marginBottom: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 0,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    actionBtn2: {
        height: 50,
        width: 80,
        backgroundColor: 'red',
        marginBottom: 10,
        borderRadius: 10,
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
        marginBottom: 3,
        marginLeft: 18,
        fontWeight: "bold",
        fontSize: 11,
        color: 'white',
    },
});

export default NotificationScreen;