import React, {useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

export default function SplashScreen({navigation}) {
    useEffect(() => {
        const timeout = setTimeout(() => {
            navigation.navigate('Home');
        }, 3000);

        return () => clearTimeout(timeout);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <LottieView
                source={require('../images/lf20_sgn7zslb.json')}
                autoPlay
                loop
                style={styles.animation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    animation: {
        width: 200,
        height: 200,
    },
});