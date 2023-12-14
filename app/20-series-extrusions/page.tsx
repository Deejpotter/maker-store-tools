"use client";
import React, { useState } from "react";

// Predefined standard stock lengths
const standardStockLengths = [500, 1000, 1500, 3000];

const CuttingCalculator = () => {
	const [parts, setParts] = useState([]);
	const [cutList, setCutList] = useState([]);

	// Add a new part requirement
	const addPart = () => {
		setParts([...parts, { length: 0, quantity: 1 }]);
	};

	// Update part requirement details
	const updatePart = (index, field, value) => {
		const updatedParts = parts.map((part, i) =>
			i === index ? { ...part, [field]: parseInt(value, 10) } : part
		);
		setParts(updatedParts);
	};

	// Calculate the cut list and required stock extrusions
	const calculateCutList = () => {
		// Placeholder logic for the optimization algorithm
		// Actual implementation would be more complex and consider the most efficient use of material

		// This is a simplified example where we match each part with a stock length
		const newCutList = parts.map((part) => {
			// Find the smallest stock length that can be used for the part
			const stockLength = standardStockLengths.find(
				(length) => length >= part.length
			);
			return {
				stockLength,
				cuts: Array(part.quantity).fill(part.length),
			};
		});

		setCutList(newCutList);
	};

	return (
		<div>
			<h2>Required Parts</h2>
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

			<h2>Cut List and Stock Extrusions</h2>
			{cutList.map((cutItem, index) => (
				<div key={index}>
					<p>Extrusion added to invoice: LR-2020-S-{cutItem.stockLength}</p>
					{cutItem.cuts.map((cut, cutIndex) => (
						<p key={cutIndex}>
							Cutting fee: 1 x LR-2020-S-{cutItem.stockLength} cut to 1 x
							LR-2020-S-{cut}
						</p>
					))}
				</div>
			))}
		</div>
	);
};

export default CuttingCalculator;
