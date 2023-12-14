"use client";

import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light">
			<div className="container-fluid">
				{/* Use Next.js Link for client-side routing */}
				<Link href="/">
					<span className="navbar-brand">Maker Store Calculations</span>
				</Link>
				{/* Use Bootstrap styles for a button to toggle the navbar on mobile devices. 
        It uses the isNavCollapsed state to track the collapse state and handleNavCollapse to toggle the collapse state. */}
				<button
					className="navbar-toggler"
					type="button"
					onClick={handleNavCollapse}
					aria-expanded={!isNavCollapsed}
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
					id="navbarNav"
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link href="/">
								<span className="nav-link active" aria-current="page">
									Home
								</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/box-shipping-calculator">
								<span className="nav-link">Box Shipping Calculator</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/cnc-calibration-tool">
								<span className="nav-link">CNC Calibration Tool</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/enclosure-calculator">
								<span className="nav-link">Enclosure Calculator</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/40-series-extrusions">
								<span className="nav-link">40 Series Extrusions</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/20-series-extrusions">
								<span className="nav-link">20 Series Extrusions</span>
							</Link>
						</li>
						<li className="nav-item">
							<Link href="/cnc-technical-ai">
								<span className="nav-link">CNC Technical AI</span>
							</Link>
						</li>
						{/* Add more navigation links as needed */}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
