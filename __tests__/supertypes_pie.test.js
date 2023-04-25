import supertypes_pie from "../src/consts/supertypes_pie";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(supertypes_pie).toHaveLength(4);
});
