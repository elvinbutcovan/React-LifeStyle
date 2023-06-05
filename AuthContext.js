import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState(null);


// Check if the user is already authenticated on page load
React.useEffect(() => {
  const token = localStorage.getItem('token');
  const storedUserId = localStorage.getItem('userId');
  if (token && storedUserId) {
    setIsAuthenticated(true);
    setUserId(storedUserId);
  }
}, []);

// Handle user authentication
const authenticateUser = (token, userId) => {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  setIsAuthenticated(true);
  setUserId(userId);
};

// Handle user logout
const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  setIsAuthenticated(false);
  setUserId(null);
};

return (
  <AuthContext.Provider
    value={{ isAuthenticated, authenticateUser, logoutUser, userId }}
  >
    {children}
  </AuthContext.Provider>
);
};

export default AuthProvider;