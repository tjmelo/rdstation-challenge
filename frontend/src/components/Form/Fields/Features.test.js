import React from 'react';
import { render, screen } from '@testing-library/react';
import Features from './Features';

describe('Features Component', () => {
  it('should render the Features component', () => {
    render(<Features features={['Feature 1', 'Feature 2']} onFeatureChange={jest.fn()} />);
    const featureElement = screen.getByText(/Feature 1/i);
    expect(featureElement).toBeInTheDocument();
  });
});