import React from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, Modal } from 'react-native';
import { IStackScreenProps } from '../../src/library/StackScreenProps';
import {Home_popup} from '../../src/components/Home_popup.js';



const HomeScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
  const { navigation, route, nameProp } = props;
  const[isModalVisible,setisModalVisible] = useState(false);
  const changeModalVisible = (bool) => {
    setisModalVisible(bool);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text>Home</Text>


      <TouchableOpacity style = {styles.addGardenButton}
      onPress = {() => changeModalVisible(true)}
      >
        

        <Text style = {styles.addGardenButtonText}> Add garden </Text>

      </TouchableOpacity>


        
        <Modal 
        transparent = {true} addGardenButton
        animationType = 'fade'
        visible = {isModalVisible}
        nRequestClose = {() => changeModalVisible(false)}
        >

        
        <Home_popup/>
        </Modal>

      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  addGardenButton:{
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 250,
    backgroundColor: 'white',
    borderRadius: 10,
  },

  addGardenButtonText: {
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

});

export default HomeScreen;