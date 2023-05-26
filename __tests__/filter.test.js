
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FilterScreen_final from '../src/screens_final/Analytics_filter';

describe('FilterScreen', () => {
  it('should apply the filter when the Apply button is pressed', () => {
    const mockApplyFilter = jest.fn();
    const { getByPlaceholderText, getByText } = render(<FilterScreen applyFilter={mockApplyFilter} />);

    const filterInput = getByPlaceholderText('Enter filter text...');
    fireEvent.changeText(filterInput, 'example filter');

    const applyButton = getByText('Apply');
    fireEvent.press(applyButton);

    expect(mockApplyFilter).toHaveBeenCalledWith('example filter');
  });
});