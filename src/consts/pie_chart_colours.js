// export const pieChartColorScale = [
//     '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#4CAF50', '#E91E63',
//     '#607D8B', '#9C27B0', '#8BC34A', '#FFC107', '#03A9F4', '#FF9800', '#9E9E9E', '#673AB7', '#795548', '#2196F3',
//     '#f44336', '#9c27b0', '#e91e63', '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50',
//     '#009688', '#00bcd4', '#03a9f4', '#2196f3', '#3f51b5', '#5677fc', '#2a2e3b', '#dc4c46', '#672E3B', '#8C3B4A',
//     '#E38E84', '#6B5B95', '#C06C84', '#F67280', '#6C5B7B', '#355C7D', '#8C5E58', '#E8A87C', '#F9D56E', '#8D8741',
//     '#E27D60', '#C38D9E', '#BFB5AF', '#9B9B7A', '#F0B67F', '#FE5F55', '#F8B195', '#F67280', '#C06C84', '#6C5B7B',
//     '#355C7D', '#8C5E58', '#E8A87C', '#F9D56E', '#8D8741', '#E27D60', '#C38D9E', '#BFB5AF', '#9B9B7A', '#F0B67F'
// ];
export const generateColorScale = (dataLength) => {
    const colors = [
        '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#4CAF50', '#E91E63',
        '#607D8B', '#9C27B0', '#8BC34A', '#FFC107', '#03A9F4', '#FF9800', '#9E9E9E', '#673AB7', '#795548', '#2196F3',
        '#f44336', '#9c27b0', '#e91e63', '#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a', '#4caf50',
        '#009688', '#00bcd4', '#03a9f4', '#2196f3', '#3f51b5', '#5677fc', '#2a2e3b', '#dc4c46', '#672E3B', '#8C3B4A',
        '#E38E84', '#6B5B95', '#C06C84', '#F67280', '#6C5B7B', '#355C7D', '#8C5E58', '#E8A87C', '#F9D56E', '#8D8741',
        '#E27D60', '#C38D9E', '#BFB5AF', '#9B9B7A', '#F0B67F', '#FE5F55', '#F8B195', '#F67280', '#C06C84', '#6C5B7B',
        '#355C7D', '#8C5E58', '#E8A87C', '#F9D56E', '#8D8741', '#E27D60', '#C38D9E', '#BFB5AF', '#9B9B7A', '#F0B67F'
    ];
    const colorScale = [];
    for (let i = 0; i < dataLength; i++) {
        colorScale.push(colors[i % colors.length]);
    }
    return colorScale;
};
