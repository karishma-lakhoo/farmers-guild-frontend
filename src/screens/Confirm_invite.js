import {View, Text, Button, StyleSheet, SafeAreaView, ScrollView, Image, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import COLORS from "../consts/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import log from "./Log";
import {SecondaryButton} from "../consts/button";
import {tags as item} from "react-native-svg/src/xml";
import plants from "./Plants";
import {MyContext} from "../../App";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";

//  getting the dimensions of the window
const { width, height } = Dimensions.get('window');
// setting the url
const url = api_url + '/users_in_garden/';

const ConfirmInviteScreen= ({navigation}) => {
    // State variables
    const [data, setData] = useState([{}])
    const [table, setTable] = useState([])
    const [Usertable, setUserTable] = useState([])
    const {myState} = useContext(MyContext);
    const [gardenId, setGardenId] = useState('');
    const [Name_ofGarden, setName_ofGarden] = useState('');
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const [testName, setTestName] = useState('');

    // console.log("adsfasdf")
    // console.log(myState.id)
    // console.log("12345")

    // getting the garden ID from the home screen
    const getGardenId = async () => {
        try {
            const value = await AsyncStorage.getItem('gardenId');
            if (value !== null) {
                setGardenId(value);
            }
        } catch (error) {
            console.log('Error retrieving garden name:', error);
        }
    };

    // getting the userID from the home screen
    const getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null) {
                setUsername(value);
            }
        } catch (error) {
            console.log('Error retrieving user name:', error);
        }
    };


    useEffect(() => {
        getGardenId();
    }, []);

    useEffect(() => {
        getUserId();
    }, []);

    //getting row
    useEffect(() => {
        const fetchGardens = async () => {
          if (!token) {
            return;
          }
      
          const headers = {
            'Authorization': `Bearer ${token}`,
          };
      
          try {
            const response = await fetch(url, {
              method: "GET",
              headers: headers,
            });
            const data = await response.json();
          //  setTable(data);
      
            console.log("These are the gardens:");
            console.log(data);
            console.log("These are the gardens.");



            // Retrieve a particular name of the garden
      const gardenIdToFind = gardenId; 
      const garden = data.find((item) => item.garden === gardenIdToFind);
      if (garden) {
        const gardenName = garden.garden_detail.name;
        console.log("The name of the garden is:", gardenName);
        setName_ofGarden(gardenName);
      } else {
        console.log("Garden not found with ID:", gardenIdToFind);
      }
          } catch (error) {
            console.log(error);
          }
        };
        // Getting the Authorization bearer token from the database
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
        fetchGardens();
      }, []);
    //  POST request to send new invite to the database
    const onInvite = async (harvestWeight) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const body = JSON.stringify({
              //  sender: userId,
                
                receiver: myState.id,
                garden: gardenId,
                
            });
            console.log(body)
            const response = await fetch(api_url + '/invites/', {
                method: 'POST',
                headers: headers,
                body: body,
            });

            if (response.status === 201) {
                // The invite was added successfully, so close the modal
                console.log('yey')
            } else {
                // There was an error adding the invite, so display an error message
                console.error('Error adding user:', response.status);
            }
        } catch (error) {
            // There was an error retrieving the token, so display an error message
            console.error('Error retrieving user:', error);
        }
    };
    //
    // console.log("POST INFO")
    // console.log(gardenId)
    // //console.log(myUser.id)
    // console.log(myState.id)
     //   if (Name_ofGarden.length >0){
    return (
        <SafeAreaView style={{backgroundColor: COLORS.white}}>
            <View style={style.header}>
                {/*back arrow*/}
                <Icon name="arrow-back-ios" size={28} onPress={() => navigation.navigate('Plants')}/>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Confirm</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 120,
                    }}>
                </View>
                <View style={style.details}>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Text style={{marginTop: 10, lineHeight: 40, fontWeight:"bold" ,fontSize: 40, color: COLORS.white,}}>{myState.user}</Text>


                    </View>
                    
                    <Text style={style.detailsText}>Are you sure you would like to invite {myState.username} to your garden?</Text>

                   {/* render() {
                      
                         <Text style={style.detailsText}>
                            {Name_ofGarden.length > 0? <Text>This would allow {myState.username} to make changes to {Name_ofGarden}</Text>: null }
                         </Text>
                            
                            }  */}
                  {/*  <Text style={style.detailsText}>To: {Name_ofGarden}</Text>   */}
                        
                    
                    <View style={{marginTop: 40, marginBottom: 40}}>
                       
                        <SecondaryButton title="Invite user to garden" onPress={() => {
                            
                            onInvite();
                            navigation.navigate('Home');
                        }
                        }/>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
//}
}

const style = StyleSheet.create({
    header: {
        paddingTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: width * 0.05,
    },
    details: {
        paddingHorizontal: width * 0.05,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 50,
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    detailsText: {
        marginTop: 10,
        lineHeight: 22,
        fontSize: 18,
        color: COLORS.white,
    },
});

export default ConfirmInviteScreen;