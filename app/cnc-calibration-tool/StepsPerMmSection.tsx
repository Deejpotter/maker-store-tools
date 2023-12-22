'use client';
import React, { useState, useEffect } from "react";

/**
 * Component for calculating and displaying CNC calibration data.
 */
const StepsPerMmSection = () => {
	// State for holding form input values as strings
	const [currentSteps, setCurrentSteps] = useState("");
	const [expectedMovement, setExpectedMovement] = useState("100");
	const [actualMovement, setActualMovement] = useState("");
	const [newSteps, setNewSteps] = useState("");

	// Effect hook for calculating new steps per millimeter
	useEffect(() => {
		const calculateNewSteps = () => {
			// Convert string values to numbers for calculation
			const currentStepsNum = Number(currentSteps);
			const expectedMovementNum = Number(expectedMovement);
			const actualMovementNum = Number(actualMovement);

			// Prevent division by zero and invalid inputs
			if (
				actualMovementNum === 0 ||
				isNaN(currentStepsNum) ||
				isNaN(expectedMovementNum) ||
				isNaN(actualMovementNum)
			) {
				return "";
			}
			const calculatedSteps =
				(currentStepsNum * expectedMovementNum) / actualMovementNum;
			return calculatedSteps.toFixed(2); // Set new steps with two decimal places
		};
		setNewSteps(calculateNewSteps());
	}, [currentSteps, expectedMovement, actualMovement]);

	// Handler for changing input values
	const handleChange = (setter) => (e) => setter(e.target.value);

	return (
		<>
			<div className="row mt-3">
				<div className="col-sm-12">
					<h2>
						<i className="fa fa-cog" aria-hidden="true"></i> Steps per
						millimeter
					</h2>
					<p>
						The steps per millimeter (steps/mm) calculation is used to calibrate
						the X, Y, Z, and E axes of your CNC machine. This calculation is
						used regardless of the axis. The process is to have a known target
						you are trying to reach and then measure the actual value. The
						calculator will then adjust your steps/mm based on the measured
						value to provide a new value which will match the target value.
					</p>
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label className="align-text-middle mb-0" htmlFor="spm_old">
						Current Steps/mm
					</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control"
						id="spm_old"
						value={currentSteps}
						onChange={handleChange(setCurrentSteps)}
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					<code>M503</code> G-Code will reveal the <code>M92</code> values. Use
					your existing X/Y/Z/E value for this field.
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label className="align-text-middle mb-0" htmlFor="spm_target">
						Target Value
					</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control"
						id="spm_target"
						value={expectedMovement}
						onChange={handleChange(setExpectedMovement)}
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					The expected amount of axis movement. For example, enter 100 if you
					move the axis 100mm.
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label className="align-text-middle mb-0" htmlFor="spm_measured">
						Measured Value
					</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control"
						id="spm_measured"
						value={actualMovement}
						onChange={handleChange(setActualMovement)}
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					The actual amount of axis movement. Use of calipers is recommended,
					but a metric ruler can be used.
				</div>
			</div>

			<div className="row align-items-center py-2 bg-light border-top border-bottom">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label className="align-text-middle mb-0" htmlFor="spm_new">
						New Steps/mm Value
					</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control bg-white font-weight-bold"
						id="spm_new"
						value={newSteps}
						readOnly
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					Enter this value, up to 2 decimal places, into Marlin for the axis you
					are calibrating. For example <code>M92 X80.40</code> for the X axis.
					Be sure to then save your configuration in Marlin with{" "}
					<code>M500</code>.
				</div>
			</div>
		</>
	);
};

export default StepsPerMmSection;
