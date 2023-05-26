import React from 'react';
import { render } from '@testing-library/react-native';
import ProfileScreen_final from '../src/screens_final/Profile';

describe('ProfileScreen', () => {
  const user = {
    username: 'john_doe',
    email: 'john.doe@example.com',
  };

  it('should render profile information correctly', () => {
    const { getByText } = render(<ProfileScreen username={user.username} email={user.email} />);

    const title = getByText('Profile');
    expect(title).toBeDefined();

    const usernameLabel = getByText('Username:');
    expect(usernameLabel).toBeDefined();

    const usernameText = getByText(user.username);
    expect(usernameText).toBeDefined();

    const emailLabel = getByText('Email:');
    expect(emailLabel).toBeDefined();

    const emailText = getByText(user.email);
    expect(emailText).toBeDefined();

    // This test verifies that the profile information is rendered correctly
  });

  // Additional tests can be added to cover other scenarios or assertions
});