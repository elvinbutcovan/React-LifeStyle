// Import necessary modules and components
import React from 'react';
import styles from './App.module.css';

// Recommendations component
const Recommendations = ({ age, weight, height, gender, activityLevel }) => {
  // Function to calculate daily caloric needs based on user information
  const calculateDailyCaloricNeeds = () => {
    if (!age || !weight || !height || !gender || !activityLevel) {
      return '-';
    }

    // Calculate Basal Metabolic Rate (BMR) using Mifflin-St Jeor Equation
    const BMR =
      10 * weight +
      6.25 * height -
      5 * age +
      (gender === 'male' ? 5 : -161);

    // Define activity level multipliers
    const activityMultiplier = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      'very active': 1.9,
    };

    // Calculate and return daily caloric needs
    return Math.round(BMR * activityMultiplier[activityLevel]);
  };

  // Function to calculate daily water intake based on user weight
  const calculateDailyWaterIntake = () => {
    // Check if weight data is available
    if (!weight) {
      return '-';
    }
    // Calculate and return daily water intake in ml
    return Math.round((weight / 30) * 1000);
  };

  // Function to determine sleep recommendation based on user age
  const sleepRecommendation = () => {
    // Check if age data is available
    if (!age) {
      return '-';
    }

    // Determine sleep recommendation based on age
    if (age <= 17) {
      return '8-10 hours';
    } else if (age <= 64) {
      return '7-9 hours';
    } else {
      return '7-8 hours';
    }
  };

  return (
    <div className={styles.recommendations} >
      <h2>Recommendations</h2>
      <label>Please note that these recommendations are general guidelines and may not be suitable for everyone. 
        Individual needs can vary, and it's always a good idea to consult with a healthcare professional for personalized advice.</label>
      <label>(Complete profile to receive recommendations)</label>      
      <div className={styles.recommendation}>
        <h4>Daily Caloric Needs:</h4>
        <p>{calculateDailyCaloricNeeds()} kcal</p>
      </div>
      <div className={styles.recommendation}>
        <h4>Daily Water Intake:</h4>
        <p>{calculateDailyWaterIntake()} ml</p>
      </div>
      <div className={styles.recommendation}>
        <h4>Sleep Recommendation:</h4>
        <p>{sleepRecommendation()}</p>
      </div>
    </div>
  );
};

export default Recommendations;
