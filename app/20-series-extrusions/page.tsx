"use client";
import React, { useState } from "react";

const CuttingCalculator = () => {
	const [parts, setParts] = useState([]);
	const [cutList, setCutList] = useState([]);
	const [color, setColor] = useState("S"); // Default color silver
	const [profile, setProfile] = useState("20x20"); // Default profile

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

	/**
	 * Calculates an optimized cut list for 20 Series Extrusions.
	 *
	 * This function implements a modified version of the Bin Packing Algorithm. It first sorts the parts
	 * in descending order based on their lengths to prioritize fitting longer parts first. For each part,
	 * the algorithm attempts to fit it into the existing stock lengths in the new cut list. If a part fits,
	 * it is added to that stock length. If not, the algorithm selects the shortest stock length that can
	 * accommodate the part and adds it to a new stock length in the cut list. This approach aims to
	 * minimize waste by efficiently utilizing available stock lengths and grouping parts by size.
	 */
	const calculateCutList = () => {
		let newCutList = [];

		// Sort parts by length in descending order
		const sortedParts = [...parts].sort((a, b) => b.length - a.length);

		// Iterate over each part
		sortedParts.forEach((part) => {
			for (let i = 0; i < part.quantity; i++) {
				let fitted = false;

				// Determine the shortest stock length that can accommodate the part
				const suitableStockLength = standardStockLengths.find(
					(length) => length >= part.length
				);

				// Try to fit the part in existing stock lengths
				newCutList.forEach((cut) => {
					if (
						!fitted &&
						cut.stockLength === suitableStockLength &&
						cut.stockLength - cut.usedLength >= part.length
					) {
						cut.usedLength += part.length;
						cut.cuts.push({ length: part.length, quantity: 1 });
						fitted = true;
					}
				});

				// If part did not fit in any existing stock, add to a new stock length
				if (!fitted) {
					newCutList.push({
						stockLength: suitableStockLength,
						usedLength: part.length,
						cuts: [{ length: part.length, quantity: 1 }],
					});
				}
			}
		});

		// Group and summarize cuts by stock length
		let aggregatedCuts = newCutList.reduce((acc, item) => {
			let existing = acc.find((cut) => cut.stockLength === item.stockLength);
			if (existing) {
				existing.quantity += 1;
				existing.cuts = [...existing.cuts, ...item.cuts];
			} else {
				acc.push({ ...item, quantity: 1 });
			}
			return acc;
		}, []);

		setCutList(aggregatedCuts);
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
