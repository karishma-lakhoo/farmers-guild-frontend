import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Dimensions,
    TextInput,
} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {api_url} from "../consts/api_url";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_popup = 200;
const url = api_url + '/garden/';

const Home_popup = (props) => {
    const [gardenName, setGardenName] = useState('');

    const [token, setToken] = useState('');

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


    const closeModal = (bool, data, bool2) => {
        props.changeModalVisible(bool);
        props.setData(data);
        props.changeAddGardenPopupVisible(bool2);
    };

    const handlePressSubmit = () => {
        handleAddGarden(gardenName);
    };

    const handleAddGarden = async (gardenName) => {
        // add garden to database
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify({ name: gardenName }),
        });
        const data = await response.json();

        // fetch updated garden data
        props.fetchGardens();

        // close popup
        props.changeAddGardenPopupVisible(false);
    };

    return (
        <TouchableOpacity disabled={true} style={styles.container}>
            <View style={styles.popup}>
                <TextInput
                    style={styles.input}
                    onChangeText={setGardenName}
                    placeholder="Garden Name"
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handlePressSubmit}>
                    <Text style={styles.submitButtonText}>Add Garden</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.touchableOpacity}
                    onPress={() => closeModal(false, "Close", false)}>
                    <Text style={styles.text}>Close</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'brown',
    },
    popup: {
        height: HEIGHT_popup,
        paddingTop: 20,
        backgroundColor: '#D3D3D3',
        borderRadius: 50,
        paddingLeft: 30,
        width: WIDTH - 80,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    submitButton: {
        backgroundColor: '#008CBA',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    text: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    touchableOpacity: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        top: 70,
        left: '25%',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 50,
    },
});

export { Home_popup };