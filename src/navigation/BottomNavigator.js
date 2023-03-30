import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import colors from '../consts/colors';
import {View} from 'react-native';
import HomeScreen from "../screens/Home";
import LogScreen from "../screens/Log";
const Tab = createBottomTabNavigator();
const BottomNavigator = () => {
    return <Tab.Navigator screenOptions={{
        style: {
            height: 55,
            borderTopWidth: 0,
            elevation: 0,
        },
        headerShown: false, tabBarActiveTintColor: colors.primary }} >
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: ({color}) => (
                <Icon name="home-filled" color={color} size={28}/>
            ),
        }}/>
        <Tab.Screen name="Log" component={LogScreen} options={{
            tabBarIcon: ({color}) => (
                <Icon name="list" color={color} size={28}/>
            ),
        }}/>

    </Tab.Navigator>
}

export default BottomNavigator;