"use client";

import LayoutContainer from "@/components/LayoutContainer";
import React, { useState, useEffect } from "react";

// Define interfaces
interface Item {
  id: string;
  name: string;
  length: number;
  width: number;
  height: number;
  weight: number;
}

interface BoxDimension {
  id: string;
  length: number;
  width: number;
  height: number;
  maxWeight: number;
}

interface UserSelection {
  itemId: string;
  quantity: number;
}

interface CalculatedBox {
  boxId: string;
  items: UserSelection[];
}

const BoxShippingCalculatorPage: React.FC = () => {

  return (
    <LayoutContainer>
      <h1>CNC Calibration Tool</h1>
    </LayoutContainer>
  );
};

export default BoxShippingCalculatorPage;
