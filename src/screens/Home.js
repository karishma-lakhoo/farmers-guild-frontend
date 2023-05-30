import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, View, Text, Button, StyleSheet, Modal, TouchableOpacity, Image, Pressable} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Home_popup} from '../components/Home_popup';
import {AddGardenPopup} from '../components/addGardenPopup_Test';
import gardens from '../consts/gardens.js';
import { MyContext} from "../../App";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRoute} from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import COLORS from "../consts/colors";
import home_images from "../consts/home_images";


const url = api_url + '/users_in_garden/';
const HomeScreen = ({navigation}) => {
  // State variables
  const { myUser } = useContext(MyContext);
  const[isModalVisible,setIsModalVisible] = useState(false);
  const { myState, setMyState } = useContext(MyContext);
  const[chooseData,setChooseData] = useState();
  const [info, setInfo] = useState([])
  const [token, setToken] = useState('');
  const route = useRoute();
  const [myUsername, setMyUsername] = useState('');
  const [myUsernameID, setMyUsernameID] = useState('');

  // Getting the username from the Login page
  useEffect(() => {
    const getUsername = async () => {
      try {
        const value = await AsyncStorage.getItem('username');
        if (value !== null) {
          setMyUsername(value);
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    getUsername();
  }, []);
  // console.log("shelly welly is a cutie pie")
  // console.log(username)

  const filteredInfo = info.filter(item => item.user.username === myUsername);

  // store filtered gardens into async storage
  const filteredGardensArray = [{item: "All Gardens", id: "AG"}];
  for (let i=0; i < filteredInfo.length; i++){
    const item = filteredInfo[i];
    const add = {
      item: item.garden_detail.name,
      id: i.toString(),
    }
    filteredGardensArray.push(add)
  }
  // console.log(filteredGardensArray)
  // filteredInfo.forEach(item => filteredGardensArray.push(item.garden_detail.name))
  AsyncStorage.setItem('filteredGardensArray', JSON.stringify(filteredGardensArray))
      .then(() => {
        // console.log('Array stored successfully');
      })
      .catch(error => {
        console.log('Error storing array:', error);
      });

  // console.log("filtered garden array")
  // // console.log(filteredInfo[0].garden_detail.name)
  // console.log(filteredGardensArray)

  // store associated users into async storage
  const filteredUsersArray = [{item: "All Users", id: "AU"}];
  const uniqueUsernames = new Set(); // Set to store unique usernames
  for (let i=0; i < info.length; i++){
    const item = info[i];
    // console.log("teststserfse")
    // console.log(item.garden_detail.name)
    for (let j = 0; j < filteredGardensArray.length; j++){
      if(item.garden_detail.name === filteredGardensArray[j].item){
        const username = item.user.username;
        const usernameID = item.user.id;
        const displayName = item.user.display_name
        // console.log(displayName)
        if (username === myUsername){
          AsyncStorage.setItem('usernameID', item.user.id);
          AsyncStorage.setItem('profilePicture', item.user.profile_picture);
          AsyncStorage.setItem('displayName', item.user.display_name)
        }
        if (!uniqueUsernames.has(displayName)) {
          uniqueUsernames.add(displayName); // Add the username to the set
          const add = {
            item: displayName,
            id: usernameID,
          };
          filteredUsersArray.push(add)
        }
        break; // Break the inner loop after adding the username
      }
    }

  }
  AsyncStorage.setItem('filteredUsersArray', JSON.stringify(filteredUsersArray))
      .then(() => {
        // console.log('Array stored successfully');
      })
      .catch(error => {
        console.log('Error storing array:', error);
      });

  // console.log("filtered user array")
  // console.log(filteredInfo[0].garden_detail.name)
  // console.log(filteredUsersArray)

  // GET the authorisation bearer token from the Database
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
          setToken(value);
          console.log(value)

        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    getToken();
  }, []);

  // GET request to the UsersInGarden Table to get the list of all the gardens and all the users attached to said garden
  useEffect(() => {
    if (!token) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    // console.log(token)

    fetch(url, {
      method: "GET",
      headers: headers
    })
        .then(resp => resp.json())
        .then(info => {
          // console.log("info is here")
          // console.log(info);
          setInfo(info); // update the data state variable with the API response
        })
        .catch(error => console.log("error"))
  }, [token]);

  const changeModalVisible = (bool) => {
    setIsModalVisible(bool);
  }

  const[isAddGardenPopupVisible,setisAddGardenPopupVisible] = useState(false);

  const changeAddGardenPopupVisible = (bool) => {
    setisAddGardenPopupVisible(bool);
  }

  const setData = (data) => {
    setChooseData(data);
  }
  // Get the list of all the gardens from the GARDENS table in the database
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
      setInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  // Saving the garden ID for chosen garden so that it can be used on other pages
  const saveGardenId = async (gardenId) => {
    try {
      await AsyncStorage.setItem('gardenId', gardenId.toString());
    } catch (error) {
      console.log('Error saving garden id:', error);
    }
  };

  // Displays all the gardens in a list

  const GardenCard = ({gardens}) => {
    const randomId = Math.floor(Math.random() * 10) + 1;
    const newImage = home_images.find((kawaii) => kawaii.id === randomId.toString());

    const navigateToHarvest = () => {

      saveGardenId(gardens.id);
      setMyState(gardens);
      navigation.navigate('Harvest', { gardenName: gardens.name });
    };

    return (
        <TouchableOpacity style={styles.gardenCard} onPress={navigateToHarvest}>
          <View>
            <View style={{marginBottom: 179, backgroundColor: COLORS.primary, width:180, height: 70, borderTopRightRadius: 10, borderTopLeftRadius: 10}}>
              <Text style={styles.GardensText}>{gardens.name}</Text>
            </View>
            <Image
                source={newImage?.image} // Use the image from the matched type object
                style={{position: 'absolute', height: 100, width: 100, alignSelf: 'center' , marginTop: 100}}
            />
          </View>
        </TouchableOpacity>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.header}>Your gardens</Text>
          {filteredInfo.length === 0 ? (
              <View style={styles.noGardensContainer}>
                <Image
                    source={require('../images/scarecrow.png')}
                    style= {styles.noGardensImage} />
                <Text style={styles.noGardensText}>No gardens</Text>
              </View>
          ) : (
              <View style={styles.gardensContainer}>
                <FlatList
                    showsVerticalScrollIndicator = {false}
                    numColumns={2}
                    contentContainerStyle={{paddingBottom:80}}
                    data = {filteredInfo} //add gardens file
                    renderItem = {({item}) => <GardenCard gardens={item.garden_detail}/>}
                />

              </View>

          )}
          <Pressable style={styles.actionBtn2} onPress={() => changeModalVisible(true)}>
            <FontAwesomeIcon name="plus" size={30} color="white" style={styles.crossIcon} />
          </Pressable>

          {/*<TouchableOpacity*/}

          {/*    style = {styles.add}*/}
          {/*    onPress = {() => {*/}
          {/*      changeModalVisible(true);*/}
          {/*      // console.log(myUser)*/}
          {/*      }}>*/}

          {/*        <TouchableOpacity*/}
          {/*           style = {styles.plusV}>*/}
          {/*        </TouchableOpacity>*/}

          {/*        <TouchableOpacity*/}
          {/*           style = {styles.plusH}>*/}
          {/*        </TouchableOpacity>*/}

          {/*  /!*<Image source = {require('../images/plus_sign.png')}/> *!/*/}

          {/*</TouchableOpacity>*/}
          <Modal
              transparent = {true} //addGardenButton
              animationType = 'fade'
              visible = {isModalVisible}
              nRequestClose = {() => changeModalVisible(false)}>
            <Home_popup
                changeModalVisible = {changeModalVisible}
                setData = {setData}
                changeAddGardenPopupVisible = {changeAddGardenPopupVisible}
                fetchGardens={fetchGardens}
            />
          </Modal>
          {/*<Modal
              transparent = {true} //addGardenButton
              animationType = 'fade'
              visible = {isAddGardenPopupVisible} //changeAddGardenPopupVisible
              nRequestClose = {() => changeAddGardenPopupVisible(false)}>

            <AddGardenPopup/>
          </Modal>  */}


        </View>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({



  gardenCard:{
    height: 250,
    width: 180,
    elevation: 8,
    borderRadius: 10,
    justifyContent: 'center',
    //backgroundColor: 'white',
    backgroundColor: "#FFF",
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  crossIcon: {
    alignSelf: 'center',
  },

  header:{
    fontWeight: 'bold',
    fontSize: 30,
    color: COLORS.primary,
    alignItems: 'center',
    marginVertical: 50,
    //justifyContent: 'center',
  },
  noGardensImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 20
  },
  GardensText:{
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    alignSelf: 'center',
    marginTop: 20,

  },
  noGardensContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noGardensText: {
    fontSize: 18,
    marginTop: 10,
    fontWeight:"bold"
  },

  gardensContainer: {
    flex: 1,
  },


  add:{
    marginVertical: 20,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 50,

  },
  plusV:{
    top: 45,
    width: 10,
    height: 60,
    
    backgroundColor: '#000000',
    borderRadius: 50,

  },
  plusH:{
    marginBottom: 60,
    width: 60,
    height: 10,
   
    backgroundColor: '#000000',
    borderRadius: 50,

  },

  addText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20,
  },

  popup: {
    width: 250,
    height: 400,

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    
    borderRadius: 25,

  },
  actionBtn2: {
    height: 70,
    width: 70,
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    marginBottom: 20,
    marginLeft: 275,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 8,
  },

  popupbackground: {
    
    backgroundColor:"#000000aa",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  container: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  topBar: {
    backgroundColor:'013220',
    // height: 50,
    //   justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    backgroundColor: '#013220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupOutputTemp:{
    // top: 380,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default HomeScreen;