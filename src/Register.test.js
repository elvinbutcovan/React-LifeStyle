import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Register from './Register';

const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});

test('user registration fails with invalid inputs', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  
    // Mock unsuccessful registration response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Error registering' }),
      })
    );
  
    fireEvent.change(screen.getByLabelText(/Username:/i), {
      target: { value: 'testuser' },
    });
  
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'invalid_email' },
    });

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/Password:/i);

    fireEvent.change(passwordInput, {
      target: { value: 'testpassword' },
    });
  
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'testpassword' },
    });
  
    fireEvent.click(screen.getByText('Register'));
  
    await waitFor(() => expect(screen.getByText('Invalid Email')).toBeInTheDocument());

  });
  
  test('user registration succeeds with valid inputs', async () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  
    // Mock successful registration response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );
  
    fireEvent.change(screen.getByLabelText(/Username:/i), {
      target: { value: 'testuser' },
    });
  
    fireEvent.change(screen.getByLabelText(/Email:/i), {
      target: { value: 'testuser@example.com' },
    });

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/Password:/i);
  
    fireEvent.change(passwordInput, {
      target: { value: 'Test123$' },
    });
  
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Test123$' },
    });
  
    fireEvent.click(screen.getByText('Register'));
  
    await waitFor(() => expect(screen.getByText(/Registered successfully!/i)).toBeInTheDocument());
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'Test123$',
        confirmPassword: 'Test123$',
      }),
    });
  });
  