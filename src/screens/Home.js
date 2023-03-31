import React, {useContext, useEffect, useState} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Modal,TouchableOpacity,Image } from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Home_popup} from '../../src/components/Home_popup.js';
import {AddGardenPopup} from '../../src/components/addGardenPopup_Test.js';
import gardens from '../consts/gardens.js';
import { MyContext} from "../../App";
import {api_url} from "../consts/api_url";

const HomeScreen = ({navigation}) => {
  const[isModalVisible,setisModalVisible] = useState(false);
  const [value, setValue] = useState([])
  const { myState, setMyState } = useContext(MyContext);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzExODM1NjA3LCJpYXQiOjE2ODAyOTk2MDcsImp0aSI6ImMyZDQyYTdkNmI5MzRlNTZhNWQ1NzZiNWMwNTdhM2YzIiwidXNlcl9pZCI6IjliNzUxNDMzLTlhZWUtNDU5My04ZjJjLWU5M2MzM2Q2Yjg0NiJ9.5Sep2XrKNjMho1B9J4DNViMAjULnq_fuJs-IXPXrKB4'
  const headers = {
    'Authorization': `Bearer ${token}`,
  };
  useEffect(() => {
    fetch('https://7e0c-102-219-180-122.eu.ngrok.io/api/garden/', {
      method: "GET",
      headers: headers
    })

        .then(resp => resp.json())
        .then(value => {
          console.log(value);
          setValue(value); // update the data state variable with the API response
        })
        .catch(error => console.log("error"))
  }, []);

  const[chooseData,setchooseData] = useState();

  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  }

  const[isAddGardenPopupVisible,setisAddGardenPopupVisible] = useState(false);

  const changeAddGardenPopupVisible = (bool) => {
    setisAddGardenPopupVisible(bool);
  }

  const setData = (data) => {
    setchooseData(data);
  }

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
              data = {value} //add gardens file
              renderItem = {({item}) => <GardenCard gardens={item}/>}
          />

          <TouchableOpacity
              style = {styles.add}
              onPress = {() => changeModalVisible(true)}
          >
            <Image source = {require('../images/plus_sign.png')}/>

          </TouchableOpacity>
          <Modal
              transparent = {true} //addGardenButton
              animationType = 'fade'
              visible = {isModalVisible}
              nRequestClose = {() => changeModalVisible(false)}
          >
            <Home_popup
                changeModalVisible = {changeModalVisible}
                setData = {setData}
                changeAddGardenPopupVisible = {changeAddGardenPopupVisible}
            />
          </Modal>
          <Modal
              transparent = {true} //addGardenButton
              animationType = 'fade'
              visible = {isAddGardenPopupVisible} //changeAddGardenPopupVisible
              nRequestClose = {() => changeAddGardenPopupVisible(false)}
          >

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