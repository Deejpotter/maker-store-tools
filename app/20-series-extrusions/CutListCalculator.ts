import { Cut, StockCut } from "./CutListTypes";
import { globalVars } from "./page";

/**
 * Calculates the optimized cut list based on the provided array of parts and standard stock lengths.
 * It sorts the parts in descending order of length and tries to fit each part into existing stock lengths.
 * If a part does not fit in existing stock lengths, it adds the part to a new stock length.
 * 
 * @param {Cut[]} parts - An array of parts to be cut.
 * @param {number[]} standardStockLengths - An array of available stock lengths.
 * @returns {StockCut[]} - An array of StockCut objects representing the optimized cut list.
 */
const calculateCutList = (parts: Cut[], standardStockLengths: number[]): StockCut[] => {
    let newCutList: StockCut[] = [];
    const partCombinations = generatePartCombinations(parts);

    partCombinations.forEach(combination => {
        const totalLength = calculateTotalLength(combination);
        const suitableStockLength = findSuitableStockLength(totalLength, standardStockLengths);
        if (suitableStockLength) {
            addCombinationToStock(combination, suitableStockLength, newCutList);
        }
    });

    return aggregateCuts(newCutList);
};
export default calculateCutList;

/**
 * Adds a combination of parts to the most suitable stock length in the cut list.
 * If no existing stock cut can accommodate the combination, it creates a new stock cut.
 * 
 * @param {Cut[]} combination - A combination of parts to add.
 * @param {number} InputStockLength - The length of the stock to use.
 * @param {StockCut[]} cutList - The current list of stock cuts.
 */
export const addCombinationToStock = (combination: Cut[], InputStockLength: number, cutList: StockCut[]): void => {
    // Calculate the total length of the combination, accounting for the blade kerf
    const totalLength = combination.reduce((sum, cut) => sum + cut.length * cut.quantity, 0) + globalVars.defaultKerf * (combination.length - 1);

    // Find a stock cut in the cutList that can accommodate the total length of the combination
    const suitableStockCut = cutList.find(stockCut => stockCut.stockLength - stockCut.usedLength >= totalLength);

    if (suitableStockCut) {
        // If a suitable stock cut is found, update its usedLength and cuts with the new combination
        suitableStockCut.usedLength += totalLength;
        suitableStockCut.cuts.push(...combination);
    } else if (totalLength <= InputStockLength) {
        // If no suitable stock cut is found and the combination fits in the stock length,
        // create a new StockCut and add it to the cutList
        cutList.push({
            stockLength: InputStockLength,
            usedLength: totalLength,
            cuts: [...combination],
            quantity: 1
        });
    }
};

/**
 * Generates all possible combinations of parts.
 * 
 * @param {Cut[]} parts - The array of parts to generate combinations from.
 * @returns {Cut[][]} - An array of arrays, each containing a combination of parts.
 */
export const generatePartCombinations = (parts: Cut[]): Cut[][] => {
    if (parts.length === 0) return [[]];

    const firstPart = parts[0];
    const rest = parts.slice(1);

    const combinationsWithoutFirst = generatePartCombinations(rest);
    const combinationsWithFirst = combinationsWithoutFirst.map(combination => [firstPart, ...combination]);

    return [...combinationsWithoutFirst, ...combinationsWithFirst];
};

/**
 * Calculates the total length of a combination of parts.
 * 
 * @param {Cut[]} parts - An array of parts to calculate the total length of.
 * @returns {number} - The total length of the combination of parts.
 */
export const calculateTotalLength = (parts: Cut[]): number => {
    return parts.reduce((total, part) => total + part.length * part.quantity, 0);
};

/**
 * Sorts an array of parts by their length in descending order.
 * This is used to optimize the cutting process by fitting larger parts first.
 * 
 * @param {Cut[]} parts - The array of parts to be sorted.
 * @returns {Cut[]} - A new array of parts sorted by length in descending order.
 */
export const sortParts = (parts: Cut[]): Cut[] => {
    return [...parts].sort((a, b) => b.length - a.length);
};

/**
 * Finds the shortest stock length from the standard stock lengths that can accommodate
 * the given part length.
 * 
 * @param {number} partLength - The length of the part to fit.
 * @param {number[]} stockLengths - An array of available stock lengths.
 * @returns {number} - The suitable stock length for the given part length.
 */
export const findSuitableStockLength = (partLength: number, stockLengths: number[]): number => {
    return stockLengths.find((length) => length >= partLength) ?? 0;
};


/**
 * Tries to fit a part in the existing stock lengths. If it finds a suitable stock length
 * with enough available space, it updates that stock length's used length and cuts.
 * It sorts the stock lengths in descending order to prioritize longer lengths.
 * 
 * @param {Cut} part - The part to fit in the stock lengths.
 * @param {StockCut[]} cutList - The current list of stock lengths and their used lengths and cuts.
 * @returns {boolean} - True if the part fits in an existing stock length, false otherwise.
 */
export const fitPartInStock = (part: Cut, cutList: StockCut[]): boolean => {
    let fitted = false;

    // Sort stock lengths in descending order to prioritize longer lengths
  cutList.sort((a, b) => b.stockLength - a.stockLength);

    // Try to fit the part in the smallest stock length available
    for (let cut of cutList) {
        if (cut.stockLength - cut.usedLength >= part.length) {
            cut.usedLength += part.length;
            cut.cuts.push({ length: part.length, quantity: 1 });
            fitted = true;
            break;
        }
    }

    return fitted;
};

/**
 * Adds a part to a new stock length. This is used when a part cannot be fitted
 * into any existing stock lengths in the cut list.
 * 
 * @param {Cut} part - The part to add to a new stock length.
 * @param {number} suitableStockLength - The suitable stock length for the part.
 * @param {StockCut[]} cutList - The current list of stock lengths and their used lengths and cuts.
 */
export const addPartToNewStock = (part: Cut, suitableStockLength: number, cutList: StockCut[]) => {
    cutList.push({
        stockLength: suitableStockLength,
        usedLength: part.length,
        cuts: [{ length: part.length, quantity: 1 }],
        quantity: 1
    });
};

/**
 * Aggregates similar cuts within a list of cuts. Similar cuts are those with the same length.
 * This function sums the quantities of similar cuts.
 * 
 * @param {Cut[]} cuts - An array of cuts to aggregate.
 * @returns {Cut[]} - An array of cuts where similar cuts are aggregated.
 */
export const aggregateSimilarCuts = (cuts: Cut[]): Cut[] => {
    return cuts.reduce((acc, cut) => {
        let existingCut = acc.find((c) => c.length === cut.length);
        if (existingCut) {
            existingCut.quantity += cut.quantity;
        } else {
            acc.push({ ...cut });
        }
        return acc;
    }, []);
};

/**
 * Groups and summarizes cuts by stock length. It aggregates similar cuts and counts the
 * number of cuts for each stock length.
 * 
 * @param {StockCut[]} cutList - The current list of stock lengths and their used lengths and cuts.
 * @returns {StockCut[]} - An array of objects representing each stock length and its associated cuts.
 */
export const aggregateCuts = (cutList: StockCut[]): StockCut[] => {
    return cutList.reduce((acc, item) => {
        let existing = acc.find((cut) => cut.stockLength === item.stockLength);
        if (existing) {
            existing.quantity += 1;
            existing.cuts = aggregateSimilarCuts([...existing.cuts, ...item.cuts]);
        } else {
            item.cuts = aggregateSimilarCuts(item.cuts);
            acc.push({ ...item, quantity: 1 });
        }
        return acc;
    }, []);
};
