import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, SafeAreaView, ScrollView, StyleSheet, Pressable, Modal, Image} from 'react-native';
import axios from 'axios';
import {MyContext} from "../../App";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api_url} from "../consts/api_url";
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {SecondaryButton} from "../consts/button";
import { Alert } from 'react-native';
import images from "../consts/profile_images";

// const url = api_url  + "/invites/";

const NotificationScreen = ({navigation}) => {
    const [invites, setInvites] = useState([]);
    const [token, setToken] = useState('');
    const [myUsername, setMyUsername] = useState('');

    // get username from API

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

    // get token from API

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

        fetch(api_url  + "/invites/", {
            method: "GET",
            headers: headers
        })
            .then(resp => resp.json())
            .then(data => {
                // console.log(data);

                setInvites(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, [token]);


    //this is when the request is accepted
    const handleAccept = async (gardenID) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({
                garden: gardenID
            });
            const response = await fetch(api_url + '/users_in_garden/', {
                method: 'POST',
                headers: headers,
                body: body,
            });
            console.log(response.status)
            if (response.status === 201) {
                // The garden was added successfully, so close the modal
                // console.log('yey');

                // Remove the accepted invite from the state
                setInvites((prevInvites) => prevInvites.filter((invite) => invite.garden_detail.id !== gardenID));
            } else {
                // There was an error adding the garden, so display an error message
                console.error('Error adding food:', response.status);
            }
        } catch (error) {
            // There was an error retrieving the token, so display an error message
            console.error('Error retrieving food:', error);
        }
        Alert.alert('Invite Accepted', 'You have accepted the invite.');
    };

    // if the request is denied
    const handleDecline = (inviteId) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        fetch(api_url + '/invites/' + inviteId +"/", {
            method: 'DELETE',
            headers: headers,
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log('Invite declined:', data);
                // Remove the declined invite from the state
                setInvites((prevInvites) => prevInvites.filter((invite) => invite.id !== inviteId));
            })
            .catch((error) => console.log('Error declining invite:', error));

        Alert.alert('Invite Declined', 'You have declined the invite.');
    };

    // log card styling and rendering
    const LogCard = ({ item }) => {
        const { id, garden_detail, sender_detail, receiver_detail } = item;
        const selectedImage = images.find(
            (image) => image.id === item.sender_detail.profile_picture
        );
        return (
            <View style={styles.LogCard}>
                <View
                    style={{
                        height: 100,
                        marginLeft: 20,
                        paddingVertical: 20,
                        flex: 1,
                    }}
                >
                    {filteredInfo.length === 0 ? (
                        <View>
                            <Text>No invites</Text>
                        </View>
                    ) : (
                        <>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 0,
                                    right: 15,
                                }}
                            >
                                <Image
                                    source={selectedImage?.image}
                                    style={{ height: 50, width: 50 }}
                                />
                                <View style={{ marginLeft: 30 }}>
                                    <Text
                                        style={{
                                            fontWeight: 'bold',
                                            fontSize: 18,
                                            marginTop: 8,
                                            marginLeft: -15,
                                        }}
                                    >
                                        {item.garden_detail.name}
                                    </Text>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            marginTop: 0,
                                            marginLeft: -15,
                                        }}
                                    >
                                        From {item.sender_detail.username}
                                    </Text>
                                </View>
                            </View>
                        </>
                    )}
                </View>
                <View style={{ marginBottom: 40, right: 60 }}>
                    <Pressable
                        style={styles.actionBtn}
                        onPress={() => handleAccept(item.garden_detail.id)}
                    >
                        <Text style={styles.actionBtnText}>Accept</Text>
                    </Pressable>
                </View>
                <View style={{ marginBottom: 40, right: 10 }}>
                    <Pressable
                        style={styles.actionBtn2}
                        onPress={() => handleDecline(item.id)}
                    >
                        <FontAwesomeIcon
                            name="times"
                            size={20}
                            color="white"
                            style={styles.crossIcon}
                        />
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{flex: 1 }}>
            <View style={styles.header}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}>
                    Pending Invites
                </Text>
            </View>
            {filteredInfo.length === 0 ? (
                <View style={styles.noInvitesContainer}>
                    <Image
                        source={require('../images/scarecrow.png')}
                        style={styles.noInvitesImage}
                    />
                    <Text style={styles.noInvitesText}>No invites as yet</Text>
                </View>
            ) : (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 80 }}
                    data={filteredInfo}
                    renderItem={({ item }) => <LogCard item={item} />}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inviteContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inviteText: {
        fontSize: 16,
    },
    acceptButton: {
        backgroundColor: COLORS.secondary,
        marginLeft: 10,
    },
    declineButton: {
        backgroundColor: COLORS.dark,
        marginLeft: 10,
    },
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 20,
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
        height: 40,
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
        height: 40,
        width: 40,
        backgroundColor: 'red',
        marginBottom: 10,
        borderRadius: 25,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    crossIcon: {
        alignSelf: 'center',
    },
    actionBtnText: {
        marginBottom: 3,
        marginLeft: 18,
        fontWeight: 'bold',
        fontSize: 11,
        color: 'white',
    },
    noInvitesContainer: {
        flex: 1,
        alignItems: 'center',
        marginTop: 120,
    },
    noInvitesImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginTop: 20
    },
    noInvitesText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
    },
});

export default NotificationScreen;