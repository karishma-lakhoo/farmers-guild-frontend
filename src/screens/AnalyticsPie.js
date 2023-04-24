import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal, ScrollView} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import dummy_data from "../consts/dummy_data";
import {VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import {generateColorScale} from "../consts/pie_chart_colours"
import supertypes_pie from "../consts/supertypes_pie";
import subtypes_pie from "../consts/subtypes_pie";
import super_to_type_pie from "../consts/super_to_type_pie";
import type_to_sub from "../consts/type_to_sub";
import AsyncStorage from '@react-native-async-storage/async-storage';
// console.log(super_to_type_pie[0]["Fruit"])
import types_pie from "../consts/types_pie";
import { api_url } from "../consts/api_url";
import { useRoute } from '@react-navigation/native';


// const data = [
//     { x: 'Apples', y: 35 },
//     { x: 'Bananas', y: 40 },
//     { x: 'Cherries', y: 55 },
//     { x: 'Dates', y: 20 },
//     { x: 'Oranges', y: 25 },
// ];
// this is for all supertypes, types and subtypes
const url = api_url + '/harvest_log/analytics/?start_year=2020&end_year=2022'; 


function generateOutputAll(data, supertypeCountName, initialValues) {
    const supertypeCount = {};

    // Set initial values
    initialValues.forEach(item => {
        const key = Object.keys(item)[0];
        supertypeCount[key] = item[key];
    });

    // Sum up supertype counts
    data?.forEach(item => {
        Object.entries(item[supertypeCountName]).forEach(([type, count]) => {
            if (supertypeCount[type] !== undefined) {
                supertypeCount[type] += count;
            }
        });
    });
    // console.log("hehehe")
    // console.log(supertypeCount)
    // Format output
    const output = [];
    Object.entries(supertypeCount).forEach(([type, count]) => {
        output.push({ x: type, y: count });
    });
    return output;
}
function generateOutput2(data, countName1, countName2, initialValues) {
    const supertypeCount = {};

    // console.log(initialValues)
    // Set initial values
    initialValues.forEach(item => {
        // console.log(item)
        const key = countName2;
        supertypeCount[key] = item[key];
    });
    console.log("dictionary")
    console.log(supertypeCount)
    if(countName1 === "supertype_count"){
        // Sum up supertype counts
        data?.forEach(item => {
            for (const [key, value] of Object.entries(item["type_count"])) {
                for (let thing of supertypeCount[countName2]) {
                    if (key in thing) {
                        thing[key] += value;
                    }
                }

            }
        });
    }
    if(countName1 === "type_count"){
        // Sum up supertype counts
        data?.forEach(item => {
            for (const [key, value] of Object.entries(item["subtype_count"])) {
                for (let thing of supertypeCount[countName2]) {
                    if (key in thing) {
                        thing[key] += value;
                    }
                }

            }
        });
    }
    // Format output
    const output = [];
    for (let i =0; i < supertypeCount[countName2].length; i++){
        Object.entries(supertypeCount[countName2][i]).forEach(([type, count]) => {
            output.push({ x: type, y: count });
        });
    }
    return output;
} 


{/*function generateOutput2(data, countName1, countName2, initialValues) {
    const supertypeCount = {};
  
    // Set initial values
    initialValues.forEach(item => {
      const key = item[countName2];
      supertypeCount[key] = {};
      for (let type of subtypes_pie) {
        supertypeCount[key][type] = 0;
      }
    });
  
    // Sum up supertype counts
    data.forEach(item => {
      Object.entries(item[countName1]).forEach(([type, count]) => {
        const subtype = type_to_sub[type];
        if (subtype && supertypeCount[subtype] !== undefined) {
          supertypeCount[subtype][type] += count;
        }
      });
    });
  
    // Format output
    const output = [];
    for (let [supertype, subtypes] of Object.entries(supertypeCount)) {
      Object.entries(subtypes).forEach(([subtype, count]) => {
        output.push({ x: subtype, y: count, label: supertype });
      });
    }
    return output;
  } */}
  
  
  
  
  
  
  
  
// console.log("generated");
const test1 = "type_count";
const test2 = "Citrus";
// console.log(generateOutput2(dummy_data, test1, test2, type_to_sub));
// console.log("generated");


// if it is ALL

// console.log("formatted data")
// console.log(formattedData)

// console.log(formattedData);
const AnalyticsPieScreen = ({navigation}) => {


   
    //start of fetch request



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
                
                
               
                set_true_Data(data); // update the data state variable with the API response
                
            })
            .catch(error => console.log("error"))
    }, [token]); 

   

    
    


    //console.log("Pratham loves alisha")
    //console.log(true_data);
    //console.log("Pratham still loves that bish");
   // console.log("true data is as follows ///////////////////")
  //  console.log(true_data);
   // console.log("true data is above ///////////////////")

   



    //end of fetch request





    {/*useEffect(() => {
        if (true_data.length > 3) {
          // Code that depends on true_data goes here
          console.log("This is the true data bbleeeeeeeeehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ///////////")
    console.log(true_data)
    console.log("This is the true data ///////////")
        }
      }, [true_data]);  */}



      console.log("This is the true data bbleeeeeeeeehhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh ///////////")
    console.log(true_data)
    console.log("This is the true data ///////////")


    const route = useRoute();
    const { category, subcategory } = route.params;
  //  console.log("Selected category:", category);
  //  console.log("Selected subcategory:", subcategory);
    // const formattedData = generateOutputAll(dummy_data, category, subtypes_pie)
    
    
    let formattedData;
    if(subcategory === "All Supertypes" || subcategory === "All Types" || subcategory === "All Subtypes" ){
        if(category === "supertype_count"){

           


            formattedData = generateOutputAll(true_data?.true_data, category, supertypes_pie)

            

        }
        if(category === "type_count"){
            formattedData = generateOutputAll(true_data?.true_data, category, types_pie)

        }
        if(category === "subtype_count"){
            formattedData = generateOutputAll(true_data?.true_data, category, subtypes_pie)

        }
    }
    else{
        if(category === "supertype_count"){
            formattedData = generateOutput2(true_data?.true_data, category, subcategory, super_to_type_pie)
        }
        if(category === "type_count"){
            formattedData = generateOutput2(true_data?.true_data, category, subcategory, type_to_sub)
        }
    }

    const [output, setOutput] = useState([]);

    const legendData = formattedData?.map((datum) => ({ name: datum.x }));
    const colorScale = generateColorScale(formattedData?.length);
    const total = formattedData?.reduce((acc, curr) => acc + curr.y, 0);
    const percentageData = formattedData?.map((datum) => ({
        name: `${datum.x} (${((datum.y / total) * 100).toFixed(2)}%)`,
    }));
    console.log(percentageData)

    return (


        
        
        <View>
            <View style={styles.header}>
                <Icon name = "arrow-back-ios" size={28} onPress={() => navigation.goBack()}/>
                <Text style = {{fontSize: 20, fontWeight: 'bold'}}>Pie Chart</Text>
            </View>
            <VictoryPie
                data={formattedData?.formattedData}
                //true_data = {data}
                x="x"
                y="y"
                colorScale={colorScale}
                labels={() => null}/>
            <ScrollView>
                <View style={{ flexDirection: 'row' }}>
                    <VictoryLegend
                        orientation="vertical"
                        gutter={20}
                        colorScale={colorScale}
                        data={percentageData}
                    />
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingVertical: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
});

export default AnalyticsPieScreen;