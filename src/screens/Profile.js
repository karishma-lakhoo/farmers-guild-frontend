import React, { useState } from "react";
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ScrollView, SafeAreaView} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const images = {
    image1: require('../images/1.png'),
    image2: require('../images/2.png'),
    image3: require('../images/3.png'),
    image4: require('../images/4.png'),
    image5: require('../images/5.png'),
};

const ProfileScreen = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState('image1');
    const [username, setUsername] = useState('JohnDoe');

    const handleImageSelection = (imageKey) => {
        setSelectedImage(imageKey);
    };

    const handleUsernameChange = (newUsername) => {
        setUsername(newUsername);
    };

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.container}>
                <View style={styles.head}>
                    <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Harvest')}/>
                    <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Plant</Text>
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
        marginBottom: 10,
    },
    usernameInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
    },
});

export default ProfileScreen;
