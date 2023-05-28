import React, {useState, useEffect, useRef, useContext} from 'react';
import {
    SafeAreaView,
    Text,
    Button,
    StyleSheet,
    View,
    Image,
    Alert,
    ActivityIndicator,
    TouchableOpacity, TouchableHighlight
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import foods from "../consts/foods";
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from "react-native-dropdown-select-list";
import COLORS from "../consts/colors";
import types from "../consts/types";
import {MyContext} from "../../App";

// setting the default values for the dropdowns
const GARDEN_OPTIONS = [
    {
        item: 'All Gardens',
        id: 'AG',
    },
];
const USER_OPTIONS = [
    {
        item: 'All Users',
        id: 'AU',
    },
];

const FILTER_OPTIONS = [
    {
        item: 'Newest to Oldest',
        id: 'NO',
    },
    {
        item: 'Oldest to Newest',
        id: 'ON',
    },
];

let url = api_url + '/harvest_log/?ordering=-datetime';

const LogScreen = ({navigation}) => {
    // State variables
    const controller = useRef(new AbortController());
    const [sortValue, setSortValue] = useState(FILTER_OPTIONS[0]);
    const [userValue, setUserValue] = useState({});
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredGardensArray, setFilteredGardensArray] = useState([]);
    const [filteredUsersArray, setFilteredUsersArray] = useState([]);
    const [gardenValue, setGardenValue] = useState(GARDEN_OPTIONS[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [selectedYear, setSelectedYear] = useState('')
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [buttonPressed, setButtonPressed] = useState(false)
    const [firstYear, setFirstYear] = useState(2010)
    const n_years = (2023-firstYear) + 1
    const years1 = Array.from({ length: n_years }, (_, i) => (2023 - i).toString()); // generates an array of 100 years, from "2023" to "1924"
    const years2 = Array.from({ length: years1.indexOf(startYear)+1 }, (_, j) => (2023 - j).toString()); // generates an array of years, from "2023" down to the selected year as a string
    const {myState, setMyState} = useContext(MyContext);

    // get username, gardens and other data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // get username, gardens, users to populate dropdowns
                const usernameValue = await AsyncStorage.getItem('username');
                const filteredGardensValue = await AsyncStorage.getItem('filteredGardensArray');
                const filteredUsersValue = await AsyncStorage.getItem('filteredUsersArray');
                const usernameID = await AsyncStorage.getItem('usernameID')
                const displayName = await AsyncStorage.getItem('displayName')
                const parsedUsersValue = JSON.parse(filteredUsersValue);
                setFilteredUsersArray(parsedUsersValue);
                const parsedGardensValue = JSON.parse(filteredGardensValue);
                setFilteredGardensArray(parsedGardensValue);
                if (usernameValue !== null) {
                    setUsername(usernameValue);
                    setUserValue({ item: displayName, id: usernameID }); // Set the initial value of userValue to the username
                }

            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, []);
    // doing the filtering of data  and a GET Request based on the parameters chosen in the dropdowns
    useEffect(() => {
        setPageNumber(2)
        setData([])
        setIsLoading(true);
        let orderingGarden = 'datetime'
        if (sortValue.id !== "ON") {
            orderingGarden = '-datetime'
        }

        let userQuery = "All Users"
        if (userValue.item !== "All Users") {
            userQuery = userValue.id
        }

        let gardenQuery = gardenValue.item
        if (gardenValue.id === "AG"){
            gardenQuery = '';
            for (let i= 1; i < filteredGardensArray.length; i++){
                if(i===0){
                    gardenQuery += filteredGardensArray[i].item.toString();
                }
                gardenQuery += "&garden="+filteredGardensArray[i].item.toString();
            }
        }
        if(!buttonPressed){
            // console.log("not pressed")
            // console.log("asdfasdfsafasf")
            url = api_url + '/harvest_log/?ordering=' + orderingGarden + "&garden="+ gardenQuery  + "&user=" + userQuery;
        }
        else{
            // console.log("pressed")
            url = api_url + '/harvest_log/?ordering=' + orderingGarden + "&garden="+ gardenQuery  + "&user=" + userQuery + '&start_year=' + startYear + '&end_year=' + endYear;
        }
        setData([])
        fetch(url + '&page=1', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            signal: controller.current.signal,
        })
            .then((resp) => resp.json())
            .then((response) => {
                const newData = response.results;
                setData(newData); // Update the data state with the new fetched data
            })
            .catch((error) => console.log(error))
            .finally(() => {
                setIsLoading(false); // Set isLoading to false when data is updated or when an error occurs
            });

        // console.log("data must be fetched")
        // console.log(sortValue)
        // console.log(gardenValue)
        // console.log(userValue)
    },[sortValue, gardenValue, userValue, startYear, endYear, buttonPressed]);
    // setting variables
    const handleGardenFilterChange = (selected) => {
        setGardenValue(selected);
    }

    // setting variables
    const handleUserFilterChange = (selected) => {
        setUserValue(selected);
    }

    // setting variables
    const handleFilterChange = (selected) => {
        setSortValue(selected);
    };
    const handleButtonPress = () => {
        // console.log("what am i")
        setButtonPressed(true)
        // console.log(buttonPressed)

    };

    // console.log(filteredGardensArray)
    // loading more data when the load more button is clioked by doing GET requests to the database
    const loadMoreData = () => {
        const nextPageUrl = `${url}&page=${pageNumber}`;
        fetch(nextPageUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            signal: controller.current.signal,
        })
            .then(resp => {
                if (!resp.ok) {
                    throw new Error(resp.statusText);
                }
                return resp.json();
            })
            .then(response => {
                const nextPage = response.next;
                const newData = response.results;
                setData(prevData => [...prevData, ...newData]);
                if (nextPage !== null) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    // GET the bearer token from the database to allow authorisation when making a request to the database
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
        // this is where the initial get request is done
        loadMoreData();
    }, [token, pageNumber]);
    // Displays each log in a log card
    const renderItem = ({item}) => {

        const type = types.find((food) => food.name === item?.food_detail?.type);
        const date = new Date(item.datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return (
            <TouchableHighlight underlayColor={COLORS.white} activeOpacity={0.9} onPress={() => {
                setMyState(item.food_detail);
                // console.log("assdfasdfasdfasdfasdfasdf")
                // console.log(item?.food_detail?.food)
                // console.log("my statte")
                // console.log(myState)
                navigation.navigate('PlantDetailsLog')
            }}>
                <View style={styles.LogCard}>
                    <View style={{
                        height: 100,
                        marginLeft: 20,
                        paddingVertical: 12,
                        flex: 1,
                    }}>
                        { data &&
                            <>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -6, right: 5}}>
                                    <Image
                                        source={type?.image} // Use the image from the matched type object
                                        style={{ height: 50, width: 50 }}
                                    />
                                    <View style={{ marginLeft: 20 }}>
                                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                            {/*food name*/}
                                            {item?.food_detail?.food ?? "No food found"}
                                        </Text>
                                        <Text style={{color: 'grey', fontSize: 12}}>
                                            {/*food weight*/}
                                            {item?.weight ?? "No weight found"} g
                                        </Text>
                                        <Text style={{color: 'grey', fontSize: 12}}>
                                            {/*date*/}
                                            {formattedDate}
                                        </Text>
                                        <Text style={{color: 'grey', fontSize: 12}}>
                                            {/*garden*/}
                                            Garden: {item?.garden_detail?.name ?? "No garden found"}
                                        </Text>
                                        <Text style={{color: 'grey', fontSize: 12}}>
                                            {/*displays display name of user associated to harvest log*/}
                                            User: {item?.user?.display_name ?? "No user found"}
                                        </Text>
                                    </View>

                                </View>

                            </>
                        }
                    </View>
                </View>
            </TouchableHighlight>

        );
    };
    // Renders the Log Screen
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>

                <Text style={styles.headerText}>Harvest Log</Text>
            </View>
            <View style={[styles.filterContainer, { flexDirection: 'column' }]}>
                <SelectBox
                    label="Garden"
                    options={filteredGardensArray}
                    value={gardenValue}
                    arrowIconColor={COLORS.primary}
                    onChange={handleGardenFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="User"
                    options={filteredUsersArray}
                    value={userValue}
                    arrowIconColor={COLORS.primary}
                    onChange={handleUserFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="Sort By"
                    options={FILTER_OPTIONS}
                    value={sortValue}
                    arrowIconColor={COLORS.primary}
                    onChange={handleFilterChange}
                />
                <Text></Text>
                {/*<Text style={{fontSize:12, color:'grey'}}>Date Range </Text>*/}
                {/*<Text></Text>*/}

                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginRight: 5 }}>
                        <Text style={{fontSize:13, color:'grey'}}>{`From January:`}</Text>
                        <View style={{ marginTop: 5, borderWidth: 1, borderColor: 'transparent', borderRadius: 5, overflow: 'hidden' }}>
                            <SelectList
                                setSelected={(selected) => {
                                    setStartYear(selected);
                                    // console.log("Selected category:", selected);
                                }}
                                data={years1}
                                placeholder={"Start Date"}
                                boxStyles={{backgroundColor:"white"}}
                                // defaultOption={{key: 'SUP', value: 'SuperType'}}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={{fontSize:13, color:'grey'}}>{`To December:`}</Text>
                        <View style={{ marginTop: 5, borderWidth: 1, borderColor: 'transparent', borderRadius: 5, overflow: 'hidden' }}>
                            <SelectList
                                setSelected={(selected) => {
                                    setEndYear(selected);
                                }}
                                data={years2}
                                placeholder={"End Date"}
                                boxStyles={{backgroundColor:"white"}}
                                // defaultOption={{key: 'SUP', value: 'SuperType'}}
                            />
                        </View>
                    </View>
                    <View style={{ marginTop: 21, marginLeft: 5 }}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: COLORS.primary,
                                borderRadius: 12,
                                paddingVertical: 14,
                                paddingHorizontal: 16,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            onPress={handleButtonPress}
                        >
                            <Text style={{ color: 'white', fontSize: 16 }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={renderItem}
                    // onEndReached={loadMoreData}
                    // onEndReachedThreshold={0.5}
                    ListFooterComponent={
                        <View style={styles.footer}>
                            <Button title="Load More" onPress={loadMoreData} />
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginTop: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    LogCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    footer: {
        marginVertical: 20,
        alignItems: 'center',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LogScreen;
