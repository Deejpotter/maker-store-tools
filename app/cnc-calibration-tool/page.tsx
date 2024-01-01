"use client";
import React, { useState, useEffect } from "react";
import LayoutContainer from "@/components/LayoutContainer";
import StepsPerMmSection from "./StepsPerMmSection";
import FlowCompensationSection from "./FlowCompensationSection";
import StartupGcodeGeneratorSection from "./StartupGcodeGeneratorSection";

/**
 * Functional component for CNC Calibration Tool.
 * It calculates the new steps per millimeter based on user inputs.
 */
const CncCalibrationTool: React.FC = () => {
	return (
		<LayoutContainer>
			<h1 className="my-4">CNC Calibration Tool</h1>

			<div className="row my-3">
				<div className="col">
					<h2>Calibration Overview</h2>
					<p>
						Calibration is critical to 3D printer, and other CNC machine,
						accuracy. These calculators and resources will allow you to
						calibrate your printer or router for optimal results.
					</p>
				</div>
			</div>

			{/* Steps Per MM */}
			<StepsPerMmSection />

			{/* Flow Compensation */}
			<FlowCompensationSection />

			{/* Startup GCode Generator */}
			<StartupGcodeGeneratorSection />
		</LayoutContainer>
	);
};

export default CncCalibrationTool;
