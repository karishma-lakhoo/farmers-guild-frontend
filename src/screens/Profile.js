import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api_url} from "../consts/api_url";
import COLORS from "../consts/colors";


const url = api_url + '/user/';

const images = {
    image1: require('../images/1.png'),
    image2: require('../images/2.png'),
    image3: require('../images/3.png'),
    image4: require('../images/4.png'),
    image5: require('../images/5.png'),
};

const ProfileScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState('image1');
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [data, setData] = useState([]);
    const [profilePictureID, setProfilePictureID] = useState("")
    const handleImageSelection = (imageKey) => {
        setSelectedImage(imageKey);
    };

    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
    };

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
        const fetchData = async () => {
            try {
                // get username, gardens, users to populate dropdowns
                const profilePicture = await AsyncStorage.getItem('profilePicture')
                setProfilePictureID(profilePicture)
                setSelectedImage("image" + profilePicture.toString())

            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, []);

    const updateUsername = async () => {
        try {
            const userId = await AsyncStorage.getItem('user_id');
            const updatedUser = {
                username: username,
            };

            const response = await fetch(url + userId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });

            if (response.ok) {
                console.log('Username updated successfully');
                // Handle successful update
            } else {
                console.log('Username update failed');
                // Handle failed update
            }
        } catch (error) {
            console.error('Error updating username:', error);
            // Handle error
        }
    };






    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Icon name="arrow-back-ios" size={28} onPress={() => navigation.navigate('Harvest')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Profile</Text>
                </View>

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

                    <Text style={styles.username}>{username}</Text>

                    <TextInput
                        style={styles.usernameInput}
                        onChangeText={handleUsernameChange}
                        value={username}
                    />

                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={updateUsername}
                    >
                        <Text style={styles.updateButtonText}>Update Username</Text>
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
        backgroundColor: '#fff',
        // alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginBottom: 20,

    },
    profile: {
        alignItems: 'center',
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
    selectionImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    usernameInput: {
        width: 200,
        height: 40,
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
    },
    updateButton: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },

    updateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
