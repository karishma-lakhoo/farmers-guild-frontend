import React from 'react';
import { describe, it, expect, test } from '@jest/globals';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { MyContext } from '../App';
import PlantDetailsScreen from '../src/screens/PlantDetails';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('PlantDetailsScreen', () => {
    let component;

    const myState = {
        id: 1,
        food: 'Tomato',
        sow: 'March, April',
        plant: 'May, June',
        harvest_info: 'June, July, August',
        sun: 'Full sun',
        ph: '6.0 - 7.0',
        subtype: 'Fruit',
        type: 'Vegetable',
        supertype: 'Annual',
        description: 'Delicious, nutritious and easy to grow.',
    };

    const navigation = {
        navigate: jest.fn(),
    };

    beforeEach(() => {
        jest.clearAllMocks();
        component = (
            <MyContext.Provider value={{ myState }}>
                <PlantDetailsScreen navigation={navigation} />
            </MyContext.Provider>
        );
    });

    it('renders the screen', async () => {
        render(component);
        await act(async () => {});
        AsyncStorage.getItem.mockReturnValue('test-value');
        expect(AsyncStorage.getItem).toHaveBeenCalledWith('gardenId');
    });

    it('adds a plant to the garden', async () => {
        AsyncStorage.getItem.mockReturnValue('1');
        AsyncStorage.getItem.mockReturnValue('test-token');
        global.fetch = jest.fn().mockImplementation(() => ({
            status: 201,
        }));
        const { getByTestId } = render(component);
        await act(async () => {});
        fireEvent.press(getByTestId('plant-it-button'));
        await waitFor(() => expect(navigation.navigate).toHaveBeenCalledWith('Home'));
    });

    it('handles error when adding a plant', async () => {
        AsyncStorage.getItem.mockReturnValue('1');
        AsyncStorage.getItem.mockReturnValue('test-token');
        global.fetch = jest.fn().mockImplementation(() => ({
            status: 400,
        }));
        const { getByTestId } = render(component);
        await act(async () => {});
        fireEvent.press(getByTestId('plant-it-button'));
        await waitFor(() => expect(console.error).toHaveBeenCalled());
    });
});
