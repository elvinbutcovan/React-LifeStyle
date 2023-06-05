import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Profile from './Profile';
import { AuthContext } from './AuthContext';
import { BrowserRouter } from 'react-router-dom';

const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});

const renderWithAuthContext = (userId, updateUserData = () => {}) => {
    const AuthContextValue = { userId, isAuthenticated: true, logoutUser: jest.fn() };
  
    // Mock the fetch function for fetching user data
    global.fetch = jest.fn().mockImplementation((url) => {
      if (url.includes(`/profile/${userId}`)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ name: '', age: '', weight: '', height: '', gender: '', activityLevel: '' }),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Profile updated successfully' })
      });
    });
  
    return render(
      <AuthContext.Provider value={AuthContextValue}>
        <BrowserRouter>
          <Profile updateUserData={updateUserData} />
        </BrowserRouter>
      </AuthContext.Provider>
    );
  };
  

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('updates profile with valid inputs', async () => {
    renderWithAuthContext(1);

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Profile updated successfully' }),
      })
    );

    fireEvent.change(screen.getByLabelText(/Name:/i), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByLabelText(/Age:/i), {
      target: { value: 25 },
    });

    fireEvent.change(screen.getByLabelText(/Weight \(kg\):/i), {
      target: { value: 70 },
    });

    fireEvent.change(screen.getByLabelText(/Height \(cm\):/i), {
      target: { value: 180 },
    });

    fireEvent.change(screen.getByLabelText(/Gender:/i), {
      target: { value: 'male' },
    });

    fireEvent.change(screen.getByLabelText(/Activity Level:/i), {
      target: { value: 'active' },
    });

    fireEvent.click(screen.getByText('Update Profile'));

    await waitFor(() => expect(screen.getByText('Profile updated successfully')).toBeInTheDocument());
  });

  test('changes password with valid inputs', async () => {
    renderWithAuthContext(1);

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: 'Password changed successfully' }),
      })
    );

    const [passwordInput, confirmPasswordInput] = screen.getAllByLabelText(/New Password:/i);
  
    fireEvent.change(passwordInput, {
        target: { value: 'N3wPassw@rd!' },
    });
  
    fireEvent.change(confirmPasswordInput, {
        target: { value: 'N3wPassw@rd!' },
    });


    fireEvent.click(screen.getByText(/^Change Password$/i));

    await waitFor(() => expect(screen.getByText('Password changed successfully')).toBeInTheDocument());
  });
});
