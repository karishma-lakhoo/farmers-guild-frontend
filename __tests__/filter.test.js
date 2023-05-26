import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterScreen from '../src/screens_final/FilterScreen';

describe('FilterScreen', () => {
  it('should update the filter text correctly', () => {
    const { getByPlaceholderText } = render(<FilterScreen />);

    const filterInput = getByPlaceholderText('Enter filter text...');
    fireEvent.changeText(filterInput, 'example');
  
    expect(filterInput.props.value).toBe('example');
  });

  it('should apply the filter correctly', () => {
    const { getByText, getByPlaceholderText } = render(<FilterScreen />);
  
    const filterInput = getByPlaceholderText('Enter filter text...');
    fireEvent.changeText(filterInput, 'example');
  
    const applyButton = getByText('Apply');
    fireEvent.press(applyButton);
  
    // You can add additional assertions or check the console output if needed
  });
});
