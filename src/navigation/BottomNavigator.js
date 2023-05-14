import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContainer} from '@react-navigation/native';
import colors from '../consts/colors';
import {View} from 'react-native';
import HomeScreen from "../screens/Home";
import LogScreen from "../screens/Log";
import Analytics_filter from "../screens/Analytics_filter";
import Analytics_FilterScreen from "../screens/Analytics_filter";
import NotificationScreen from "../screens/notifications";
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
        <Tab.Screen name="Analytics" component={Analytics_FilterScreen} options={{
            tabBarIcon: ({color}) => (
                <Icon name="timeline" color={color} size={28}/>
            ),
        }}/>
        <Tab.Screen name="Notifications" component={NotificationScreen} options={{
            tabBarIcon: ({color}) => (
                <Icon name="notifications" color={color} size={28}/>
            ),
        }}/>

    </Tab.Navigator>
}

export default BottomNavigator;