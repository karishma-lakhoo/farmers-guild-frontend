import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

import {IStackScreenProps} from "../../src/library/StackScreenProps"

const LoginScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp} = props;

    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default LoginScreen;
