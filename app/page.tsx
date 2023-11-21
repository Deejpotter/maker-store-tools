'use client';

import React, { useContext } from 'react';
import { ItemContext } from '../contexts/ItemContext';

export default function Home() {
  const { items } = useContext(ItemContext);

  return (
    <main>
      <h1>Welcome to the Maker Store Calculator</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - Weight Per Meter: {item.weightPerMeter}kg
          </li>
        ))}
      </ul>
      {/* Add more UI components as needed */}
    </main>
  );
}
