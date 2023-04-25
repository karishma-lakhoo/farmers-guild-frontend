import {foods} from "../src/consts/foods";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(foods).toHaveLength(3);
});
