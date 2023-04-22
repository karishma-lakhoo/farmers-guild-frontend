import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import LoginScreen from "./src/screens/Login";
import LogScreen from "./src/screens/Log";
import SignUpScreen from "./src/screens/SignUp";
import PlantsScreen from "./src/screens/Plants";
import HarvestScreen from "./src/screens/Harvest";
import React, { createContext, useState} from "react";
import PlantDetailsScreen from "./src/screens/PlantDetails";
import BottomNavigator from "./src/navigation/BottomNavigator";
import SplashScreen from "./src/screens/SplashScreen";
import HarvestWeightScreen from "./src/screens/HarvestWeight";
const Stack = createStackNavigator();

export const MyContext = createContext();
export default function App() {
    const [myState, setMyState] = useState('');

    return (
        <MyContext.Provider value={{ myState, setMyState }}>
            <NavigationContainer>
                <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
                <Stack.Navigator screenOptions={{headerShown: false}} initalRouteName={"Login"}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={LoginScreen}/>
                    <Stack.Screen name="Home" component={BottomNavigator}/>
                    <Stack.Screen name="Log" component={LogScreen}/>
                    <Stack.Screen name="PlantDetails" component={PlantDetailsScreen}/>
                    <Stack.Screen name="HarvestWeight" component={HarvestWeightScreen}/>
                    <Stack.Screen name="Plants" component={PlantsScreen}/>
                    <Stack.Screen name="SignUp" component={SignUpScreen}/>
                    <Stack.Screen name="Harvest" component={HarvestScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </MyContext.Provider>
    );
}