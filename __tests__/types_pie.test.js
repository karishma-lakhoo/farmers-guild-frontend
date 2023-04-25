import {expect, test} from "@jest/globals";
import types_pie from "../src/consts/types_pie";
// Define the dummy_data array

test('array has length greater than one', () => {

    expect(types_pie).toHaveLength(19);
});
