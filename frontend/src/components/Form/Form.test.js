import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

jest.mock('../../hooks/useProducts', () => () => ({
  preferences: ['Preference 1', 'Preference 2'],
  features: ['Feature 1', 'Feature 2'],
  products: ['Product 1', 'Product 2'],
}));

jest.mock('../../hooks/useForm', () => () => ({
  formData: {
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: '',
  },
  handleChange: jest.fn(),
}));

jest.mock('../../hooks/useRecommendations', () => (products) => ({
  getRecommendations: jest.fn(() => ['Recommendation 1', 'Recommendation 2']),
  recommendations: [],
}));

describe('Form Component', () => {
  it('should call listRecommendations with the correct data on form submission', () => {
    const mockListRecommendations = jest.fn();

    render(<Form listRecommendations={mockListRecommendations} />);

    const submitButton = screen.getByText('Obter recomendação');
    fireEvent.click(submitButton);

    expect(mockListRecommendations).toHaveBeenCalledWith([
      'Recommendation 1',
      'Recommendation 2',
    ]);
  });
});