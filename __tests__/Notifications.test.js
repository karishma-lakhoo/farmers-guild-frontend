import React from 'react';
import { render } from '@testing-library/react-native';
import NotificationPage_final from '../src/screens_final/notifications';

describe('NotificationScreen', () => {
    it('should render welcome message', () => {
      const { getByText } = render(<NotificationScreen />);
  
      const welcomeText = getByText('Welcome!');
      expect(welcomeText).toBeDefined();
    });
  
    // Additional tests can be added to cover other scenarios or assertions
  });