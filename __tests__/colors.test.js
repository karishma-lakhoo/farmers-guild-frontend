import COLORS from '../src/consts/colors.js';
import {expect, test} from "@jest/globals";

test('COLORS object contains expected properties', () => {
    expect(COLORS).toBeDefined();
    expect(COLORS.white).toBeDefined();
    expect(COLORS.dark).toBeDefined();
    expect(COLORS.primary).toBeDefined();
    expect(COLORS.secondary).toBeDefined();
    expect(COLORS.light).toBeDefined();
    expect(COLORS.grey).toBeDefined();
});
