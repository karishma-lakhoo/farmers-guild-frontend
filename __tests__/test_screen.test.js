import {describe, expect, it} from "@jest/globals";
import { render } from "@testing-library/react-native";
import TestScreen from "../src/screens/Test_screen";

describe("TestScreen", () => {
    it("renders the 'hello' text", () => {
        const { queryByText } = render(<TestScreen />);
        expect(queryByText("hello")).not.toBeNull();
    });
});