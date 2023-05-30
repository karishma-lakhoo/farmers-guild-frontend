import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api_url} from "../consts/api_url";
import COLORS from "../consts/colors";
import colors from "../consts/colors";


const url = api_url + '/user/';
// setting images
const images = {
    1: require('../images/1.png'),
    2: require('../images/2.png'),
    3: require('../images/3.png'),
    4: require('../images/4.png'),
    5: require('../images/5.png'),
};

const ProfileScreen = ({ navigation }) => {
    //state variables
    const [selectedImage, setSelectedImage] = useState('');
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [profilePictureID, setProfilePictureID] = useState("")
    const [displayName, setDisplayName] = useState("")
    const [userID, setUserID] = useState("")
    // setting variables
    const handleImageSelection = (imageKey) => {
        setSelectedImage(imageKey);
        setProfilePictureID(imageKey)
    };
    // setting variables

    const handleDisplayNameChange = (newDisplayName) => {
        setDisplayName(newDisplayName);
    };
    // getting username variables

    useEffect(() => {
        const getUsername = async () => {
            try {
                const value = await AsyncStorage.getItem('username');
                if (value !== null) {
                    setUsername(value);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        getUsername();
    }, []);
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
        const fetchData = async () => {
            try {
                // get username, gardens, users to populate dropdowns
                const profilePicture = await AsyncStorage.getItem('profilePicture')
                const displayName = await  AsyncStorage.getItem('displayName')
                const userID = await AsyncStorage.getItem('usernameID');
                setProfilePictureID(profilePicture)
                setSelectedImage( profilePicture.toString())
                setDisplayName(displayName)
                setUserID(userID)
                console.log("asdf " + displayName)
                console.log("asdf " + userID)
            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, []);

    // updating the details

    const updateDetails = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({
                display_name: displayName,
                profile_picture: profilePictureID});

            const response = await fetch(url + userID + "/", {
                method: 'PATCH',
                headers: headers,
                body: body,
            });

            if (response.status === 201 || response.status === 200) {
                // The garden was added successfully, so close the modal
                console.log('yey')
                console.log(response)
            } else {
                // There was an error adding the garden, so display an error message
                console.error('Error updating details:', response.status);
            }
        } catch (error) {
            // There was an error retrieving the token, so display an error message
            console.error('Error :', error);
        }
    };



    // the rendering of the page

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10}}>Edit Profile</Text>
                </View>
                <Text style={styles.username}>{username}</Text>
                <View style={styles.profile}>
                    <Text style={styles.title}>Choose Profile Picture</Text>
                    <Image source={images[selectedImage]} style={styles.profileImage} />

                    <ScrollView
                        horizontal
                        contentContainerStyle={styles.imageSelectionContainer}
                    >
                        {Object.keys(images).map((key) => (
                            <TouchableOpacity
                                key={key}
                                style={styles.imageSelectionButton}
                                onPress={() => handleImageSelection(key)}
                            >
                                <Image source={images[key]} style={styles.selectionImage} />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                    <Text style={styles.leftAlign}>Change Display Name</Text>
                    <TextInput
                        style={styles.usernameInput}
                        onChangeText={handleDisplayNameChange}
                        value={displayName}
                    />

                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={updateDetails}
                    >
                        <Text style={styles.updateButtonText}>Update Details</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.logOutButton}
                        onPress={() => {
                            navigation.navigate("Login")
                        }}
                    >
                        <Text style={styles.updateButtonText}>Log Out</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    head: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,

    },
    profile: {
        alignItems: 'center',
    },
    description: {
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 75,
        marginBottom: 20,
    },
    imageSelectionContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    imageSelectionButton: {
        margin: 5,
    },
    leftAlign: {
        textAlign: 'left',
        marginLeft: -185,
        paddingBottom:10,
        fontWeight: "bold"
    },
    selectionImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        textAlign:'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: -20,
        color:COLORS.primary
    },
    usernameInput: {
        width: '90%',
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
        backgroundColor: COLORS.light
    },

    updateButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 15,
        width: '60%',
        padding: 15,
        alignItems:'center',
        borderRadius: 25,
    },
    logOutButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginTop: 20,
        width: '60%',
        padding: 15,
        alignItems:'center',
        borderRadius: 25,
    },
    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },


});

export default ProfileScreen;
