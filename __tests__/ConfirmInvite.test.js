import React from 'react';
import { render } from '@testing-library/react-native';
import ConfirmInviteScreen from '../src/screens_final/Confirm_invite';

describe('ConfirmInviteScreen', () => {
  it('should render the invite details correctly', () => {
    const invitee = 'test@example.com';
    const { getByText } = render(<ConfirmInviteScreen invitee={invitee} />);

    const title = getByText('Invite Sent');
    const message = getByText('An invite has been sent to:');
    const email = getByText(invitee);

    expect(title).toBeTruthy();
    expect(message).toBeTruthy();
    expect(email).toBeTruthy();
  });
});
