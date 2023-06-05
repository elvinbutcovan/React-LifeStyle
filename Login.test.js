import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import Login from './Login';

const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});


// Utility function to render the Login component
const renderWithContext = (authenticateUser) => {
    return render(
      <AuthContext.Provider value={{ authenticateUser }}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };

  test('user logs in successfully with correct credentials', async () => {
    const authenticateUser = jest.fn();
    renderWithContext(authenticateUser);
  
    // Mock successful login response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'test-token', user_id: 'test-user-id' }),
      })
    );
  
    fireEvent.change(screen.getByLabelText(/Username:/i), {
      target: { value: 'testuser' },
    });
  
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'testpassword' },
    });
  
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => expect(authenticateUser).toHaveBeenCalledWith('test-token', 'test-user-id'));
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
    });
  });
  
  test('user login fails with incorrect credentials', async () => {
    const authenticateUser = jest.fn();
    renderWithContext(authenticateUser);
  
    // Mock unsuccessful login response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );
  
    fireEvent.change(screen.getByLabelText(/Username:/i), {
      target: { value: 'wronguser' },
    });
  
    fireEvent.change(screen.getByLabelText(/Password:/i), {
      target: { value: 'wrongpassword' },
    });
  
    fireEvent.click(screen.getByText('Login'));
  
    await waitFor(() => expect(authenticateUser).not.toHaveBeenCalled());
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'wronguser', password: 'wrongpassword' }),
    });
  });
  
  