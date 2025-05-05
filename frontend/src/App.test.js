import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/Form/Form', () => ({ listRecommendations }) => {
  return (
    <button
      onClick={() =>
        listRecommendations([
          { name: 'RD Station CRM' },
          { name: 'RD Station Marketing' },
        ])
      }
    >
      Submit Form
    </button>
  );
});

jest.mock('./components/RecommendationList/RecommendationList', () => ({
  recommendations,
}) => {
  return (
    <ul>
      {recommendations.map((rec, index) => (
        <li key={index}>{rec.name}</li>
      ))}
    </ul>
  );
});

describe('App Component', () => {
  it('should render the App component with a heading and description', () => {
    render(<App />);
    const headingElement = screen.getByRole('heading', {
      name: /recomendador de produtos rd station/i,
    });
    const descriptionElement = screen.getByText(/bem-vindo ao recomendador de produtos rd station/i);

    expect(headingElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('should update the RecommendationList when the Form is submitted', () => {
    render(<App />);

    const submitButton = screen.getByText('Submit Form');
    fireEvent.click(submitButton);

    const recommendationItems = screen.getAllByRole('listitem');
    expect(recommendationItems).toHaveLength(2);
    expect(recommendationItems[0]).toHaveTextContent('RD Station CRM');
    expect(recommendationItems[1]).toHaveTextContent('RD Station Marketing');
  });
});