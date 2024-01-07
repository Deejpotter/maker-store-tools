import { addCombinationToStock, generatePartCombinations } from './CutListCalculator';

// Test suite for the generatePartCombinations function
describe('generatePartCombinations', () => {
    // Test case: when given a list of parts, the function should return all possible combinations of those parts
    it('should return all combinations of parts', () => {
        // Define a list of parts
        const parts = [{ length: 1, quantity: 1 }, { length: 2, quantity: 1 }, { length: 3, quantity: 1 }];
        // Define the expected combinations
        const expectedCombinations = [
            [],
            [{ length: 1, quantity: 1 }],
            [{ length: 2, quantity: 1 }],
            [{ length: 1, quantity: 1 }, { length: 2, quantity: 1 }],
            [{ length: 3, quantity: 1 }],
            [{ length: 1, quantity: 1 }, { length: 3, quantity: 1 }],
            [{ length: 2, quantity: 1 }, { length: 3, quantity: 1 }],
            [{ length: 1, quantity: 1 }, { length: 2, quantity: 1 }, { length: 3, quantity: 1 }]
        ];
        // Call the function with the parts list
        const combinations = generatePartCombinations(parts);
        // Check that the function returned the expected combinations
        expect(combinations).toEqual(expect.arrayContaining(expectedCombinations));
        // Check that the function returned the correct number of combinations
        expect(combinations.length).toBe(expectedCombinations.length);
    });

    // Test case: when given an empty list of parts, the function should return an empty array
    it('should return an empty array when no parts are provided', () => {
        // Define an empty list of parts
        const parts = [];
        // Define the expected result (an empty array)
        const expectedCombinations = [[]];
        // Call the function with the empty parts list
        const combinations = generatePartCombinations(parts);
        // Check that the function returned the expected result
        expect(combinations).toEqual(expectedCombinations);
    });
});

// Test suite for the addCombinationToStock function
describe('addCombinationToStock', () => {
    // Test case: when the combination fits into an existing stock cut, it should be added to that cut
    it('should add the combination to an existing stock cut if it fits', () => {
        // Define a combination and a cut list with one cut that the combination fits into
        const combination = [{ length: 2, quantity: 1 }];
        const stockLength = 5;
        const cutList = [{ stockLength: 5, usedLength: 2, cuts: [{ length: 2, quantity: 1 }], quantity: 1 }];

        // Call the function with the combination, stock length, and cut list
        addCombinationToStock(combination, stockLength, cutList);

        // Check that the used length of the cut was updated correctly
        expect(cutList[0].usedLength).toBe(4);
        // Check that the combination was added to the cuts of the cut
        expect(cutList[0].cuts.length).toBe(2);
    });

    // Test case: when the combination does not fit into any existing cut, a new cut should be created for it
    it('should create a new stock cut if the combination does not fit in any existing cut', () => {
        // Define a combination and a cut list with one cut that the combination does not fit into
        const combination = [{ length: 3, quantity: 1 }];
        const stockLength = 5;
        const cutList = [{ stockLength: 5, usedLength: 3, cuts: [{ length: 3, quantity: 1 }], quantity: 1 }];

        // Call the function with the combination, stock length, and cut list
        addCombinationToStock(combination, stockLength, cutList);

        // Check that a new cut was added to the cut list
        expect(cutList.length).toBe(2);
        // Check that the used length of the new cut is correct
        expect(cutList[1].usedLength).toBe(3);
        // Check that the combination was added to the cuts of the new cut
        expect(cutList[1].cuts.length).toBe(1);
    });

    // Test case: when the combination does not fit into the stock length, the cut list should not be modified
    it('should not modify the cut list if the combination does not fit in the stock length', () => {
        // Define a combination that is longer than the stock length, and a cut list
        const combination = [{ length: 6, quantity: 1 }];
        const stockLength = 5;
        const cutList = [{ stockLength: 5, usedLength: 2, cuts: [{ length: 2, quantity: 1 }], quantity: 1 }];

        // Call the function with the combination, stock length, and cut list
        addCombinationToStock(combination, stockLength, cutList);

        // Check that the cut list was not modified
        expect(cutList.length).toBe(1);
        expect(cutList[0].usedLength).toBe(2);
        expect(cutList[0].cuts.length).toBe(1);
    });
});

