// Import necessary modules and components
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import styles from './App.module.css';

// Login component
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Send a request to the backend to log in
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });
  
    // If the response is ok, log in the user and navigate to the home page
    if (response.ok) {
      console.log('User logged in successfully');
      const data = await response.json();
      authenticateUser(data.token, data.user_id);
      navigate('/main'); // Navigate to the home page
    } else {     // If there's an error, display an alert indicating login was unsuccessful
      console.log('Error logging in');
      window.alert('Login unsuccessful'); // Display an alert when login is unsuccessful
    }
  };

  return (
    <>
    <header className="App-header">
        <h1>LifeStyle</h1>
      </header>
    <form onSubmit={handleSubmit} className={styles.formcontainer}>
      <br/>
      <label htmlFor="username">Username: </label>
      <input
        className={styles.inputField2}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value
        )}
        required
      />
      <label htmlFor="password"> Password: </label>
      <input
        className={styles.inputField2}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br/>
      <button type="submit" className={styles.button2} >Login</button>
      <br/>
      <Link to="/register">
        <button type="button" className={styles.button2}
        >Register</button>
      </Link>
    </form>
    </>
  );
};

export default Login;
