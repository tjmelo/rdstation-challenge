import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from './Features';

test('renders Features component', () => {
    render(<Features />);
    const linkElement = screen.getByText(/features/i);
    expect(linkElement).toBeInTheDocument();
});