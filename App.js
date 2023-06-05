// Import necessary modules and components
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import AuthProvider, { AuthContext } from './AuthContext';
import ExerciseDescriptions from './ExerciseDescriptions';

// PrivateRoutes component to handle authenticated navigation
function PrivateRoutes() {
  // Get authentication status from AuthContext
  const { isAuthenticated } = useContext(AuthContext);

  // Initialize navigate hook for redirecting if not authenticated
  const navigate = useNavigate();

  // If not authenticated, navigate to the login page
  if (!isAuthenticated) {
    navigate('/login');
  }

  // Render Outlet component for nested routes
  return <Outlet />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<PrivateRoutes />}>
            <Route index element={<Home />} />
            <Route path="exercise_descriptions" element={<ExerciseDescriptions />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
