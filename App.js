import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator} from "@react-navigation/stack";
import 'react-native-gesture-handler';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/screens/Home";
import AddGardenScreen from "./src/screens/AddGarden";
import LoginScreen from "./src/screens/Login";
import LogScreen from "./src/screens/Log";
import SignUpScreen from "./src/screens/SignUp";
import PlantsScreen from "./src/screens/Plants";
import React from "react";
import PlantDetailsScreen from "./src/screens/PlantDetails";
import BottomNavigator from "./src/navigation/BottomNavigator";

const Stack = createStackNavigator();


export default function App() {
  return (
      <NavigationContainer>
          <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
          <Stack.Navigator screenOptions={{headerShown: false}} initalRouteName={"Login"}>
              <Stack.Screen name="Home" component={BottomNavigator}/>
              <Stack.Screen name="Login" component={LoginScreen}/>
              <Stack.Screen name="AddGarden" component={AddGardenScreen}/>
              <Stack.Screen name="Log" component={LogScreen}/>
              <Stack.Screen name="PlantDetails" component={PlantDetailsScreen}/>
              <Stack.Screen name="Plants" component={PlantsScreen}/>
              <Stack.Screen name="SignUp" component={SignUpScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}



