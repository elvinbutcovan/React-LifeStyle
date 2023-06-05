// Import necessary modules and components
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// ProtectedRoute component
const ProtectedRoute = ({ path, element }) => {
  // Get isAuthenticated value from AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is authenticated, render the Route, else navigate to the login page
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Create AuthContext
export const AuthContext = createContext();
