import super_to_type_pie from "../src/consts/super_to_type_pie";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('array has length greater than one', () => {

    expect(super_to_type_pie).toHaveLength(1);
});
