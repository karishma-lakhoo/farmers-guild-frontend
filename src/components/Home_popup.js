import React, {useState} from 'react';
import{
StyleSheet, Text,View, TouchableOpacity,Dimensions
} from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT_popup = 200;

const Home_popup = (props) => {

    closeModal = (bool,data) => {
        props.changeModalVisible(bool);
        props.setData(data);
    }


    return (
        <TouchableOpacity
        disabled = {true}
        style = {styles.container}
        >

            <View style = {styles.popup}>

            <TouchableOpacity style = {styles.addGardenButton}
                onPress = {() => closeModal(false,'Add Garden')}
                >
                    <Text style = {styles.addGardenText}>
                        Add garden</Text>


                </TouchableOpacity>

            
            
            <View styles = {styles.buttonsView}>

                <TouchableOpacity style = {styles.touchableOpacity}
                onPress = {() => closeModal(false,'Close')}
                >
                    <Text
                    style = {styles.text}>
                    Close
                    </Text>


                </TouchableOpacity>


            </View>

                

            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       // backgroundColor: 'brown',
    },
    popup:{
        height: HEIGHT_popup,
        paddingTop: 20,
        backgroundColor: 'white',
        borderRadius: 50,
        width: WIDTH - 80,
        
    },

      textView: {
        flex:1,
        alignItems: 'center'
      },
      text: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
      },
      buttonsView: {
        width: '100%',
        flexDirection: 'row',
       // alignItems: 'center',
       // justifyContent: 'center',
      //  backgroundColor: 'green',
        
      },
      touchableOpacity: {
      //flex: 1,
      width: 120,
      height: 40,
      justifyContent: 'center',

      top: 70,
      left: '25%',
      alignItems: 'center',
      backgroundColor: 'green',
      borderRadius: 10,

      },
      addGardenButton:{
        width: 120,
        height: 40,
        justifyContent: 'center',
  
        top: 10,
        left: '25%',
        alignItems: 'center',
        backgroundColor: 'green',
        borderRadius: 10,
      },
      addGardenText: {
        margin: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        

      },
       
})

export {Home_popup}