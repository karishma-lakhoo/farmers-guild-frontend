import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InvitePage_final from '../src/screens_final/Invite';

describe('InvitePage', () => {
  it('should handle invite correctly', () => {
    const { getByPlaceholderText, getByText } = render(<InvitePage />);

    const emailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const sendInviteButton = getByText('Send Invite');
    fireEvent.press(sendInviteButton);

   
  });

  
});