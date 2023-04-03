import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Modal,TouchableOpacity,Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Home_popup} from '../components/Home_popup';
import {AddGardenPopup} from '../components/addGardenPopup_Test';
import gardens from '../consts/gardens.js';
import { MyContext} from "../../App";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";


const url = api_url + '/garden/';
const HomeScreen = ({navigation}) => {
  const[isModalVisible,setIsModalVisible] = useState(false);
  const { myState, setMyState } = useContext(MyContext);
  const[chooseData,setChooseData] = useState();
  const [info, setInfo] = useState([])
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

  useEffect(() => {
    if (!token) {
      return;
    }

    const headers = {
      'Authorization': `Bearer ${token}`,
    };
    console.log(token)

    fetch(url, {
      method: "GET",
      headers: headers
    })
        .then(resp => resp.json())
        .then(info => {
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

  const GardenCard = ({gardens}) => {

    return <TouchableOpacity style = {styles.gardenCard} onPress={() => {
      setMyState(gardens);
      navigation.navigate('Harvest');
    }}>
      <Text>{gardens.name}</Text>
    </TouchableOpacity>;
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.header}>Your gardens</Text>

          <FlatList
              showsVerticalScrollIndicator = {false}
              contentContainerStyle={{paddingBottom:80}}
              data = {info} //add gardens file
              renderItem = {({item}) => <GardenCard gardens={item}/>}
          />

          <TouchableOpacity
              style = {styles.add}
              onPress = {() => changeModalVisible(true)}>
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
    width: 250,
    elevation: 15,
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