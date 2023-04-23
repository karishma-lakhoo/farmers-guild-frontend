import {View, Text, Button, StyleSheet, Image, SafeAreaView, Pressable, Modal} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Icon from "react-native-vector-icons/MaterialIcons";
import dummy_data from "../consts/dummy_data";
import {VictoryPie, VictoryLegend, VictoryLabel } from "victory-native";
import {generateColorScale} from "../consts/pie_chart_colours"
import supertypes_pie from "../consts/supertypes_pie";
// const data = [
//     { x: 'Apples', y: 35 },
//     { x: 'Bananas', y: 40 },
//     { x: 'Cherries', y: 55 },
//     { x: 'Dates', y: 20 },
//     { x: 'Oranges', y: 25 },
// ];
// this is for all supertypes, types and subtypes
const iterations = dummy_data.length
console.log(dummy_data[0].supertype_count)
console.log(dummy_data[0].supertype_count.Flower)
if (typeof dummy_data[8] !== 'undefined') {
    console.log("month test")
    console.log(dummy_data.length)
};



function generateOutput(data, supertypeCountName, initialValues) {
    const supertypeCount = {};

    // Set initial values
    initialValues.forEach(item => {
        const key = Object.keys(item)[0];
        supertypeCount[key] = item[key];
    });

    // Sum up supertype counts
    data.forEach(item => {
        Object.entries(item[supertypeCountName]).forEach(([type, count]) => {
            if (supertypeCount[type] !== undefined) {
                supertypeCount[type] += count;
            }
        });
    });

    // Format output
    const output = [];
    Object.entries(supertypeCount).forEach(([type, count]) => {
        output.push({ x: type, y: count });
    });
    return output;
}

console.log("generated");
console.log(generateOutput(dummy_data, "supertype_count", supertypes_pie));
console.log("generated");

// const ddata = dummy_data[0].supertype_count
// console.log("ddata")
// console.log(ddata)
// const formattedData = Object.entries(ddata).map(([key, value], index) => ({
//     x: key,
//     y: value,
// }));
const formattedData = generateOutput(dummy_data, "supertype_count", supertypes_pie)
console.log(formattedData)

// console.log(formattedData);
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