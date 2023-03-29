import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React,{useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";
import {Harvest_popup} from "../components/HarvestPopup.js"

const HarvestScreen= ({navigation}) => {

    const[isHarvestPopupVisible,setisHarvestPopupVisible] = useState(false);

    const[chooseData,setchooseData] = useState();

  const changeHarvestPopupVisible = (bool) => {
    setisHarvestPopupVisible(bool);
  }

  const setData = (data) => {
    setchooseData(data);            //can be used to obtain info from popup
  }


   // const [modalVisible, setModalVisible] = useState(false); // state variable for modal visibility

    const LogCard = ({item}) =>{
        return (
            <View style={styles.LogCard}>
                <Image source={item.image} style={{height: 60,width: 60 }}/>
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 20,
                    flex: 1
                }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>{item.name}</Text>
                    <Text style={{ fontSize: 13, color: 'grey'}}>{item.weight}</Text>
                    <Text style={{color: 'grey', fontSize: 13}}>{item.Date_harvested}</Text>
                </View>
                <View style={{marginRight: 20, marginHorizontal: 20}}>
                    <Text style={{fontWeight: 'bold', fontSize: 18}}>3</Text>
                    <Pressable style={styles.actionBtn} onPress={() => setisHarvestPopupVisible(true)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginHorizontal: 42, marginVertical: 37, color: 'white'}}>Harvest</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Plants')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Harvest Plants</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {foods}
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
        position: "absolute",
        top: -38,
        right: -30,
        width: 150,
        height: 100,
        backgroundColor: '#5DBB63',
        marginBottom: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10
    },
   
});

export default HarvestScreen;