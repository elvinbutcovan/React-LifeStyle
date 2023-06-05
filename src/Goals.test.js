import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Goals from './Goals';
import { AuthContext } from './AuthContext';

const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});


const renderWithAuthContext = (userId, updateGoals = () => {}) => {
    return render(
      <AuthContext.Provider value={{ userId }}>
        <Goals updateGoals={updateGoals} />
      </AuthContext.Provider>
    );
  };
  
  
  test('goals update succeeds with valid inputs', async () => {
    renderWithAuthContext(1);
  
    // Mock successful goals update response
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true, // Mock the initial fetch goals response
          json: () =>
            Promise.resolve({
              calorieGoal: 2000,
              waterGoal: 2000,
              sleepGoal: 8,
            }),
        })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({
          ok: true, // Mock the successful goals update response
        })
      );
  
    fireEvent.change(screen.getByLabelText(/Calorie Goal:/i), {
      target: { value: 2000 },
    });
  
    fireEvent.change(screen.getByLabelText(/Water Goal \(ml\):/i), {
      target: { value: 2000 },
    });
  
    fireEvent.change(screen.getByLabelText(/Sleep Goal \(hours\):/i), {
      target: { value: 8 },
    });
  
    fireEvent.click(screen.getByText('Update Goals'));
  
    await waitFor(() => expect(screen.getByText('Goals updated successfully')).toBeInTheDocument());
  });
  
  