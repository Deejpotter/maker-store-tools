"use client";
import React, { useState, useEffect } from "react";

const FlowCompensationSection = () => {
	const [currentFlow, setCurrentFlow] = useState("100");
	const [nozzleWidth, setNozzleWidth] = useState("0.4");
	const [wallMeasurements, setWallMeasurements] = useState({
		c1: "",
		c2: "",
		c3: "",
		c4: "",
	});
	const [newFlow, setNewFlow] = useState("");

	useEffect(() => {
		const calculateFlow = () => {
			const measurements = Object.values(wallMeasurements).map(Number);
			if (measurements.some(isNaN)) return "";

			const avgThickness =
				measurements.reduce((a, b) => a + b, 0) / measurements.length;
			if (avgThickness === 0) return "";

			const currentFlowNum = Number(currentFlow);
			const nozzleWidthNum = Number(nozzleWidth);
			if (isNaN(currentFlowNum) || isNaN(nozzleWidthNum)) return "";

			return ((currentFlowNum * nozzleWidthNum) / avgThickness).toFixed(2);
		};
		setNewFlow(calculateFlow());
	}, [currentFlow, nozzleWidth, wallMeasurements]);

	const handleCurrentFlowChange = (e) => {
		setCurrentFlow(e.target.value);
	};

	const handleNozzleWidthChange = (e) => {
		setNozzleWidth(e.target.value);
	};

	const handleWallChange = (wall) => (e) => {
		setWallMeasurements({ ...wallMeasurements, [wall]: e.target.value });
	};

	return (
		<>
			<div className="row my-3 mt-5">
				<div className="col-sm-12">
					<h2>
						<i className="fa fa-tint" aria-hidden="true"></i> Flow Compensation
					</h2>
					<p>
						Flow compensation is used to compensate for the expansion of the
						filament being pressed against the layer underneath. Use this
						calculator to correct for the expansion of the filament by adjusting
						the flow rate. To use this calculator, print a 20mm x 20mm x 20mm
						cube in vase mode and then measure the top 5 layers with your
						caliper. Measure near the center of the cube, not near the edges.
						Enter the values below to see how you can adjust your flow
						compensation to produce the properly sized line width of extruded
						material.
						<br />
						<span className="font-weight-bold">
							Note that flow compensation can differ based on material.
						</span>
					</p>
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label htmlFor="flow_old">Current Flow %</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control"
						value={currentFlow}
						onChange={handleCurrentFlowChange}
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					Most slicers have flow compensation set to 100% by default.
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label htmlFor="flow_nozzle">Nozzle Width</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control"
						value={nozzleWidth}
						onChange={handleNozzleWidthChange}
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					Enter the diameter of your nozzle.
				</div>
			</div>

			<div className="row align-items-center py-2">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<legend className="align-text-middle mb-0">Measured Values</legend>
				</div>
				<div className="col-12 col-md-2 col-lg-1 no-gutters my-1">
					<fieldset className="col-12">
						<div className="row">
							<div className="col-3 col-md-12 my-md-1">
								<input
									type="text"
									className="form-control"
									value={wallMeasurements.c1}
									onChange={handleWallChange("c1")}
								/>
							</div>
							<div className="col-3 col-md-12 my-md-1">
								<input
									type="text"
									className="form-control"
									value={wallMeasurements.c2}
									onChange={handleWallChange("c2")}
								/>
							</div>
							<div className="col-3 col-md-12 my-md-1">
								<input
									type="text"
									className="form-control"
									value={wallMeasurements.c3}
									onChange={handleWallChange("c3")}
								/>
							</div>
							<div className="col-3 col-md-12 my-md-1">
								<input
									type="text"
									className="form-control"
									value={wallMeasurements.c4}
									onChange={handleWallChange("c4")}
								/>
							</div>
						</div>
					</fieldset>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					Measure the thickness of each side of the cube wall using the top 5
					layers near the center of the wall.
				</div>
			</div>

			<div className="row align-items-center py-2 bg-light border-top border-bottom">
				<div className="col-lg-3 col-md-3 col-6 font-weight-bold text-sm-right">
					<label htmlFor="flow_new">New Flow %</label>
				</div>
				<div className="col-lg-1 col-md-2 col-6 my-1">
					<input
						type="text"
						className="form-control bg-white font-weight-bold"
						value={newFlow}
						readOnly
					/>
				</div>
				<div className="col-lg-8 col-md-7 col-12 my-1">
					Enter this value into one or more fields of Cura&apos;s flow compensation
					fields. Shell/Skin values are most important to modify for accurate
					parts.
				</div>
			</div>
		</>
	);
};

export default FlowCompensationSection;
