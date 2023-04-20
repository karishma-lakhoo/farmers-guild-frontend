import React from 'react';
import { render } from 'react-native-testing-library';
import ExampleComponent from '../ExampleComponent';

describe('ExampleComponent', () => {
    it('renders correctly', () => {
        const { getByTestId } = render(<ExampleComponent />);
        expect(getByTestId('example-component')).toBeDefined();
    });
});