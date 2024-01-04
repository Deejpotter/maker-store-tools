"use client";
import React, { useState } from "react";
import { howToCutBoards1D } from "stock-cutting";

// Types
type GlobalSettings = {
  defaultKerf: number;
  defaultCutFee: number;
  defaultSetupFee: number;
};
type StockCut = {
  stockLength: number;
  usedLength: number;
  cuts: Cut[];
};
type Cut = {
  length: number;
  kerf: number;
};


const CuttingCalculator = () => {
	const [parts, setParts] = useState([]);
	const [cutList, setCutList] = useState([]);
	const [color, setColor] = useState("S"); // Default color silver
	const [profile, setProfile] = useState("20x20"); // Default profile

	const globalVars = {
		defaultKerf: 4,
		defaultCutFee: 2,
		defaultSetupFee: 3
	}

	// Standard stock lengths for 20 Series Extrusions
	const standardStockLengths = [500, 1000, 1500, 3000];

	// Adds a new part requirement
	const addPart = () => {
		setParts([...parts, { length: 0, quantity: 1 }]);
	};

	// Updates part requirement details
	const updatePart = (index, field, value) => {
		const updatedParts = parts.map((part, i) =>
			i === index ? { ...part, [field]: parseInt(value, 10) } : part
		);
		setParts(updatedParts);
	};

	// Helper Functions
	const sortParts = (parts) => {
		// Sort parts by length in descending order
		return [...parts].sort((a, b) => b.length - a.length);
	};

	const findSuitableStockLength = (partLength, stockLengths) => {
		// Find the shortest stock length that can accommodate the part
		return stockLengths.find((length) => length >= partLength);
	};

	const fitPartInStock = (part, cutList) => {
		// Try to fit the part in existing stock lengths
		return cutList.some((cut) => {
			if (cut.stockLength - cut.usedLength >= part.length) {
				cut.usedLength += part.length;
				cut.cuts.push({ length: part.length, quantity: 1 });
				return true;
			}
			return false;
		});
	};

	const addPartToNewStock = (part, suitableStockLength, cutList) => {
		// Add the part to a new stock length
		cutList.push({
			stockLength: suitableStockLength,
			usedLength: part.length,
			cuts: [{ length: part.length, quantity: 1 }],
		});
	};

	const aggregateSimilarCuts = (cuts) => {
		// Group similar cuts and sum their quantities
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

	const aggregateCuts = (cutList) => {
		// Group and summarize cuts by stock length
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

	/**
	 * Processes the output from the stock-cutting library and formats it for display.
	 * @param output: The output from the stock-cutting library
	 * @returns The formatted cut list to be displayed
	 */
	const processOutput = (output) => {
		return output.map(item => {
            const cuts = item.cuts.map(cutSize => ({
                length: cutSize,
                kerf: globalVars.defaultKerf
            }));
            return {
                stockLength: item.stock.size,
                usedLength: item.cuts.reduce((acc, cut) => acc + cut, 0), // or calculate differently if needed
                cuts: cuts
            };
        });
	}

	// Main calculateCutList function
	const calculateCutList = () => {
        const formattedParts = parts.map(part => ({ size: part.length, count: part.quantity }));
		const formattedStockSizes = standardStockLengths.map(length => ({ size: length, cost: 1 })); // Example cost to work with the library
		const bladeSize = globalVars.defaultKerf;

        const output = howToCutBoards1D({
            stockSizes: formattedStockSizes,
            bladeSize: bladeSize,
            requiredCuts: formattedParts,
        });

        // Process output and update state
        const newCutList = processOutput(output);
        setCutList(newCutList);
    };

	// Renders the component UI
	return (
		<div>
			<h2>20 Series Extrusion Cutting Calculator</h2>

			{/* Profile and Color selection */}
			<div>
				<label>Profile: </label>
				<select value={profile} onChange={(e) => setProfile(e.target.value)}>
					<option value="20x20">20x20</option>
					<option value="20x40">20x40</option>
					<option value="20x60">20x60</option>
					<option value="20x80">20x80</option>
					<option value="C-beam">C-beam</option>
				</select>
			</div>
			<div>
				<label>Color: </label>
				<select value={color} onChange={(e) => setColor(e.target.value)}>
					<option value="S">Silver</option>
					<option value="B">Black</option>
				</select>
			</div>

			{/* Parts input form */}
			{parts.map((part, index) => (
				<div key={index}>
					<input
						type="number"
						value={part.length}
						onChange={(e) => updatePart(index, "length", e.target.value)}
						placeholder="Length (mm)"
					/>
					<input
						type="number"
						value={part.quantity}
						onChange={(e) => updatePart(index, "quantity", e.target.value)}
						placeholder="Quantity"
					/>
				</div>
			))}
			<button onClick={addPart}>Add Part</button>
			<button onClick={calculateCutList}>Calculate Cut List</button>

			{/* Displaying the optimized cut list */}
			<h2>Cut List and Stock Extrusions</h2>
			{cutList.map((cutItem, index) => (
				<div key={index}>
					<p>
						Extrusion added to invoice: {cutItem.quantity} x LR-{profile}-
						{color}-{cutItem.stockLength}
					</p>
					{cutItem.cuts.map((cut, cutIndex) => (
						<p key={cutIndex}>
							Cutting fee: {cut.quantity} x LR-{profile}-{color}-
							{cutItem.stockLength} cut to {cut.quantity} x LR-{profile}-{color}
							-{cut.length}
						</p>
					))}
				</div>
			))}
		</div>
	);
};

export default CuttingCalculator;
