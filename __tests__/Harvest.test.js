import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HarvestScreen_final from '../src/screens_final/Harvest';


describe('HarvestScreen', () => {
  it('should call the onHarvest function when the Harvest button is pressed', () => {
    const mockOnHarvest = jest.fn();
    const { getByText } = render(<HarvestScreen cropName="Tomatoes" onHarvest={mockOnHarvest} />);

    const harvestButton = getByText('Harvest');
    fireEvent.press(harvestButton);

    expect(mockOnHarvest).toHaveBeenCalledTimes(1);
  });

  it('should not render the crop name if it is not provided', () => {
    const { queryByTestId } = render(<HarvestScreen onHarvest={() => {}} />);
    
    const cropNameText = queryByTestId('crop-name');
    expect(cropNameText).toBeNull();
  });
});