import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Modal,TouchableOpacity,Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Home_popup} from '../components/Home_popup';
import {AddGardenPopup} from '../components/addGardenPopup_Test';
import gardens from '../consts/gardens.js';
import { MyContext} from "../../App";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useRoute} from "@react-navigation/native";


const url = api_url + '/users_in_garden/';
const HomeScreen = ({navigation}) => {
  const { myUser } = useContext(MyContext);
  const[isModalVisible,setIsModalVisible] = useState(false);
  const { myState, setMyState } = useContext(MyContext);
  const[chooseData,setChooseData] = useState();
  const [info, setInfo] = useState([])
  const [token, setToken] = useState('');
  const route = useRoute();
  const [myUsername, setMyUsername] = useState('');
  const [myUsernameID, setMyUsernameID] = useState('');
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
  console.log(filteredGardensArray)
  // filteredInfo.forEach(item => filteredGardensArray.push(item.garden_detail.name))
  AsyncStorage.setItem('filteredGardensArray', JSON.stringify(filteredGardensArray))
      .then(() => {
        // console.log('Array stored successfully');
      })
      .catch(error => {
        console.log('Error storing array:', error);
      });

  console.log("filtered garden array")
  // console.log(filteredInfo[0].garden_detail.name)
  console.log(filteredGardensArray)

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
        if (username === myUsername){
          AsyncStorage.setItem('usernameID', item.user.id);
        }
        if (!uniqueUsernames.has(username)) {
          uniqueUsernames.add(username); // Add the username to the set
          const add = {
            item: username,
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

  console.log("filtered user array")
  // console.log(filteredInfo[0].garden_detail.name)
  console.log(filteredUsersArray)


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
          console.log("info is here")
          console.log(info);
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

  const saveGardenId = async (gardenId) => {
    try {
      await AsyncStorage.setItem('gardenId', gardenId.toString());
    } catch (error) {
      console.log('Error saving garden id:', error);
    }
  };


  const GardenCard = ({gardens}) => {

    const navigateToHarvest = () => {
     
      saveGardenId(gardens.id);
      setMyState(gardens);
      navigation.navigate('Harvest', { gardenName: gardens.name });
    };

    return (
        <TouchableOpacity style={styles.gardenCard} onPress={navigateToHarvest}>
          <Text>{gardens.name}</Text>
        </TouchableOpacity>
    );
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.header}>Your gardens</Text>

          <FlatList
              showsVerticalScrollIndicator = {false}
              contentContainerStyle={{paddingBottom:80}}
              data = {filteredInfo} //add gardens file
              renderItem = {({item}) => <GardenCard gardens={item.garden_detail}/>}
          />

          <TouchableOpacity
              style = {styles.add}
              onPress = {() => {
                changeModalVisible(true);
                // console.log(myUser)
                }}>
            <Image source = {require('../images/plus_sign.png')}/>

          </TouchableOpacity>
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
          <Modal
              transparent = {true} //addGardenButton
              animationType = 'fade'
              visible = {isAddGardenPopupVisible} //changeAddGardenPopupVisible
              nRequestClose = {() => changeAddGardenPopupVisible(false)}>

            <AddGardenPopup/>
          </Modal>


        </View>

      </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  gardenCard:{
    height: 60,
    width: 300,
    elevation: 9,
    borderRadius: 50,
    backgroundColor: 'white',
    marginVertical: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  header:{
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    alignItems: 'center',
    marginVertical: 50,
    //justifyContent: 'center',
  },

  nothingyet: {
    //  fontWeight: 'bold',
    //  fontSize: 22,
    //  color: 'black',
    //  alignItems: 'center',
    //   justifyContent: 'center',
    //   marginVertical: 10,

  },

  add:{
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
    paddingBottom: 50,
    // top:300,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
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
    backgroundColor: '#4CAF50',
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