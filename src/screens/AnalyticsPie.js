import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import dummy_data from "../consts/dummy_data";
import {VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import {generateColorScale} from "../consts/pie_chart_colours"

// const data = [
//     { x: 'Apples', y: 35 },
//     { x: 'Bananas', y: 40 },
//     { x: 'Cherries', y: 55 },
//     { x: 'Dates', y: 20 },
//     { x: 'Oranges', y: 25 },
// ];
// this is for all supertypes, types and subtypes
const iterations = 2
console.log(dummy_data[0].supertype_count)
console.log(dummy_data[0].supertype_count.Flower)
if (typeof dummy_data[8] !== 'undefined') {
    console.log("month test")
    console.log(dummy_data.length)
};

const generateOutput = (data, option_count, iterations) => {
    let result = [];
    for(let i = 0; i < iterations; i++){
        const item = data[i % data.length];
        let tempResult = [];
        for (let category in item[option_count]) {
            tempResult.push({
                x: category,
                y: item[option_count][category]
            });
        }
        result.push(tempResult);
    }
    console.log("resultl")
    console.log(result)
    return result;
}
generateOutput(dummy_data, "supertype_count", 2)
// console.log(generateOutput(dummy_data, "supertype_count", 1))

const ddata = dummy_data[0].supertype_count
const formattedData = Object.entries(ddata).map(([key, value], index) => ({
    x: key,
    y: value,
}));

console.log(formattedData);
const AnalyticsPieScreen = ({navigation}) => {
    const [output, setOutput] = useState([]);

    const legendData = formattedData.map((datum) => ({ name: datum.x }));
    const colorScale = generateColorScale(formattedData.length);
    const total = formattedData.reduce((acc, curr) => acc + curr.y, 0);
    console.log(total)
    const percentageData = formattedData.map((datum) => ({
        name: `${datum.x} (${((datum.y / total) * 100).toFixed(2)}%)`,
    }));
    console.log(percentageData)

    return (
        <View>
            <VictoryPie
                data={formattedData}
                x="x"
                y="y"
                colorScale={colorScale}
                labels={() => null}/>
            <VictoryLegend
                data={percentageData}
                colorScale={colorScale}
            />
        </View>
    );
};


export default AnalyticsPieScreen;