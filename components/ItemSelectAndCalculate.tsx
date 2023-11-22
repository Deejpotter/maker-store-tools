'use client';
import React, { useState, useEffect } from "react";
import ShippingItem from "@/interfaces/ShippingItem";

export default function ItemSelectAndCalculate = ({ items, onCalculateBox }: ) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<ShippingItem[]>([]);

  const handleSearchBlur = () => {
    // Logic to filter items based on searchTerm
    // Update a state that holds the search results
  };

  const handleSelectItem = (item: ShippingItem) => {
    setSelectedItems([...selectedItems, item]);
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onBlur={handleSearchBlur}
        placeholder="Search Items"
      />
      {/* Display search results with logic to select items */}
      {/* List of selected items */}
      <button onClick={() => onCalculateBox(selectedItems)}>
        Calculate Box
      </button>
    </div>
  );
};
