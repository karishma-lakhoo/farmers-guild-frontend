import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HarvestWeightScreen from '../src/screens_final/HarvestWeight';

describe('HarvestWeightScreen', () => {
  it('should update the weight correctly', () => {
    const { getByPlaceholderText } = render(<HarvestWeightScreen />);

    const weightInput = getByPlaceholderText('Enter weight');
    fireEvent.changeText(weightInput, '10');

    expect(weightInput.props.value).toBe('10');
  });

  it('should handle submission correctly', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<HarvestWeightScreen />);

    const weightInput = getByPlaceholderText('Enter weight');
    fireEvent.changeText(weightInput, '10');

    const submitButton = getByText('Submit');
    fireEvent.press(submitButton);

    expect(consoleLogSpy).toHaveBeenCalledWith('Submitted weight:', '10');
    expect(weightInput.props.value).toBe('');

    consoleLogSpy.mockRestore();
  });
});
