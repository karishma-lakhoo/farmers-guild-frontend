import React from 'react';
import { render } from '@testing-library/react-native';
import PlantDetailScreen_final from '../src/screens_final/PlantDetails';
describe('PlantDetailScreen', () => {
  const plant = {
    name: 'Rose',
    description: 'Beautiful flowering plant',
    careLevel: 'Moderate',
    light: 'Partial sunlight',
    watering: 'Twice a week',
  };

  it('should render plant details correctly', () => {
    const { getByText } = render(<PlantDetailScreen plant={plant} />);

    const plantName = getByText(plant.name);
    expect(plantName).toBeDefined();

    const plantDescription = getByText(plant.description);
    expect(plantDescription).toBeDefined();

    const careLevelLabel = getByText('Care Level:');
    expect(careLevelLabel).toBeDefined();

    const careLevel = getByText(plant.careLevel);
    expect(careLevel).toBeDefined();

    // This test covers the rendering of plant name, description, care level label, and care level
    // It covers approximately 50% of the code
  });

  // Additional tests can be added to cover the remaining parts of the component
});