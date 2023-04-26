import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, Button, StyleSheet, View, Image, Alert} from 'react-native';
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

const url = api_url + '/harvest_log/?ordering=-datetime';

const LogScreen = ({navigation}) => {
    const controller = useRef(new AbortController());
    const [defaultValue, setDefaultValue] = useState(FILTER_OPTIONS[0]);
    const [gardenOptions, setGardenOptions] = useState(GARDEN_OPTIONS);
    const [selectedTeam1, setSelectedTeam1] = useState(GARDEN_OPTIONS[0]);
    const [selectedTeam2, setSelectedTeam2] = useState({});
    const [data, setData] = useState([]);
    const [token, setToken] = useState('');
    const [pageNumber, setPageNumber] = useState(1);
    function onChange1() {
        return (val) => setSelectedTeam1(val)
    }

    const loadMoreData = () => {
        fetch(`${url}&page=${pageNumber}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            signal: controller.current.signal,
        })
            .then(resp => resp.json())
            .then(response => {
                const nextPage = response.next;
                const newData = response.results;
                setData(prevData => [...prevData, ...newData]);
                if (nextPage !== null) {
                    setPageNumber(prevPageNumber => prevPageNumber + 1);
                }
            })
            .catch(error => console.log(error));
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
                            <Text style={{color: 'grey', fontSize: 16}}>
                                {formattedDate}
                            </Text>
                            <Text style={{color: 'grey', fontSize: 16}}>
                                Garden: {item?.garden_detail?.name ?? "No garden found"}
                            </Text>
                        </>
                    }
                </View>
            </View>
        );
    };
    const handleFilterChange = (selected) => {
        setDefaultValue(selected);
        if (selected.id === 'NO') {
            setData(prevData => prevData.sort((a, b) => new Date(b.datetime) - new Date(a.datetime)));
        } else {
            setData(prevData => prevData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)));
        }
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
                    options={gardenOptions}
                    value={gardenOptions[0]}
                    onChange={onChange1}
                />
                <SelectBox
                    label="Sort By"
                    options={FILTER_OPTIONS}
                    value={defaultValue}
                    onChange={handleFilterChange}
                />
            </View>
            <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    <View style={styles.footer}>
                        <Button title="Load More" onPress={loadMoreData} />
                    </View>
                }
            />
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
});

export default LogScreen;
