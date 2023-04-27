// Import necessary modules and components
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './App.module.css';

// Function to validate if the password meets specific criteria
function validatePassword(password) {
  // Define password criteria
  const minLength = 8;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasDigit = /\d/;
  const hasSpecialChar = /[^A-Za-z0-9]/;

  // Return true if the password meets all criteria
  return (
    password.length >= minLength &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasDigit.test(password) &&
    hasSpecialChar.test(password)
  );
}

// Function to validate if the email format is correct
function validateEmail(email) {
  // Define email format regex
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  // Return true if the email matches the regex
  return emailRegex.test(email);
}

// Register component
const Register = () => {
  // State hooks for form data and error/success messages
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();     // Prevent default form submission behavior

    // Check if password meets the criteria
    if (!validatePassword(password)) {
      setError('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      return;
    }

    // Check if email format is correct
    if (!validateEmail(email)) {
      setError('Invalid Email');
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setTimeout(() => {
        setError('');
      }, 5000);
      return;
    }
  
    // Send registration request to the server
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password, confirmPassword }),
    });
  
    // Handle registration response
    if (response.ok) {
      console.log('Registration successful');
      setSuccess(true);
    } else {
      console.log('Error registering:', response.status, response.statusText);
      const data = await response.json();
      setError(data.message);
    }
  };

  // Function to handle successful registration
  const handleSuccessOk = () => {
    navigate('/login');    // Navigate to the login page
  };

  // Initialize navigate hook for login navigation
  const navigatelogin = useNavigate();

  return (
    <>
    <header className="App-header">
        <h1>LifeStyle</h1>
      </header>
    {!success ? (
      <form onSubmit={handleSubmit} className={styles.formcontainer}>
      <br/>
      <label htmlFor="username">Username:</label>
      <input
        className={styles.inputField2}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label htmlFor="email">Email:</label>
      <input
        className={styles.inputField2}
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        maxLength={60}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        className={styles.inputField2}
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        maxLength={30}
        required
      />
      <label>Confirm Password: </label>
        <input
          className={styles.inputField2}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          maxLength={30}
          required
        />
      {error && (
      <div className="error">
        {error}
      </div>
      )}
      <br/>
      <button type="submit" className={styles.button2}>Register</button>
      <br/>
      <button type="button" className={styles.button2} onClick={() => navigatelogin('/login')}>
         Back to Login
      </button>
    </form>
    ) : (
      <div className="App">
        <br/>
        <p>Registered successfully!</p>
        <br/>
        <button type="button" className={styles.button2} onClick={handleSuccessOk}>
        OK
        </button>
        </div>
      )}
    </>
  );
};

export default Register;
