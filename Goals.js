// Import necessary modules and components
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import styles from './App.module.css';

// Goals component
const Goals = ({ updateGoals }) => {
  // Declare state variables for calorie, water, and sleep goals, and a message for user feedback
  const [calorieGoal, setCalorieGoal] = useState('');
  const [waterGoal, setWaterGoal] = useState('');
  const [sleepGoal, setSleepGoal] = useState('');
  const { userId } = useContext(AuthContext);
  const [message, setMessage] = useState('');

  // useEffect to fetch goals for the user when the component mounts or userId changes
  useEffect(() => {
    const fetchGoals = async () => {    // Define an async function to fetch goals
      const response = await fetch(`http://localhost:5000/goals/${userId}`);
      // Send a request to the API to fetch the goals for the user

      // If the response is ok, process the data and update state variables
      if (response.ok) {
        const data = await response.json();
        setCalorieGoal(data.calorieGoal);
        setWaterGoal(data.waterGoal);
        setSleepGoal(data.sleepGoal);
  
        // If the updateGoals prop is provided, call it with the fetched goals
        if (updateGoals) {
          updateGoals(data);
        }
      } else {      // Log an error if the response is not ok
        console.log('Error fetching goals');
      }
    };

    // Call fetchGoals if userId is available
    if (userId) {
      fetchGoals();
    }
  }, [userId, updateGoals]);

  // Define a function to handle form submission and update goals
  const handleSubmit = async (e) => {
    e.preventDefault();     // Prevent default form submission behavior
    const token = localStorage.getItem('token');     // Get the token from local storage
    
    // Send a request to the API to update the goals for the user
    const response = await fetch('http://localhost:5000/goals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId, calorieGoal, waterGoal, sleepGoal }),
    });

    // If the response is ok, log the success and update the message state variable
    if (response.ok) {
      console.log('Goals updated successfully');
      setMessage('Goals updated successfully');
      updateGoals({ calorieGoal, waterGoal, sleepGoal });
      setTimeout(() => {     // Call the updateGoals prop with the new goals and clear the message after a timeout
        setMessage('');
      }, 3000);
    } else {     // Call the updateGoals prop with the new goals and clear the message after a timeout
      console.log('Error updating goals:', response.status, response.statusText);
      setMessage('Error updating goals');
      setTimeout(() => {
        setMessage('');    // Clear the message after a timeout
      }, 3000);
    }
  };

  return (
    <div className={styles.goals}>
      <h2>Set Your Goals</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
        <label htmlFor="calorieGoal">Calorie Goal: </label>
        <input
          id="calorieGoal" 
          className={styles.inputField4}
          type="number"
          value={calorieGoal}
          onChange={(e) => setCalorieGoal(e.target.value)}
          min="0"
          max="50000"
        />
        </div>
        <br />
        <div className={styles.inputGroup}>
        <label htmlFor="waterGoal">Water Goal (ml): </label>
        <input
          id="waterGoal"
          className={styles.inputField4}
          type="number"
          value={waterGoal}
          onChange={(e) => setWaterGoal(e.target.value)}
          min="0"
          max="10000"
        />
        </div>
        <br />
        <div className={styles.inputGroup}>
        <label htmlFor="sleepGoal">Sleep Goal (hours): </label>
        <input
          id="sleepGoal"
          className={styles.inputField4}
          type="number"
          value={sleepGoal}
          onChange={(e) => setSleepGoal(e.target.value)}
          min="0"
          max="1000"
        />
        </div>
        <br />
        <button type="submit" className={styles.submitButton}>Update Goals</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Goals;
