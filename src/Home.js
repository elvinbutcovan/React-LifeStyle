// Import necessary modules and components
import React, { useContext, useState, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import "./App.css";
import MuscleGroupForm from "./MuscleGroupForm";
import styles from './App.module.css';
import Profile from './Profile';
import DailyDiary from './DailyDiary';
import Recommendations from './Recommendations';
import Goals from './Goals';

// Home component
function Home() {

  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [goalsData, setGoalsData] = useState({});

  // Update goals data
  const updateGoals = useCallback((data) => {
    setGoalsData(data);
  }, []);

  // Update user data
  const updateUserData = useCallback((data) => {
    setUserData(data);
  }, []);
  
  // Handle logout
  const handleLogout = () => {
    logoutUser();
    navigate('/login', { replace: true });
};

  return (
    <div className="App">
      <header className="App-header">
        <h1>LifeStyle</h1>
      </header>
      <div className={styles.contentContainer}>
        <Profile updateUserData={updateUserData} />
        <main>
        <DailyDiary 
          calorieGoal={goalsData.calorieGoal}
          waterGoal={goalsData.waterGoal}
          sleepGoal={goalsData.sleepGoal}
        />
        <div className={styles.container2}>
        <Recommendations
            age={userData.age}
            weight={userData.weight}
            height={userData.height}
            gender={userData.gender}
            activityLevel={userData.activityLevel}
        />
        <Goals updateGoals={updateGoals} />
        </div>
        <MuscleGroupForm />
        <Link to="exercise_descriptions">
        <button className={styles.button5}>View Exercise Descriptions</button>
        </Link>
        <br/>
        <button className={styles.button3} onClick={handleLogout}>Logout </button>
        </main>
      </div >
    </div>
  );
}

export default Home;