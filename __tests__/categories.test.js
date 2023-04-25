import categories from '../src/consts/categories';
import {describe, expect, it, test} from "@jest/globals";

describe('categories', () => {
    it('should have the correct length', () => {
        expect(categories.length).toEqual(4);
    });

    test('should have the correct properties', () => {
        expect(categories.length).toBeGreaterThan(0);
        expect(categories[0]).toHaveProperty('id', '1');
        expect(categories[0]).toHaveProperty('name', 'Fruit');
        expect(categories[0]).toHaveProperty('image');
        expect(typeof categories[0].image).toEqual('object'); // Updated assertion
        expect(categories[1]).toHaveProperty('id', '2');
        expect(categories[1]).toHaveProperty('name', 'Vegetable');
        expect(categories[1]).toHaveProperty('image');
        expect(typeof categories[1].image).toEqual('object');
        // Add more assertions for other categories as needed
    });

});
