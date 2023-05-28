import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal, Dimensions} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import {LineChart} from "react-native-chart-kit";
import COLORS from "../consts/colors";
import dummy_data from "../consts/dummy_data";
import { useRoute } from '@react-navigation/native';
import { api_url } from "../consts/api_url";
import AsyncStorage from '@react-native-async-storage/async-storage';

function getCategoryCounts(data, category, countObject) { //all types, typecount
    let counts;
    counts = new Array(12).fill(0);
    console.log(data)
    console.log(category)

    data?.forEach(item => {
        const count = item[countObject];
        console.log(count)
        if (category === "All Supertypes" || category === "All Types" || category === "All Subtypes" ){
            const total = Object.values(count).reduce((acc, curr) => acc + curr, 0);
            console.log("Bleh")
            console.log(total)
            const month = item.month - 1; // month is 1-based, array is 0-based
            counts[month] += total
        }
        else if (category in count) {
            const month = item.month - 1; // month is 1-based, array is 0-based
            counts[month] += count[category];
        }
    });

    // if (start_date!== end_date){
    //     counts = counts.slice(0, (end_date-start_date)+1);
    // }

    console.log(counts);
    return counts;
}



// get the sum of each category over time period
function getCategoryCounts2(data, category, countObject, start_date, end_date) {
    // console.log(countObject)
    // console.log(category)

    const counts =[]
    // console.log(counts)
    // console.log(data)

    const sumsByYear = {};
    data?.forEach(item => {
        const count = item[countObject];
        const year = item.year;
        const categoryCounts = sumsByYear[year] || {};
        Object.keys(count).forEach(category => {
            categoryCounts[category] = (categoryCounts[category] || 0) + count[category];
        });
        sumsByYear[year] = categoryCounts;
    });

    Object.keys(sumsByYear).forEach(year => {
        const yearValues = sumsByYear[year];
        let sum = 0;
        if (category === "All Supertypes" || category === "All Types" || category === "All Subtypes") {
            Object.keys(yearValues).forEach(cat => {
                sum += yearValues[cat];
            });
        } else if (category in yearValues) {
            sum = yearValues[category];
        }
        counts.push(sum);

    });


    console.log(sumsByYear);
    //
    console.log(counts)

    // if (start_date!== end_date){
    //     counts = counts.slice(0, (end_date-start_date)+1);
    // }


    return counts;
}

//const counts2 = getCategoryCounts(dummy_data, "Tomato", "subtype_count");
//console.log(counts2); // prints an array of length 12 with the count of Tomato for each month


const AnalyticsLineScreen = ({navigation}) => {
    // State variables
    const route = useRoute();
    const { category, subcategory , start_date, end_date} = route.params;
    // url with start and end years that come from the previous filter screen
    const url = api_url + '/harvest_log/analytics/?start_year='+start_date+'&end_year='+end_date;
    console.log(category)
    console.log(subcategory)

    // console.log("Selected category:", category);
    // console.log("Selected subcategory:", subcategory);
    // console.log("Selected start date:", start_date);
    // console.log("Selected start date:", end_date);

    const [counts, setCounts] = useState(new Array(12).fill(0));

    const [true_data, set_true_Data] = useState([{}])
    const [token, setToken] = useState('');
    //  get the bearer token from the database
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
    // GET request to get all harvest done from the harvest Analytics url
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
                if (start_date === end_date){
                    const categoryCounts = getCategoryCounts(data, subcategory, category); //type_count, all types
                    setCounts(categoryCounts);
                }
                else{
                    const categoryCounts = getCategoryCounts2(data, subcategory, category,start_date,end_date);
                    setCounts(categoryCounts);
                }


                
            })
            .catch(error => console.log("error"))
    }, [token]); 

    // console.log(counts); // prints an array of length 12 with the count of Fruit for each month if time period of 1 year is chosen
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
    // displays multiple years if time period is greater than one year
    const yearLabels = [];
    for (let i = start_date; i <= end_date; i++) {
        yearLabels.push(`Year ${i - start_date + 1}`);
    }

    const data2 = {
        labels: yearLabels,
        datasets: [
            {
                data: counts,
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: [subcategory+"s"+ " Yielded"] // optional
    };
    // setting colors of the graph screen
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
                {/*back arrow*/}
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()} style={{color:"white"}}/>
               <Text style = {{fontSize: 20, fontWeight: 'bold', color:"white"}}>Line Graph</Text>
            </View>
            <View style={styles.container}>
                {/*for time period of 1 year*/}
                {start_date === end_date ? (
                    <View>
                        <Text style={{ color: "white", marginLeft: 10, marginBottom: 10 }}>
                            {`From ${start_date} to ${end_date}`}
                        </Text>
                        <LineChart
                            data={data}
                            width={Dimensions.get("window").width}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>
                ) : (
                    // for time period with multiple years
                    <View>
                        <Text style={{ color: "white", marginLeft: 10, marginBottom: 10 }}>
                            {`From ${start_date} to ${end_date}`}
                        </Text>
                        <LineChart
                            data={data2}
                            width={Dimensions.get("window").width}
                            height={220}
                            chartConfig={chartConfig}
                        />
                    </View>
                )}
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