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
// console.log(super_to_type_pie[0]["Fruit"])
import types_pie from "../consts/types_pie";
// const data = [
//     { x: 'Apples', y: 35 },
//     { x: 'Bananas', y: 40 },
//     { x: 'Cherries', y: 55 },
//     { x: 'Dates', y: 20 },
//     { x: 'Oranges', y: 25 },
// ];
// this is for all supertypes, types and subtypes
function generateOutputAll(data, supertypeCountName, initialValues) {
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
    console.log("hehehe")
    console.log(supertypeCount)
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
        data.forEach(item => {
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
        data.forEach(item => {
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



console.log("generated");
const test1 = "type_count";
const test2 = "Citrus";
console.log(generateOutput2(dummy_data, test1, test2, type_to_sub));
console.log("generated");


// if it is ALL
const formattedData = generateOutput2(dummy_data, test1, test2, type_to_sub)
console.log("formatted data")
console.log(formattedData)

// console.log(formattedData);
const AnalyticsPieScreen = ({navigation}) => {
    const [output, setOutput] = useState([]);

    const legendData = formattedData.map((datum) => ({ name: datum.x }));
    const colorScale = generateColorScale(formattedData.length);
    const total = formattedData.reduce((acc, curr) => acc + curr.y, 0);
    // console.log(total)
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


export default AnalyticsPieScreen;