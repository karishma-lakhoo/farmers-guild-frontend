import supertypes from "../src/consts/supertypes";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(supertypes).toHaveLength(4);
});
