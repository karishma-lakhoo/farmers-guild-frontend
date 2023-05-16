import React, {useState, useEffect, useRef} from 'react';
import {
    SafeAreaView,
    Text,
    Button,
    StyleSheet,
    View,
    Image,
    Alert,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import foods from "../consts/foods";
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SelectList} from "react-native-dropdown-select-list";

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get username, gardens, users to populate dropdowns
                const usernameValue = await AsyncStorage.getItem('username');
                const filteredGardensValue = await AsyncStorage.getItem('filteredGardensArray');
                const filteredUsersValue = await AsyncStorage.getItem('filteredUsersArray');
                const usernameID = await AsyncStorage.getItem('usernameID')
                // console.log(usernameID)
                const parsedUsersValue = JSON.parse(filteredUsersValue);
                setFilteredUsersArray(parsedUsersValue);
                const parsedGardensValue = JSON.parse(filteredGardensValue);
                setFilteredGardensArray(parsedGardensValue);
                if (usernameValue !== null) {
                    setUsername(usernameValue);
                    setUserValue({ item: usernameValue, id: usernameID }); // Set the initial value of userValue to the username
                }

            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, []);

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

        let startYearQuery = '';
        let endYearQuery = '';
        if (startYear.length > 2 && endYear.length > 2) {
            startYearQuery = startYear;
            endYearQuery = endYear;
        }

        if (userQuery) {
            url = api_url + '/harvest_log/?ordering=' + orderingGarden + "&garden="+ gardenQuery  + "&user=" + userQuery + '&start_year=' + startYear + '&end_year=' + endYear;
        }

        setData([])
        console.log(url)
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

        console.log("data must be fetched")
        // console.log(sortValue)
        // console.log(gardenValue)
        // console.log(userValue)
    },[sortValue, gardenValue, userValue, startYear, endYear, buttonPressed]);

    const handleGardenFilterChange = (selected) => {
        setGardenValue(selected);
    }

    const handleUserFilterChange = (selected) => {
        setUserValue(selected);
    }

    const handleFilterChange = (selected) => {
        setSortValue(selected);
    };
    // const handleButtonPress = () => {
    //     console.log("what am i")
    //     setButtonPressed(true)
    //     console.log(buttonPressed)
    //
    // };

    // console.log(filteredGardensArray)
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

    const renderItem = ({item}) => {
        const date = new Date(item.datetime);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const formattedDate = `${day}-${month}-${year}`;
        return (
            <View style={styles.LogCard}>
                <View style={{
                    height: 100,
                    marginLeft: 20,
                    paddingVertical: 12,
                    flex: 1,
                }}>
                    { data &&
                        <>
                            <Text style={{fontWeight: 'bold', fontSize: 16}}>
                                {item?.food_detail?.food ?? "No food found"}
                            </Text>
                            <Text style={{color: 'grey', fontSize: 12}}>
                                {item?.weight ?? "No weight found"} g
                            </Text>
                            <Text style={{color: 'grey', fontSize: 12}}>
                                {formattedDate}
                            </Text>
                            <Text style={{color: 'grey', fontSize: 12}}>
                                Garden: {item?.garden_detail?.name ?? "No garden found"}
                            </Text>
                            <Text style={{color: 'grey', fontSize: 12}}>
                                User: {item?.user?.username ?? "No user found"}
                            </Text>
                        </>
                    }
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon
                    name="arrow-back"
                    size={25}
                    onPress={() => navigation.goBack()}
                />
                <Text style={styles.headerText}>Harvest Log</Text>
            </View>
            <View style={[styles.filterContainer, { flexDirection: 'column' }]}>
                <SelectBox
                    label="Garden"
                    options={filteredGardensArray}
                    value={gardenValue}
                    onChange={handleGardenFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="User"
                    options={filteredUsersArray}
                    value={userValue}
                    onChange={handleUserFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="Sort By"
                    options={FILTER_OPTIONS}
                    value={sortValue}
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
                                // defaultOption={{key: 'SUP', value: 'SuperType'}}
                            />
                        </View>
                    </View>
                    {/*<View style={{ marginTop: 21, marginLeft: 5 }}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        style={{*/}
                    {/*            backgroundColor: 'purple',*/}
                    {/*            borderRadius: 12,*/}
                    {/*            paddingVertical: 14,*/}
                    {/*            paddingHorizontal: 16,*/}
                    {/*            alignItems: 'center',*/}
                    {/*            justifyContent: 'center',*/}
                    {/*        }}*/}
                    {/*        onPress={handleButtonPress}*/}
                    {/*    >*/}
                    {/*        <Text style={{ color: 'white', fontSize: 16 }}>Apply</Text>*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </View>
            {isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="purple" />
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
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        marginTop: 20
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
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
