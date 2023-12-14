"use client";
import React, { useState, useEffect } from "react";

export default function EnclosureCalculator() {
	const [dimensions, setDimensions] = useState<Dimensions>({
		length: 1,
		width: 1,
		height: 1,
	});
	const [doorConfig, setDoorConfig] = useState<DoorConfig>({});
	const [results, setResults] = useState<Results>({});

	const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDimensions({
			...dimensions,
			[e.target.name]: parseFloat(e.target.value),
		});
	};

	const handleDoorSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDoorConfig({
			...doorConfig,
			[e.target.name]: e.target.checked,
		});
	};

	const calculateMaterials = () => {
		const { length, width, height } = dimensions;
		const extrusions = calculateExtrusions(length, width, height);
		// const doors = calculateDoors(doorConfig); // Uncomment when logic is implemented

		setResults({ extrusions }); // , doors: doors
	};

	useEffect(() => {
		calculateMaterials();
	}, [dimensions, doorConfig]);

	const calculateExtrusions = (
		length: number,
		width: number,
		height: number
	) => {
		const frameLength2040 = (length - 0.04) * 2;
		const frameWidth2040 = (width - 0.04) * 2;
		const totalVerticalSupports2020 = height * 4;

		return {
			frame2040: frameLength2040 + frameWidth2040,
			vertical2020: totalVerticalSupports2020,
		};
	};

	// Define calculateDoors function when ready

	return (
		<div>
			<input
				type="number"
				name="length"
				value={dimensions.length}
				onChange={handleDimensionChange}
				placeholder="Length (m)"
			/>
			<input
				type="number"
				name="width"
				value={dimensions.width}
				onChange={handleDimensionChange}
				placeholder="Width (m)"
			/>
			<input
				type="number"
				name="height"
				value={dimensions.height}
				onChange={handleDimensionChange}
				placeholder="Height (m)"
			/>

			{/* Door configuration options */}
			{/* Implement checkboxes or dropdowns for doorConfig */}

			<h3>Results:</h3>
			<p>
				Total 2040 Extrusions for Frames:{" "}
				{results.extrusions?.frame2040.toFixed(2)} meters
			</p>
			<p>
				Total 2020 Extrusions for Vertical Supports:{" "}
				{results.extrusions?.vertical2020.toFixed(2)} meters
			</p>
			{/* Display additional results for doors if needed */}
		</div>
	);
}
interface Dimensions {
    length: number;
    width: number;
    height: number;
}

interface DoorConfig {
    // Define the structure based on how you're tracking door configurations
    [key: string]: boolean;
}

interface Results {
    extrusions?: {
        frame2040: number;
        vertical2020: number;
    };
    doors?: {
        // Define the structure for door results
    };
}
