import React from 'react';
import {describe, it, expect, test} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import {Home_popup} from '../src/components/Home_popup';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('token')),
}));

describe('Home_popup', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Home_popup />);
        expect(getByPlaceholderText('Garden Name')).toBeTruthy();
        expect(getByText('Add Garden')).toBeTruthy();
        expect(getByText('Close')).toBeTruthy();
    });


    test('closes the popup when Close button is pressed', () => {
        const changeModalVisible = jest.fn();
        const setData = jest.fn();
        const changeAddGardenPopupVisible = jest.fn();
        const { getByText } = render(
            <Home_popup changeModalVisible={changeModalVisible} setData={setData} changeAddGardenPopupVisible={changeAddGardenPopupVisible} />
        );
        const closeButton = getByText('Close');

        // Press the Close button
        fireEvent.press(closeButton);

        // Assert that the popup is closed
        expect(changeModalVisible).toHaveBeenCalledWith(false);
        expect(setData).toHaveBeenCalledWith('Close');
        expect(changeAddGardenPopupVisible).toHaveBeenCalledWith(false);
    });
});
