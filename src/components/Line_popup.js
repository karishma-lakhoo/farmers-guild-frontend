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
import COLORS from "../consts/colors";

const WIDTH = Dimensions.get('window').width;
const HEIGHT_popup = 200;
const url = api_url + '/garden/';

const Line_popup = (props) => {
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
        height: HEIGHT_popup + 80,
        paddingTop: 20,
        backgroundColor: '#D3D3D3',
        borderRadius: 50,
        paddingLeft: 30,
        width: WIDTH -80,
    },
    input : {
        borderRadius: 100,
        paddingVertical: 10,
        width: '80%',
        backgroundColor: '#fff',
        marginVertical: 25,
        marginHorizontal: 15,
        textAlign: 'center',

    },
    submitButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        padding: 10,
        marginRight: 30,
        justifyContent: 'center',
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
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
        marginVertical: 25,
        left: '25%',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        borderRadius: 10,
    },
});

export { Line_popup };