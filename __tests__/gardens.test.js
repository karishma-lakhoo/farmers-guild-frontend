import gardens from "../src/consts/gardens";
import {expect, test} from "@jest/globals";
// Define the dummy_data array

test('dummy data array has length greater than one', () => {

    expect(gardens).toHaveLength(7);
});
