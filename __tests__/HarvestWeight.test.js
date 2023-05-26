
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HarvestWeightScreen from '../src/screens_final/HarvestWeight';

it('should handle weight input and submit correctly', () => {
  const { getByPlaceholderText, getByText } = render(<HarvestWeightScreen />);

  const weightInput = getByPlaceholderText('Enter weight');
  expect(weightInput).toBeDefined();

  fireEvent.changeText(weightInput, { nativeEvent: { text: '10.5' } });
  expect(weightInput.props.value).toBe('10.5');

  const submitButton = getByText('Submit');
  expect(submitButton).toBeDefined();

  fireEvent.press(submitButton);
  expect(weightInput.props.value).toBe('');
});