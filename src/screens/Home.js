import React, {useState} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Modal,TouchableOpacity, Image } from 'react-native';
import { IStackScreenProps } from '../../src/library/StackScreenProps';
import {Home_popup} from '../../src/components/Home_popup.js';
import {AddGarden_Popup} from '../../src/components/addGardenPopup.js';



const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;
  const[isModalVisible,setisModalVisible] = useState(false);
  

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

    

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text
        >
          Home</Text>

          <Text style = {styles.popupOutputTemp}>
            {chooseData}
          </Text>



      <View style={styles.addGardenIcon}>
       
        <Image source = {require('../images/plus_sign.png')}/>
      </View>

      <TouchableOpacity style = {styles.add}
      onPress = {() => changeModalVisible(true)}
      >
        <Text style = {styles.addText}> Nothing growing yet </Text>
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
        visible = {false} //changeAddGardenPopupVisible
        nRequestClose = {() => changeAddGardenPopupVisible(false)}
        >  
        </Modal>
        

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  addGardenIcon:{
    top : 280,
    alignItems: 'center',
  },

  add:{
    width: 120,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    top:300,
    backgroundColor: 'white',
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
  },
   topBar: {
       backgroundColor:'013220',
       height: 50,
       justifyContent: 'center',
       alignItems: 'center',
     },
  content: {
    flex: 1,
    backgroundColor: '#013220',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupOutputTemp:{
    top: 380,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  }
});

export default HomeScreen;