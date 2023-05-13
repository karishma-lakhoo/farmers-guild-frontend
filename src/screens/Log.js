import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, Button, StyleSheet, View, Image, Alert, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectBox from 'react-native-multi-selectbox'
import { xorBy } from 'lodash'
import foods from "../consts/foods";
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const [defaultValue, setDefaultValue] = useState(FILTER_OPTIONS[0]);
    const [gardenOptions, setGardenOptions] = useState(GARDEN_OPTIONS);
    const [selectedTeam1, setSelectedTeam1] = useState(GARDEN_OPTIONS[0]);
    const [selectedTeam2, setSelectedTeam2] = useState({});
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    const [filteredGardensArray, setFilteredGardensArray] = useState([]);
    const [filteredUsersArray, setFilteredUsersArray] = useState([]);
    const [defaultGardenValue, setDefaultGardenValue] = useState(GARDEN_OPTIONS[0]);
    const [defaultUserValue, setDefaultUserValue] = useState(selectedTeam2);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // get username, gardens, users to populate dropdowns
                const usernameValue = await AsyncStorage.getItem('username');
                const filteredGardensValue = await AsyncStorage.getItem('filteredGardensArray');
                const filteredUsersValue = await AsyncStorage.getItem('filteredUsersArray');
                const usernameID = await AsyncStorage.getItem('usernameID')
                console.log("asdfasdf")
                console.log(usernameID)
                const parsedUsersValue = JSON.parse(filteredUsersValue);
                setFilteredUsersArray(parsedUsersValue);
                const parsedGardensValue = JSON.parse(filteredGardensValue);
                setFilteredGardensArray(parsedGardensValue);
                if (usernameValue !== null) {
                    setUsername(usernameValue);
                    setSelectedTeam2({ item: usernameValue, id: usernameID }); // Set the initial value of selectedTeam2 to the username
                }

            } catch (error) {
                console.log('Error retrieving data:', error);
            }
        };
        fetchData();
    }, []);

    const handleGardenFilterChange = (selected) => {
        setPageNumber(2)
        setDefaultGardenValue(selected);
        setData([])
        setIsLoading(true);
        //  when a specific garden is selected
        if(selected.id !== "AG"){
        //     based on ordering - "ON"
            if (defaultValue.id === "ON"){
                // If All Users are Specified
                if (selectedTeam2.item === "All Users"){
                    url = api_url + '/harvest_log/?ordering=datetime&garden=' + selected.item + "&user=All Users";
                }
                // If specific user is chosen
                else{
                    url = api_url + '/harvest_log/?ordering=datetime&garden=' + selected.item + "&user=" + selectedTeam2.id;
                }
            }
            // if the ordering - "NO"
            else{
                // If All Users are Specified
                if (selectedTeam2.item === "All Users"){
                    url = api_url + '/harvest_log/?ordering=-datetime&garden=' + selected.item + "&user=All Users";
                }
                // If specific user is chosen
                else{
                    url = api_url + '/harvest_log/?ordering=-datetime&garden=' + selected.item + "&user=" + selectedTeam2.id;
                }
            }
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
        }
        // when all gardens are selected
        else{
            let allGardensUrl = '';
            for (let i= 1; i < filteredGardensArray.length; i++){
                allGardensUrl += "&garden="+filteredGardensArray[i].item.toString();
            }
            console.log(allGardensUrl)
            //     based on ordering - oldest to newest
            if (defaultValue.id === "ON"){
                // If All Users are Specified
                if (selectedTeam2.item === "All Users"){
                    url = api_url + '/harvest_log/?ordering=datetime' + allGardensUrl + "&user=All Users";
                }
                // If specific user is chosen
                else{
                    url = api_url + '/harvest_log/?ordering=datetime' + allGardensUrl + "&user=" + selectedTeam2.id;
                }
            }
            // if the ordering is newest to oldest
            else{
                // If All Users are Specified
                if (selectedTeam2.item === "All Users"){
                    url = api_url + '/harvest_log/?ordering=-datetime' + allGardensUrl + "&user=All Users";
                }
                // If specific user is chosen
                else{
                    url = api_url + '/harvest_log/?ordering=-datetime' + allGardensUrl + "&user=" + selectedTeam2.id;
                }
                url = api_url + '/harvest_log/?ordering=-datetime' + allGardensUrl;
            }
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
        }
    }


    const handleUserFilterChange = (selected) => {
        setPageNumber(2)
        setSelectedTeam2(selected);
        setData([])
        setIsLoading(true);
        // when all users are specified
        if (selected.item === "All Users"){
            // ALL Gardens specified
            let allGardensUrl = '';
            for (let i= 1; i < filteredGardensArray.length; i++){
                allGardensUrl += "&garden="+filteredGardensArray[i].item.toString();
            }
            console.log("user all goardens")
            console.log(allGardensUrl)
            if (defaultGardenValue.item === "All Gardens"){
                //     if ordering = "ON"
                if(defaultValue.id === "ON"){
                    url = api_url + '/harvest_log/?ordering=datetime' + allGardensUrl + "&user=All Users" ;
                }
                //     if ordering = "NO"
                if(defaultValue.id === "NO"){
                    url = api_url + '/harvest_log/?ordering=-datetime' + allGardensUrl + "&user=All Users";
                    console.log(url)
                }
            }
            // Specific garden chosen
            else{
                //     if ordering = "ON"
                if(defaultValue.id === "ON"){
                    url = api_url + '/harvest_log/?ordering=datetime&garden=' + defaultGardenValue.item + "&user=All Users";
                }
                //     if ordering = "NO"
                if(defaultValue.id === "NO"){
                    url = api_url + '/harvest_log/?ordering=-datetime&garden=' + defaultGardenValue.item + "&user=All Users";
                }
            }
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
        }
        // when a user is specified
        else{
            // ALL Gardens specified
            let allGardensUrl = '';
            for (let i= 1; i < filteredGardensArray.length; i++){
                allGardensUrl += "&garden="+filteredGardensArray[i].item.toString();
            }
            if (defaultGardenValue.item === "All Gardens"){
            //     if ordering = "ON"
                if(defaultValue.id === "ON"){
                    url = api_url + '/harvest_log/?ordering=datetime' + allGardensUrl + "&user=" + selected.id;
                }
            //     if ordering = "NO"
                if(defaultValue.id === "NO"){
                    url = api_url + '/harvest_log/?ordering=-datetime' + allGardensUrl + "&user=" + selected.id;
                }
            }
            // Specific garden chosen
            else{
                //     if ordering = "ON"
                if(defaultValue.id === "ON"){
                    url = api_url + '/harvest_log/?ordering=datetime&garden=' + defaultGardenValue.item + "&user=" + selected.id;
                }
                //     if ordering = "NO"
                if(defaultValue.id === "NO"){
                    url = api_url + '/harvest_log/?ordering=-datetime&garden=' + defaultGardenValue.item + "&user=" + selected.id;
                }
            }
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
        }
    }

    const handleFilterChange = (selected) => {
        setPageNumber(2)
        setDefaultValue(selected);
        setData([]); // Empty the data array
        setIsLoading(true); // Set isLoading to true
        if (selected.id === 'NO') {
            // if "NO" ordering is done on all gardens
            if(defaultGardenValue.id === "AG"){
                url = api_url + '/harvest_log/?ordering=-datetime';
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
            }
            // if "NO" ordering is done on a specific garden
            else{
                url = api_url + '/harvest_log/?ordering=-datetime&garden=' + defaultGardenValue.item;
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
            }
        // ordering = Oldest to Newest
        } else {
            // if "ON" ordering is done on all gardens
            if(defaultGardenValue.id === "AG"){
                url = api_url + '/harvest_log/?ordering=datetime';
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
            }
            // if "ON" ordering is done on specific garden
            else{
                url = api_url + '/harvest_log/?ordering=datetime&garden=' + defaultGardenValue.item;
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
            }

        }
    };

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
                    value={defaultGardenValue}
                    onChange={handleGardenFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="User"
                    options={filteredUsersArray}
                    value={selectedTeam2}
                    onChange={handleUserFilterChange}
                />
                <Text></Text>
                <SelectBox
                    label="Sort By"
                    options={FILTER_OPTIONS}
                    value={defaultValue}
                    onChange={handleFilterChange}
                />
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
