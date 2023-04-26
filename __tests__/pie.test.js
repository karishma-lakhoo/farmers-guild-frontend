import React from 'react';
import {describe, it, expect, test} from '@jest/globals';
import { render, fireEvent } from '@testing-library/react-native';
import {Home_popup} from '../src/components/Home_popup';
import {pie_popup} from "../src/components/pie";

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(() => Promise.resolve('token')),
}));

describe('pie_popup', () => {
    test('closes the popup when Close is pressed', () => {
        const changeAddGardenPopupVisible = jest.fn();
        const changeModalVisible = jest.fn();
        const setData = jest.fn();
        const { getByText } = render(
            <Home_popup changeModalVisible={changeModalVisible} setData={setData} changeAddGardenPopupVisible={changeAddGardenPopupVisible} />
        );
        const closeButton = getByText('Close')
        fireEvent.press(closeButton);
        expect(changeModalVisible).toHaveBeenCalledWith(false);
        expect(setData).toHaveBeenCalledWith('Close');
        expect(changeAddGardenPopupVisible).toHaveBeenCalledWith(false);
    });
});
