import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MuscleGroupForm from './MuscleGroupForm';

const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});

// Mock the fetch function to simulate server response
global.fetch = jest.fn(() =>
  Promise.resolve({
    text: () => Promise.resolve('[{"muscleType": "Chest", "exerciseDescription": "Bench Press", "reps": 10, "weight": 50}]'),
  })
);

describe('MuscleGroupForm', () => {
  test('renders the form correctly', () => {
    render(<MuscleGroupForm />);
    expect(screen.getByText('Workout Generator')).toBeInTheDocument();
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

});
