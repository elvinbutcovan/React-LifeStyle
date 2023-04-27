// Import necessary modules and components
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import styles from './App.module.css';
import { useNavigate } from 'react-router-dom';

// Profile component
const Profile = ({ updateUserData }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const { userId } = useContext(AuthContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // Utility functions for password validation
  function validatePassword(password) {
    const minLength = 8;
    const hasUppercase = /[A-Z]/;
    const hasLowercase = /[a-z]/;
    const hasDigit = /\d/;
    const hasSpecialChar = /[^A-Za-z0-9]/;
  
    return (
      password.length >= minLength &&
      hasUppercase.test(password) &&
      hasLowercase.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
    );
  }
  

  // Fetch user data when the component is mounted
  useEffect(() => {
    const fetchProfileData = async () => {
      const response = await fetch(`http://localhost:5000/profile/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setAge(data.age);
        setWeight(data.weight);
        setHeight(data.height);
        setGender(data.gender);
        setActivityLevel(data.activityLevel);


        if (updateUserData) {
          updateUserData(data);
        }
      } else {
        console.log('Error fetching profile data');
      }
    };

    if (userId && isAuthenticated) {
      fetchProfileData();
    }
  }, [userId, isAuthenticated, updateUserData]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, name, age, weight, height, gender, activityLevel }),
    });

    if (response.ok) {
      console.log('Profile updated successfully');
      setMessage('Profile updated successfully');

      updateUserData({name, age, weight, height, gender, activityLevel }); // Call updateUserData to update the userData in the App component

      setTimeout(() => {
        setMessage('');
      }, 3000); // Clear the message after 3 seconds
    } else {
      console.log('Error updating profile:', response.status, response.statusText);
      setMessage('Error updating profile');

      setTimeout(() => {
        setMessage('');
      }, 3000); // Clear the message after 3 seconds
    }
  };

  // Function to change user password
  const changePassword = async () => {
    if (newPassword === "" && confirmNewPassword !== "") {
      setPasswordMessage("Please enter a new password");
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
      return;
    }

    if (newPassword !== "" && confirmNewPassword === "") {
      setPasswordMessage("Please confirm your password");
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
      return;
    }

    if (!validatePassword(newPassword)) {
      setPasswordMessage('Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.');
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordMessage('Passwords do not match');
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
      return;
    }
  
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/change_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId, newPassword, confirmNewPassword }),
    });
  
    if (response.ok) {
      setPasswordMessage('Password changed successfully');
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
    } else {
      setPasswordMessage('Error changing password');
      setTimeout(() => {
        setPasswordMessage('');
      }, 3000);
    }
  };
  
  // Logout and delete profile-related functions
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // BMI-related functions
  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const heightInMeters = height / 100;
      const bmi = weight / (heightInMeters * heightInMeters);
      const bmiCategory = getBMICategory(bmi);
  
      return { value: bmi.toFixed(1), category: bmiCategory };
    }
    return { value: "-", category: "" };
  };
  
  
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal weight";
    } else if (bmi >= 24.9 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obesity";
    }
  };
  
  // Function to handle profile deletion
  const handleDeleteProfile = async () => {
    if (window.confirm('Are you sure you want to delete your profile?')) {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/delete-profile/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log('Profile deleted successfully');
        logoutUser(); // Logout the user
        navigate('/login', { replace: true }); // Navigate to the login page
      } else {
        console.log('Error deleting profile:', response.status, response.statusText);
      }
    }
  };

  return (
    <div className={styles.Profile}>
      <form onSubmit={handleSubmit}>
      <h2>Profile</h2>
        <label>Name: </label>
        <input
          className={styles.profilelook}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          minLength="2"
          maxLength="50"
        />
        <br />
        <label>Age: </label>
        <input
          className={styles.profilelook}
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="10"
          max="120"
        />
        <br />
        <label>Gender: </label>
        <select
          className={styles.profilelook}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <br />
        <label>Weight (kg): </label>
        <input
          className={styles.profilelook}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          min="20"
          max="500"
        />
        <br />
        <label>Height (cm): </label>
        <input
          className={styles.profilelook}
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="50"
          max="300"
        />
        <br />
        <label>Activity Level: </label>
        <select
          className={styles.profilelook}
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
        >
          <option value="">Select Activity Level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Light</option>
          <option value="moderate">Moderate</option>
          <option value="active">Active</option>
          <option value="very active">Very Active</option>
        </select>
        <br />
        <button className={styles.button2} type="submit">Update Profile</button>
        {message && <p>{message}</p>} { }
      </form>
      <div className={styles.bmiContainer}>
       <p className={styles.bmiValue}>BMI: {calculateBMI().value}</p>
       <p className={styles.bmiCategory}>{calculateBMI().category}</p>
      </div>
      <img src="/images/body-mass-index-bmi-chart.jpg" alt="BMI" className={styles.image} />
      <br />
      <h2>Change Password</h2>
      <label>New Password: </label>
        <input
          className={styles.profilelook}
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          maxLength={30}
        />
        <br />
        <label>Confirm New Password: </label>
        <input
          className={styles.profilelook}
          type="password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          maxLength={30}
        />

      <button className={styles.button2} onClick={changePassword}>Change Password</button>
      {passwordMessage && <p>{passwordMessage}</p>} { }
      <br />
      <button className={styles.button4} onClick={handleDeleteProfile}>Delete Profile</button>
    </div>

  );
};

export default Profile;
  