import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {LineChart} from "react-native-chart-kit";
import COLORS from "../consts/colors";
import dummy_data from "../consts/dummy_data";
import { useRoute } from '@react-navigation/native';
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';

function getCategoryCounts(data, category, countObject) {
    const counts = new Array(12).fill(0);
    console.log(data);
    data?.forEach(item => {
        const count = item[countObject];
        if (category in count) {
            const month = item.month - 1; // month is 1-based, array is 0-based
            counts[month] += count[category];
        }
    });

    return counts;
}

const url = api_url + '/harvest_log/analytics/?start_year=2020&end_year=2022';

//const counts2 = getCategoryCounts(dummy_data, "Tomato", "subtype_count");
//console.log(counts2); // prints an array of length 12 with the count of Tomato for each month


const AnalyticsLineScreen = ({navigation}) => {



    const route = useRoute();
    const { category, subcategory , start_date, end_date} = route.params;
    const url = api_url + '/harvest_log/analytics/?start_year='+start_date+'&end_year='+end_date;


    // console.log("Selected category:", category);
    // console.log("Selected subcategory:", subcategory);
    console.log("Selected start date:", start_date);
    console.log("Selected start date:", end_date);

    const [counts, setCounts] = useState(new Array(12).fill(0));

    const [true_data, set_true_Data] = useState([{}])
    const [token, setToken] = useState('');

    useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('token');
                if (value !== null) {
                    setToken(value);
                }
            } catch (error) {
                console.log('Error retrieving data:', error);
                console.log()
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
        };


        fetch(url, {
            method: "GET",
            headers: headers
        })

            .then(resp => resp.json())
            .then(data => {
                
                
               //console.log(data);
                set_true_Data(data); // update the data state variable with the API response
                const categoryCounts = getCategoryCounts(data, subcategory, category);
                setCounts(categoryCounts);
                
            })
            .catch(error => console.log("error"))
    }, [token]); 

    // console.log(counts); // prints an array of length 12 with the count of Fruit for each month
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul","Aug", "Sept", "Oct", "Nov", "Dec"],
        datasets: [
            {
                data: counts,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: [subcategory+"s"+ " Yielded"] // optional
    };
    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };
    return (
        <SafeAreaView style={{backgroundColor: COLORS.primary, flex: 1}}>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()} style={{color:"white"}}/>
               <Text style = {{fontSize: 20, fontWeight: 'bold', color:"white"}}>Line Graph</Text>
            </View>
            <View style={styles.container}>
                <View>

                    <Text style={{color: 'white', marginLeft:10, marginBottom:10}}>{`From ${start_date} to ${end_date}`}</Text>
                    <LineChart
                        data={data} //change back to data?
                        width={Dimensions.get("window").width}
                        height={220}
                        chartConfig={chartConfig}
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AnalyticsLineScreen;