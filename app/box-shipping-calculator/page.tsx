"use client";
import React, { useState, useEffect } from "react";

import ShippingItem from "@/interfaces/ShippingItem";
import ItemAddForm from "@/components/ItemAddForm";
import ItemSelectAndCalculate from "@/components/ItemSelectAndCalculate";

// Helper function to calculate the volume
const calculateVolume = ({
  length,
  width,
  height,
}: {
  length: number;
  width: number;
  height: number;
}): number => {
  return length * width * height;
};

const BoxShippingCalculatorPage: React.FC = () => {
  const [items, setItems] = useState<ShippingItem[]>([]);

  const handleAddItem = (item: ShippingItem) => {
    setItems((prevItems) => [...prevItems, item]);
  };

  const handleCalculateBox = () => {
    // Logic to calculate the required box size
  };

  return (
    <div>
      <h1>Box Shipping Calculator</h1>
      <ItemSelectAndCalculate
        items={items}
        onCalculateBox={handleCalculateBox}
      />
      <ItemAddForm onAddItem={handleAddItem} />
    </div>
  );
};

export default BoxShippingCalculatorPage;
