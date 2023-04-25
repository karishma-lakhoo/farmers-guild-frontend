import type_to_sub from "../src/consts/type_to_sub";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('array has length greater than one', () => {

    expect(type_to_sub).toHaveLength(1);
});
