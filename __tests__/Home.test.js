import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../src/screens_final/Home';




describe('HomeScreen', () => {
  it('should render the welcome message with the provided username', () => {
    const username = 'JohnDoe';
    const { getByText } = render(<HomeScreen username={username} />);

    const welcomeMessage = getByText(`Welcome, ${username}!`);
    expect(welcomeMessage).toBeTruthy();
  });

  it('should call the onLogout function when the logout button is pressed', () => {
    const mockOnLogout = jest.fn();
    const { getByText } = render(<HomeScreen username="JohnDoe" onLogout={mockOnLogout} />);

    const logoutButton = getByText('Logout');
    fireEvent.press(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });
});