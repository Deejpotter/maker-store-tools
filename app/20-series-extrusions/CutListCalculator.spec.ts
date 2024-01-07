import calculateCutList, { addCombinationToStock, addPartToNewStock, aggregateCuts, calculateTotalLength, findSuitableStockLength, fitPartInStock, generatePartCombinations, sortParts } from './CutListCalculator';


describe('calculateCutList', () => {
    // Test case: when asked for 2 x 700mm extrusions, the function should use a single 1500mm stock cut.
    it('should fit two 700mm parts into a single 1500mm stock', () => {
        // Set up the test data
        const parts = [{ length: 700, quantity: 2 }];
	    // Standard stock lengths for 20 Series Extrusions
        const stockLengths = [500, 1000, 1500, 3000]; 


        // Call the function with the test data
        const cutList = calculateCutList(parts, stockLengths);

        // Check that the function returned the correct cut list
        expect(cutList.length).toBe(1);
        expect(cutList[0].stockLength).toBe(1500);
        expect(cutList[0].usedLength).toBe(1408); // 700*2 + 4*2 for kerf
        expect(cutList[0].cuts.length).toBe(1);
        expect(cutList[0].cuts[0].length).toBe(700);
        expect(cutList[0].cuts[0].quantity).toBe(2);
    });
});


describe('generatePartCombinations', () => {
    // Test case: when asked for 2 x 700mm extrusions, the function should get them from a single 1500mm stock cut unless there is leftover stock on another cut.
    it('should return correct combinations for 2 x 700mm parts', () => {
    const parts = [{ length: 700, quantity: 2 }];
    const combinations = generatePartCombinations(parts);
    expect(combinations).toEqual([[{ length: 700, quantity: 2 }]]);
  });
});


describe('addCombinationToStock', () => {
    // Test case: when asked for 2 x 700mm extrusions, the function should use a single 1500mm stock cut.
    it('should add a combination of 2 x 700mm parts to a 1500mm stock', () => {
        const combination = [{ length: 700, quantity: 2 }];
        const cutList = [];
        addCombinationToStock(combination, 1500, cutList);
        expect(cutList.length).toBe(1);
        expect(cutList[0].stockLength).toBe(1500);
        expect(cutList[0].usedLength).toBe(1408);
        expect(cutList[0].cuts.length).toBe(1);
        expect(cutList[0].cuts[0].length).toBe(700);
        expect(cutList[0].cuts[0].quantity).toBe(2);
    });

    // Test case: When asked for 2 x 700mm extrusions, the function should add them to a single 1500mm stock cut.
    it('should add two 700mm extrusions to a single 1500mm stock cut', () => {
        const combination = [{ length: 700, quantity: 2 }];
        const stockLength = 1500;
        const cutList = [{ stockLength: 1500, usedLength: 0, cuts: [], quantity: 1 }];

        addCombinationToStock(combination, stockLength, cutList);

        expect(cutList[0].usedLength).toBe(1400);
        expect(cutList[0].cuts.length).toBe(1);
        expect(cutList[0].cuts[0].length).toBe(700);
        expect(cutList[0].cuts[0].quantity).toBe(2);
    });

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

describe('calculateTotalLength', () => {
    it('should return the total length of a combination of parts', () => {
        const parts = [{ length: 700, quantity: 2 }];
        const totalLength = calculateTotalLength(parts);
        expect(totalLength).toBe(1408);
    });
});

describe('sortParts', () => {
    it('should sort parts in descending order by length', () => {
        const parts = [{ length: 200, quantity: 1 }, { length: 100, quantity: 2 }];
        const sortedParts = sortParts(parts);
        expect(sortedParts[0].length).toBeGreaterThanOrEqual(sortedParts[1].length);
    });
});

describe('findSuitableStockLength', () => {
    it('should find the shortest stock length for a given part length', () => {
        const partLength = 700;
        const stockLengths = [500, 1000, 1500, 3000];
        const suitableLength = findSuitableStockLength(partLength, stockLengths);
        expect(suitableLength).toBe(1000);
    });
});

describe('fitPartInStock', () => {
    it('should fit a part in an existing stock length', () => {
        const part = { length: 300, quantity: 1 };
        const cutList = [{ stockLength: 1000, usedLength: 604, cuts: [{ length: 600, quantity: 1 }], quantity: 1 }];
        const result = fitPartInStock(part, cutList);
        expect(result).toBe(true);
        expect(cutList[0].usedLength).toBe(908);
    });
});

describe('addPartToNewStock', () => {
    it('should add a part to a new stock length', () => {
        const part = { length: 1200, quantity: 1 };
        const stockLength = 1500;
        const cutList = [];
        addPartToNewStock(part, stockLength, cutList);
        expect(cutList.length).toBe(1);
        expect(cutList[0].usedLength).toBe(1204);
    });
});

describe('aggregateCuts', () => {
    // Test case: when asked for 2 x 700mm extrusions, the function should use a single 1500mm stock cut.
    it('should correctly aggregate cuts for 2 x 700mm parts', () => {
        // Set up the test data
        const cutList = [
        { stockLength: 1500, usedLength: 704, cuts: [{ length: 700, quantity: 1 }], quantity: 1 },
        { stockLength: 1500, usedLength: 704, cuts: [{ length: 700, quantity: 1 }], quantity: 1 }
        ];

        // Call the function with the test data
        const stockList = aggregateCuts(cutList);
        
        // Check that the function returned the correct cut list
        expect(stockList.length).toBe(1);
        expect(stockList[0].quantity).toBe(2);
        expect(stockList[0].cuts.length).toBe(1);
        expect(stockList[0].stockLength).toBe(1500);
        expect(stockList[0].usedLength).toBe(1408);
        expect(stockList[0].cuts[0].length).toBe(700);
        expect(stockList[0].cuts[0].quantity).toBe(2);
    });

    it('should group and summarize cuts by stock length', () => {
        // Set up the test data
        const cutList = [
            { stockLength: 1000, usedLength: 604, cuts: [{ length: 600, quantity: 1 }], quantity: 1 },
            { stockLength: 1000, usedLength: 304, cuts: [{ length: 300, quantity: 1 }], quantity: 1 }
        ];

        // Call the function with the test data
        const aggregatedCutList = aggregateCuts(cutList);

        // Check that the function returned the correct cut list
        expect(aggregatedCutList.length).toBe(1);
        expect(aggregatedCutList[0].quantity).toBe(2);
        expect(aggregatedCutList[0].usedLength).toBe(908);
        expect(aggregatedCutList[0].cuts.length).toBe(2);
    });
});

