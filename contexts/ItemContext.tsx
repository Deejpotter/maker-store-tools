'use client';

import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface Item {
  id: number;
  name: string;
  weightPerMeter: number;
}

interface ItemContextType {
  items: Item[];
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
}

const defaultContextValue: ItemContextType = {
  items: [],
  setItems: () => {}
};

export const ItemContext = createContext<ItemContextType>(defaultContextValue);

export const ItemProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        const mockItems: Item[] = [
            { id: 1, name: '2080 Extrusion', weightPerMeter: 1.52 }
        ];
        setItems(mockItems);
    }, []);

    return (
        <ItemContext.Provider value={{ items, setItems }}>
            {children}
        </ItemContext.Provider>
    );
};
