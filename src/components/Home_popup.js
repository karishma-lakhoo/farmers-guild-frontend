import React, {useState} from 'react';
import{
StyleSheet, Text,View, TouchableOpacity,Dimensions
} from 'react-native';


const WIDTH = Dimensions.get('window').width;
const HEIGHT_popup = 150;

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
            <Text>Header</Text>
            
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
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
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
        color: 'white',
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
       
})

export {Home_popup}