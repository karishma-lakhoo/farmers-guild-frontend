// __mocks__/@react-navigation/stack.js

export const createStackNavigator = jest.fn(() => ({
    Navigator: jest.fn().mockName("StackNavigator.Navigator"),
    Screen: jest.fn().mockName("StackNavigator.Screen"),
}));
