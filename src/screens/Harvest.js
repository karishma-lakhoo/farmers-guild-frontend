import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";
import {Harvest_popup} from "../components/HarvestPopup.js"
import colors from "../consts/colors"
import { MyContext } from "../../App";

//we need to get all the plants_in_garden for shellyrishma only

const HarvestScreen = ({navigation}) => {
    const { myState } = useContext(MyContext);

    const[isHarvestPopupVisible,setIsHarvestPopupVisible] = useState(false);

    const[chooseData,setChooseData] = useState();
    const [value, setValue] = useState([])

    useEffect(() => {
        fetch('https://77ed-102-219-180-122.eu.ngrok.io/api/plants_in_garden/', {
            method: "GET"
        })

            .then(resp => resp.json())
            .then(value => {
                console.log(value);
                setValue(value); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, []);


  const changeHarvestPopupVisible = (bool) => {
    setIsHarvestPopupVisible(bool);
  }

  const setData = (data) => {
    setChooseData(data);            //can be used to obtain info from popup
  }

   // const [modalVisible, setModalVisible] = useState(false); // state variable for modal visibility

    const LogCard = ({item}) =>{
        return (
            <View style={styles.LogCard}>
                {/*<Image source={item.image} style={{height: 60,width: 60 }}/>*/}
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.food}</Text>
                    <Text style={{ fontSize: 13, color: 'grey'}}>{item.garden}</Text>
                </View>
                <View style={{marginRight: 20, marginHorizontal: 20}}>
                    <Pressable style={styles.actionBtn} onPress={() => setIsHarvestPopupVisible(true)}>
                        <Text style={styles.actionBtnText}>Harvest</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Harvest Plants</Text>
            </View>
            <Pressable onPress={() => navigation.navigate('Plants')}  style={Btn.container}>
                <Text style={Btn.text}> Add Plants </Text>
            </Pressable>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {value}
                renderItem = {({item})=><LogCard item = {item}/>}
            />




        <Modal 
        transparent = {true}
        animationType = 'fade'
        visible = {isHarvestPopupVisible} 
        nRequestClose = {() => changeHarvestPopupVisible(false)}
        >  

        <Harvest_popup
        changeHarvestPopupVisible = {changeHarvestPopupVisible}
        setData = {setData}
       // changeAddGardenPopupVisible = {changeAddGardenPopupVisible}
      //  />
        />

        </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogCard: {
        height: 100,
        elevation: 15,
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    actionBtn: {
        height: 100,
        width: 130,
        marginRight:-10,
        marginHorizontal: 20,
        backgroundColor: '#5DBB63',
        marginBottom: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
    actionBtnText:{
        marginLeft: 30,
        marginTop: 38,
        fontWeight: "bold",
        fontSize: 18,
        color: 'white',

    }
   
});
const Btn = StyleSheet.create({
    container : {
        backgroundColor: colors.primary,
        width: '100%',
        padding: 15,
        marginVertical: 15,
        alignItems:'center',
        borderRadius: 25,
    },

    text:{
        fontWeight:'bold',
        color:'white',
    },
});


export default HarvestScreen;