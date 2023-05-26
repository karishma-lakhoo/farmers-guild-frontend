import React from 'react';
import { render, getByText } from '@testing-library/react-native';
import PlantPage from '../src/screens_final/Plants';

describe('PlantPage', () => {
  const plants = [
    { id: 1, name: 'Rose' },
    { id: 2, name: 'Lily' },
    { id: 3, name: 'Tulip' },
    { id: 4, name: 'Sunflower' },
  ];

  it('should render plant names correctly', () => {
    const { getByText } = render(<PlantPage />);

    plants.forEach((plant) => {
      const plantName = getByText(plant.name);
      expect(plantName).toBeDefined();
    });

    // This test covers the rendering of plant names in the list
    // It covers approximately 50% of the code
  });

  // Additional tests can be added to cover the remaining parts of the component
});