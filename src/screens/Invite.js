import {
    View,
    Text,
    Button,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TouchableHighlight, Dimensions
} from "react-native";
import TestComponent from "../components/test-component";
import Icon from "react-native-vector-icons/MaterialIcons";
import React, {useContext, useEffect, useState} from "react";
import COLORS from "../consts/colors";
import {FlatList, TextInput} from "react-native-gesture-handler";
import {api_url} from "../consts/api_url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {MyContext} from "../../App";
import categories from "../consts/categories";
import images from "../consts/profile_images";
const url = api_url + '/user/';
const {width} = Dimensions.get("screen");
const cardWidth = width/2-20;
function handleSearch(text) {
    return undefined;
}


const InviteScreen = ({navigation}) => {
    const [selectedCategoryIndex,setSelectedCategoryIndex] = React.useState(0);
    const {myState, setMyState} = useContext(MyContext);
    const [data, setData] = useState([])
    const [token, setToken] = useState('');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    

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
            'Content-Type': 'application/json',
        };

        fetch(url, {
            method: "GET",
            headers: headers
        })
            .then(resp => resp.json())
            .then(data => {
                console.log(data);
                setData(data); // update the data state variable with the API response
            })
            .catch(error => console.log("error"))
    }, [token]);

    const Card = ({food}) =>{

        const selectedImage = images.find(image => image.id === food.profile_picture);
        return(
            <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => {
                setMyState(food);
                navigation.navigate('Confirm_invite')
            }}>
                <View style={styles.card}>
                    <View style={{alignItems:'center', top:-40}}>
                        <Image
                            source={selectedImage?.image}
                            style={{ height: 120, width: 120 }}
                        />
                    </View>
                    <View style={{marginHorizontal:20}}>
                        <Text style={{fontSize:16, fontWeight:'bold', marginTop:10}}>{food.username}</Text>
                    </View>
                    <View style={styles.plantAt}>
                        <Icon name="add" size={20} color={COLORS.white}/>
                    </View>
                </View>
            </TouchableHighlight>

        )
    }
    const handleSearch = text => {
        setSearchText(text);
        const filtered = data.filter(
            item =>
                item.username.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredData(filtered);
    };


    return (
        <SafeAreaView style={{flex:1}}>
            <View style={styles.head}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.navigate('Home')}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Invite Users</Text>
            </View>
            <View style={styles.header}>
                <View>
                    <Text style={{marginTop:5,marginLeft: 25, fontSize:22,color:COLORS.grey}}>Who do you want to invite?</Text>
                </View>
            </View>
            <View style={{marginTop:0,flexDirection:'row',paddingHorizontal:20, paddingVertical: 30}}>
                <View style={styles.inputContainer}>
                    <Icon name="search" size={28} style={{width: 28}} />
                    <TextInput
                        style={{flex: null, width: '100%', fontSize: 18}}
                        placeholder="Search for user"
                        onChangeText={text => handleSearch(text)}
                        value={searchText}
                    />
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={searchText !== '' ? filteredData : data}
                keyExtractor={item => item.id.toString()}
                renderItem={({item}) => <Card food={item} />}
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    head: {
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
    inputContainer: {
        flex: 1,
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        backgroundColor:  COLORS.light,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    sortBtn: {
        width: 50,
        height: 50,
        marginLeft: 10,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesListContainer: {
        paddingVertical: 30,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    categoryBtn: {
        height: 45,
        width: 120,
        marginRight: 7,
        borderRadius: 30,
        alignItems: 'center',
        paddingHorizontal: 5,
        flexDirection: 'row',
    },
    categoryBtnImgCon: {
        height: 35,
        width: 35,
        backgroundColor: COLORS.white,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        height: 220,
        width: cardWidth,
        marginHorizontal: 10,
        marginBottom: 20,
        marginTop: 50,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 4,
        elevation: 8, // This is for Android
    },
    plantAt:{
        position: 'absolute',
        bottom: 10,
        right: 10,
        height: 30,
        width: 30,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default InviteScreen;