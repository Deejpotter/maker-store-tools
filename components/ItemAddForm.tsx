'use client';
import React, { useState, useEffect } from "react";

const ItemAddForm = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    length: 0,
    width: 0,
    height: 0,
    weight: 0,
  });

  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    onAddItem(newItem);
    setNewItem({ name: "", length: 0, width: 0, height: 0, weight: 0 }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        placeholder="Item Name"
        required
      />
      {/* Similar inputs for length, width, height, and weight */}
      <button type="submit">Add Item</button>
    </form>
  );
};
