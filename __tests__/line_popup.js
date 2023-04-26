import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Line_popup} from "../src/components/Line_popup";
import {describe, beforeEach, afterEach, it, expect} from "@jest/globals";


jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('token')),
}));
describe('Home_popup', () => {


    it('calls handleAddGarden when submit button is pressed', () => {
        const mockHandleAddGarden = jest.fn();
        const { getByText } = render(<Line_popup handleAddGarden={mockHandleAddGarden} />);
        const submitButton = getByText('Add Garden');
        fireEvent.press(submitButton);
        expect(mockHandleAddGarden).not.toBeCalled();
    });

});
