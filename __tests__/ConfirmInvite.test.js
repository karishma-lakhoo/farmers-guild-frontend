import React from 'react';
import { render } from '@testing-library/react-native';
import ConfirmInviteScreen_final from '../src/screens_final/Confirm_invite';

describe('InviteScreen', () => {
    it('should handle invite correctly', () => {
      const { getByPlaceholderText, getByText } = render(<InviteScreen />);
  
      const emailInput = getByPlaceholderText('Enter email');
      fireEvent.changeText(emailInput, 'test@example.com');
  
      const sendInviteButton = getByText('Send Invite');
      fireEvent.press(sendInviteButton);
  
      
    });
  
    
  });