import React, { useState, useEffect } from "react";
import LayoutContainer from "@/components/LayoutContainer";

/**
 * Functional component for CNC Calibration Tool.
 * It calculates the new steps per millimeter based on user inputs.
 */
const CncCalibrationTool: React.FC = () => {
	// State for current steps per millimeter
	const [currentSteps, setCurrentSteps] = useState(0);
	// State for expected movement in millimeters
	const [expectedMovement, setExpectedMovement] = useState(0);
	// State for actual movement in millimeters
	const [actualMovement, setActualMovement] = useState(0);
	// State for the new calculated steps per millimeter
	const [newSteps, setNewSteps] = useState(0);

	/**
	 * Calculates the new steps per millimeter.
	 */
	const calculateNewSteps = () => {
		if (actualMovement === 0) {
			return 0; // Prevent division by zero
		}
		return (currentSteps * expectedMovement) / actualMovement;
	};

	// Effect hook to update the new steps per millimeter whenever inputs change
	useEffect(() => {
		setNewSteps(calculateNewSteps());
	}, [currentSteps, expectedMovement, actualMovement]);

	return (
		<LayoutContainer>
			<h1>CNC Calibration Tool</h1>
			<div>
				<label>
					Current Steps/mm:
					<input
						type="number"
						value={currentSteps}
						onChange={(e) => setCurrentSteps(Number(e.target.value))}
						min="0"
					/>
				</label>
			</div>
			<div>
				<label>
					Expected Movement (mm):
					<input
						type="number"
						value={expectedMovement}
						onChange={(e) => setExpectedMovement(Number(e.target.value))}
						min="0"
					/>
				</label>
			</div>
			<div>
				<label>
					Actual Movement (mm):
					<input
						type="number"
						value={actualMovement}
						onChange={(e) => setActualMovement(Number(e.target.value))}
						min="0"
					/>
				</label>
			</div>
			<div>
				<label>
					New Steps/mm:
					<input type="number" value={newSteps.toFixed(2)} readOnly />
				</label>
			</div>
		</LayoutContainer>
	);
};

export default CncCalibrationTool;
