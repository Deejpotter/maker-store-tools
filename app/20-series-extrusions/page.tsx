"use client";
import React, { useState } from "react";
import { Cut, StockCut, GlobalVariables } from "./CutListTypes"
import calculateCutList from "./CutListCalculator";

export const globalVars:GlobalVariables = {
    defaultKerf: 4,
    defaultCutFee: 2,
    defaultSetupFee: 3
}
    
const CuttingCalculator = () => {
	const [parts, setParts] = useState<Cut[]>([]);
	const [cutList, setCutList] = useState<StockCut[]>([]);
	const [color, setColor] = useState("S"); // Default color silver
	const [profile, setProfile] = useState("20x20"); // Default profile


	// Standard stock lengths for 20 Series Extrusions
	const standardStockLengths = [500, 1000, 1500, 3000];

	/**
	 * Adds a new part requirement to the parts array. Each new part has a default length of 0
	 * and a quantity of 1.
	 */
	const addPart = () => {
		setParts([...parts, { length: 0, quantity: 1 }]);
	};


	/**
	 * This function updates a part in the parts array. It should be called
	 * when a part's length or quantity is changed.
	 * @param index The index in the array of the part to update.
	 * @param field The field to update on the part.
	 * @param value The new value for the field.
	 */
	const updatePart = (index: number, field: keyof Cut, value: number) => {
		// Update the part in the parts array by creating a new array using the spread operator
		// to copy the existing parts, and then replacing the part at the specified index with
		// a new part object that has the updated field.
		const updatedParts = parts.map((part, i) =>
			i === index ? { ...part, [field]: value } : part
		);
		// Then update the parts array with the new array
		setParts(updatedParts);
	};

	/**
	 * Calls the calculateCutList function with the current parts and standard stock lengths then
	 * updates the cutList state with the result. Used when the Calculate Cut List button is clicked.
	 */
	const handleCalculate = () => {
        const newCutList = calculateCutList(parts, standardStockLengths);
        setCutList(newCutList);
	};
	
	/**
     * Renders the profile and color selection section.
     */
    const renderProfileAndColorSelection = () => (
        <div>
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
        </div>
    );

    /**
     * Renders the parts input form.
     */
    const renderPartsInputForm = () => (
        <div>
            {parts.map((part, index) => (
                <div key={index}>
                    <input
                        type="number"
                        value={part.length}
                        onChange={(e) => updatePart(index, "length", parseInt(e.target.value))}
                        placeholder="Length (mm)"
                    />
                    <input
                        type="number"
                        value={part.quantity}
                        onChange={(e) => updatePart(index, "quantity", parseInt(e.target.value))}
                        placeholder="Quantity"
                    />
                </div>
            ))}
            <button onClick={addPart}>Add Part</button>
            <button onClick={handleCalculate}>Calculate Cut List</button>
        </div>
    );

    /**
 * Renders the optimized cut list and stock extrusions in a concise format.
 */
const renderCutList = () => (
    <div>
        <h2 className="mb-4">Cut List and Stock Extrusions</h2>
        {cutList.map((cutItem, index) => (
            <div key={index} className="mb-3">
                <p>
                    Extrusion added to invoice: {cutItem.quantity} x LR-{profile}-{color}-{cutItem.stockLength}
                </p>
                {cutItem.cuts.map((cut, cutIndex) => (
                    <p key={cutIndex}>
                        Cutting fee: {cut.quantity} x LR-{profile}-{color}-
                        {cutItem.stockLength} cut to {cut.quantity} x LR-{profile}-{color}-{cut.length}
                    </p>
                ))}
            </div>
        ))}
    </div>
);


    // Main render
    return (
        <div>
            <h2>20 Series Extrusion Cutting Calculator</h2>
            {renderProfileAndColorSelection()}
            {renderPartsInputForm()}
            {renderCutList()}
        </div>
    );
};

export default CuttingCalculator;
