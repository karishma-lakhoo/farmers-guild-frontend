import dummy_data from "../src/consts/dummy_data";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(dummy_data).toHaveLength(12);
});
