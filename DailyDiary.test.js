import { render, screen, waitFor } from '@testing-library/react';
import DailyDiary from './DailyDiary';
import { AuthContext } from './AuthContext';
import { act } from 'react-dom/test-utils';


const originalFetch = global.fetch;
afterAll(() => {
  global.fetch = originalFetch;
});

const renderWithAuthContext = (userId) => {
    return act(() => {
      render(
        <AuthContext.Provider value={{ userId }}>
          <DailyDiary />
        </AuthContext.Provider>
      );
    });
  };

describe('DailyDiary', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      });
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('updates charts successfully with daily diary data', async () => {
    const mockData = [
      {
        date: '2023-04-22',
        calories: 2500,
        water: 8,
        sleep: 7,
      },
    ];

    fetch.mockImplementationOnce(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      }));
    
    renderWithAuthContext('12345');

    // Check for the presence of chart titles
    await waitFor(() => expect(screen.getByText(/Calorie Intake Chart/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Water Intake Chart/)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Sleep Chart/)).toBeInTheDocument());
  });
});
