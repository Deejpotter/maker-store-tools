import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CuttingCalculator from './page';

// Calculating the cut list for 2 x 700mm parts should result in 1 x 1500mm extrusion being added to the invoice and 1 x 1500mm extrusion being cut to 2 x 700mm parts.
test('outputs correct text for 2 x 700mm parts', () => {
    render(<CuttingCalculator />);

    fireEvent.click(screen.getByText('Add Part'));

    // Set the length and quantity of the first part
    const lengthInputs = screen.getAllByPlaceholderText('Length (mm)');
    const quantityInputs = screen.getAllByPlaceholderText('Quantity');
    fireEvent.change(lengthInputs[0], { target: { value: '700' } });
    fireEvent.change(quantityInputs[0], { target: { value: '2' } });

    // Calculate the cut list
    fireEvent.click(screen.getByText('Calculate Cut List'));

    // Check the output
    expect(screen.getByText('Extrusion added to invoice: 1 x LR-20x20-S-1500')).toBeInTheDocument();
    expect(screen.getByText('Cutting fee: 1 x LR-20x20-S-1500 cut to 2 x LR-20x20-S-700')).toBeInTheDocument();
});