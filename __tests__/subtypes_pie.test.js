import {expect, test} from "@jest/globals";
import subtypes_pie from "../src/consts/subtypes_pie";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(subtypes_pie).toHaveLength(65);
});
