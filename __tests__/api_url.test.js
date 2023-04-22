import {describe, it, test ,expect} from '@jest/globals';
import React from 'react';
import {render} from '@testing-library/react-native';
import Hello from '../src/components/test-component';
import {api_url} from "../src/consts/api_url";

test('api_url should not be null', () => {
    expect(api_url).not.toBeNull();
});
