import { generateColorScale } from '../src/consts/pie_chart_colours';
import {describe, expect, it} from "@jest/globals";

describe('generateColorScale', () => {
    it('should generate color scale array with correct length', () => {
        const length = 5;
        const colors = generateColorScale(length);
        expect(colors.length).toBe(length);
    });

    it('should generate color scale array with correct colors', () => {
        const length = 10;
        const colors = generateColorScale(length);
        const expectedColors = [      '#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600', '#4CAF50', '#E91E63'    ];
        for (let i = 0; i < length; i++) {
            expect(colors[i]).toBe(expectedColors[i % expectedColors.length]);
        }
    });
});
