import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlantDetailsScreen from './PlantDetailsScreen';

describe('<PlantDetailsScreen />', () => {
    const mockNavigation = {
        navigate: jest.fn(),
    };

    it('renders correctly', () => {
        const { getByText } = render(<PlantDetailsScreen navigation={mockNavigation} />);
        expect(getByText('Details')).toBeTruthy();
    });

    it('calls onAddPlant and navigates to Home when button is pressed', () => {
        const { getByTestId } = render(<PlantDetailsScreen navigation={mockNavigation} />);
        fireEvent.press(getByTestId('plant-it-button'));
        expect(mockNavigation.navigate).toHaveBeenCalledWith('Home');
    });
});