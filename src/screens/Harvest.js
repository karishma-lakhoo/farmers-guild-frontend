import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React,{useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {FlatList} from "react-native-gesture-handler";
import foods from "../consts/foods";

const HarvestScreen: React.FunctionComponent<IStackScreenProps> = (props) => {
    const { navigation, route, nameProp} = props;

    const [modalVisible, setModalVisible] = useState(false); // state variable for modal visibility

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
                    <Pressable style={styles.actionBtn} onPress={() => setModalVisible(true)}>
                        <Text style={{fontWeight: 'bold', fontSize: 18, marginHorizontal: 42, marginVertical: 37, color: 'white'}}>Harvest</Text>
                    </Pressable>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} style={{ marginLeft: 10, marginVertical: 40 }} onPress={() => navigation.navigate('Plants')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold', marginHorizontal: 30}}>Harvest Plants</Text>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle = {{paddingBottom: 80}}
                data = {foods}
                renderItem = {({item})=><LogCard item = {item}/>}
            />
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Harvest</Text>
                        <Text style={styles.modalText}>Are you sure you want to harvest this plant?</Text>
                        <View style={styles.modalActions}>

                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        height: 500,
        width: 375,
        alignItems: "center",
    },
    modalTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: "center",
    },
    modalActions: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    modalButtonCancel: {
        backgroundColor: "#ccc",
    },
    modalButtonConfirm: {
        backgroundColor: "#5DBB63",
    },
    modalButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default HarvestScreen;