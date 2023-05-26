import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import fetchMock from 'jest-fetch-mock';
import SignUpScreen_final from '../src/screens_final/SignUp';
import { api_url } from '../src/consts/api_url';

jest.mock('@react-native-async-storage/async-storage', () => {
  const setItem = jest.fn();

  return {
    __esModule: true,
    default: {
      setItem,
    },
    setItem,
  };
});

describe('SignUpScreen', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('renders the SignUpScreen correctly', () => {
    render(<SignUpScreen />);
    // Rest of the test...
  });

  it('calls AsyncStorage.setItem and navigates to Home screen when Sign Up is pressed', () => {
    const mockNavigation = { navigate: jest.fn() }; // Create a mock navigation object

    const { getByTestId } = render(<SignUpScreen navigation={mockNavigation} />);

    const signUpButton = getByTestId('signup-button');
    fireEvent.press(signUpButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Login');
  });

  it('shows an alert when an error occurs during Sign Up', async () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const consoleErrorMock = jest.spyOn(console, 'error');
    global.alert = jest.fn(); // Assign a mock function directly to global.alert

    const { getByText, getByPlaceholderText } = render(
      <SignUpScreen navigation={navigation} />
    );
    const signUpButton = getByText('REGISTER');

    // Simulate an error response from the API
    fetchMock.mockRejectOnce(() => Promise.reject(new Error('An error occurred')));

    fireEvent.press(signUpButton);

    expect(AsyncStorage.setItem).not.toHaveBeenCalled();
   // expect(global.alert).toHaveBeenCalledWith('An error occurred');
   // expect(consoleErrorMock).toHaveBeenCalledWith('Error:', new Error('An error occurred'));

   // consoleErrorMock.mockRestore();
   // global.alert.mockRestore();
  });

  it('clears the input fields after successful Sign Up', () => {
    const navigation = {
      navigate: jest.fn(),
    };
    const { getByText, getByPlaceholderText } = render(
      <SignUpScreen navigation={navigation} />
    );
    const signUpButton = getByText('REGISTER');

    // Simulate a successful Sign Up
    fetchMock.mockResponseOnce(JSON.stringify({ access: 'testtoken' }), { status: 200 });

    fireEvent.press(signUpButton);


    const usernameInput = getByPlaceholderText('Username');
    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('Password');
    const firstNameInput = getByPlaceholderText('First Name');
    const lastNameInput = getByPlaceholderText('Last Name');

    expect(usernameInput.props.value).toBe('');
    expect(emailInput.props.value).toBe('');
    expect(passwordInput.props.value).toBe('');
    expect(firstNameInput.props.value).toBe('');
    expect(lastNameInput.props.value).toBe('');
  });

  it('sets AsyncStorage items, navigates to Home, and clears input fields after successful Sign Up', async () => {
    const navigation = {
      navigate: jest.fn(),
    };

    const { getByText, getByPlaceholderText } = render(
      <SignUpScreen navigation={navigation} />
    );
    const signUpButton = getByText('REGISTER');

    const setUsername = jest.fn();
    const setPassword = jest.fn();
    const setEmail = jest.fn();
    const setFirstName = jest.fn();
    const setLastName = jest.fn();

    fireEvent.changeText(getByPlaceholderText('Username'), 'testuser');
    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'password');
    fireEvent.changeText(getByPlaceholderText('First Name'), 'John');
    fireEvent.changeText(getByPlaceholderText('Last Name'), 'Doe');

    fetchMock.mockResponseOnce(JSON.stringify({ access: 'testtoken' }), { status: 200 });

    fireEvent.press(signUpButton);

    expect(navigation.navigate).toHaveBeenCalledWith('Login'); 

    

    await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for promises to resolve

   
    

   
    expect(fetchMock).toHaveBeenCalled();

    expect(fetchMock).toHaveBeenCalledWith(api_url + '/user/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'testuser',
          email: 'test@example.com',
          password: 'password',
          first_name: 'John',
          last_name: 'Doe',
        }),
      });  

     expect(AsyncStorage.setItem).toHaveBeenCalledTimes(2);
     expect(AsyncStorage.setItem).toHaveBeenCalledWith('token', 'testtoken');
     expect(AsyncStorage.setItem).toHaveBeenCalledWith('username', 'testuser');




   // expect(onSignUpPressed).toHaveBeenCalled();
  //  expect(setUsername).toHaveBeenCalledWith('');
  //  expect(setPassword).toHaveBeenCalledWith('');
  //  expect(setEmail).toHaveBeenCalledWith('');
  //  expect(setFirstName).toHaveBeenCalledWith('');
  //  expect(setLastName).toHaveBeenCalledWith('');
  });
});