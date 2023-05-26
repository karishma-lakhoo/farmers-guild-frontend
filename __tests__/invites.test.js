import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import InvitePage from '../src/screens_final/InvitePage';

describe('InvitePage', () => {
  it('should update the email correctly', () => {
    const { getByPlaceholderText } = render(<InvitePage />);

    const emailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('should handle sending invite correctly', () => {
    const consoleLogSpy = jest.spyOn(console, 'log');
    const { getByPlaceholderText, getByText } = render(<InvitePage />);

    const emailInput = getByPlaceholderText('Enter email');
    fireEvent.changeText(emailInput, 'test@example.com');

    const sendInviteButton = getByText('Send Invite');
    fireEvent.press(sendInviteButton);

    expect(consoleLogSpy).toHaveBeenCalledWith('Invitation sent to:', 'test@example.com');
    expect(emailInput.props.value).toBe('');

    consoleLogSpy.mockRestore();
  });
});
