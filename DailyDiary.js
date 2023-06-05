// Import required libraries, hooks, and components
// Import styling and Recharts for the line chart
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import styles from './App.module.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// DailyDiary component accepts calorieGoal, waterGoal, and sleepGoal as props
// and displays a form to submit daily diary data and charts for the past week's data
const DailyDiary = ({ calorieGoal, waterGoal, sleepGoal }) => {
  // Set initial states for various variables and hooks (omitted for brevity)
  const { userId } = useContext(AuthContext);
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));
  const [water, setWater] = useState(0);
  const [sleep, setSleep] = useState(0);
  const [calories, setCalories] = useState(0);
  const { isAuthenticated } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [exercises, setExercises] = useState([]);
  const [chartDataCalories, setChartDataCalories] = useState([]);
  const [chartDataWater, setChartDataWater] = useState([]);
  const [chartDataSleep, setChartDataSleep] = useState([]);
  const [dataChanged, setDataChanged] = useState(false);
  const [averages, setAverages] = useState({
    avgWater: 0,
    avgSleep: 0,
    avgCalories: 0,
  });

  // handleSubmit function is called when the form is submitted
  // It sends a POST request with the daily diary data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5000/dailydiary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId, date, water, sleep, calories, exercises }),
    });

    if (response.ok) {
      setMessage('Daily diary updated successfully');
      setTimeout(() => {
        setMessage('');
      }, 5000);
      setDataChanged(!dataChanged);
    } else {
      setMessage('Error updating daily diary');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  // Fetch and set the daily diary data for the selected date
  // If no data is found, reset the states to their initial values
  useEffect(() => {
    const fetchDailyDiaryData = async () => {
      const response = await fetch(`http://localhost:5000/dailydiary/${userId}/${date}`);
  
      if (response.ok) {
        const data = await response.json();
        setWater(data.water);
        setSleep(data.sleep);
        setCalories(data.calories);
        if (data.exercises) {
          setExercises(JSON.parse(data.exercises));
        } else {
          setExercises([]); // Set to an empty array if no exercises data exists
        }      } else if (response.status === 404) {
        // Reset states to initial values when there's no entry
        setWater(0);
        setSleep(0);
        setCalories(0);
        setExercises([]); // Set to an empty array if no exercises data exists
      } else {
        console.log('Error fetching daily diary data');
      }
    };
  
    if (userId && isAuthenticated) {
      fetchDailyDiaryData();
    }
  }, [date, userId, isAuthenticated]);

  // Fetch and set the chart data for the past week
  // Format the data for calories, water, and sleep
  // Fill any missing dates in the data with zero values
  // Sort the formatted data by date (ascending order)
  useEffect(() => {
    const fetchChartData = async () => {
      const response = await fetch('http://localhost:5000/daily-diary?days=7&userId=' + userId);

      if (response.ok) {
        const data = await response.json();

        const formattedDataCalories = data.map((entry) => ({
          date: entry.date,
          calories: entry.calories,
        }));
        
        const formattedDataWater = data.map((entry) => ({
          date: entry.date,
          water: entry.water,
        }));
        
        const formattedDataSleep = data.map((entry) => ({
          date: entry.date,
          sleep: entry.sleep,
        }));

        const fillMissingDates = (formattedData, key) => {
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          for (let i = 0; i < 7; i++) {
            const dateStr = currentDate.toISOString().substr(0, 10);
            if (!formattedData.some((entry) => entry.date === dateStr)) {
              formattedData.push({ date: dateStr, [key]: 0 });
            }
            currentDate.setDate(currentDate.getDate() - 1);
          }
        };
        
        fillMissingDates(formattedDataCalories, "calories");
        fillMissingDates(formattedDataWater, "water");
        fillMissingDates(formattedDataSleep, "sleep");

        // Sort the data by date (ascending order)
        formattedDataCalories.sort((a, b) => new Date(a.date) - new Date(b.date));
        formattedDataWater.sort((a, b) => new Date(a.date) - new Date(b.date));
        formattedDataSleep.sort((a, b) => new Date(a.date) - new Date(b.date));

        setChartDataCalories(formattedDataCalories);
        setChartDataWater(formattedDataWater);
        setChartDataSleep(formattedDataSleep);
      } else {
        console.log('Error fetching chart data');
      }
    };

    if (userId && isAuthenticated) {
      fetchChartData();
    }
  }, [userId, isAuthenticated, dataChanged]);

  // Fetch and set the averages for water, sleep, and calories
  useEffect(() => {
    const fetchAverages = async () => {
      const response = await fetch(`http://localhost:5000/dailydiary/averages/${userId}`);

      if (response.ok) {
        const data = await response.json();
        setAverages(data);
      } else {
        console.error(`Error: ${response.status}`);
      }
    };

    if (userId && isAuthenticated) {
      fetchAverages();
    }
  }, [userId, isAuthenticated, dataChanged]);

  // Generate daily recommendations based on the user's goals
  // and their daily diary data for water, sleep, and calories
  const generateDailyRecommendations = () => {
    const recommendations = [];

    if (water < (waterGoal-100)) {
      recommendations.push(
        `You are drinking less water than your goal. Remember to stay hydrated and drink more water throughout the day. Your intake for today is ${(water
        )} ml, but your goal is ${waterGoal} ml.`
      );
    } else if (water > waterGoal+100) {
        recommendations.push(
          `You are drinking more water than your goal. Good job staying hydrated! Your intake for today is ${(water
          )} ml, but your goal is ${waterGoal} ml.`
        );
    } else {
      recommendations.push(
        `Your water intake for today is on track. You are drinking ${(water
        )} ml, meeting your goal of ${waterGoal} ml.`
      );
    }

    if (sleep < sleepGoal-0.5) {
      recommendations.push(
        `You are getting less sleep than your goal. Consider improving your sleep hygiene or adjusting your bedtime routine. Your average sleep is ${(sleep
        )} hours, but your goal is ${sleepGoal} hours.`
      );
    } else if (sleep > sleepGoal+0.5) {
        recommendations.push(
          `You are getting more sleep than your goal. Keep up the good sleep habits! Your average sleep is ${(sleep
          )} hours, but your goal is ${sleepGoal} hours.`
        );
    } else {
      recommendations.push(
        `Your average sleep hours are on track. You are getting ${(sleep
        )} hours, meeting your goal of ${sleepGoal} hours.`
      );
    }

    if (calories < calorieGoal-100) {
      recommendations.push(
        `You are consuming fewer calories than your goal. Consider increasing your calorie intake or adjusting your goal. Your current intake for today is ${(calories
        )} kcal, but your goal is ${calorieGoal} kcal.`
      );
    } else if (calories > calorieGoal+100) {
      recommendations.push(
        `You are consuming more calories than your goal. Consider reducing your calorie intake or increasing physical activity. Your current intake for today is ${(calories
        )} kcal, but your goal is ${calorieGoal} kcal.`
      );
    } else {
      recommendations.push(
        `Your average calorie intake is on track. You are consuming ${(calories
        )} kcal, meeting your goal of ${calorieGoal} kcal.`
      );
    }

    return recommendations;
  };

  const generateWeeklyRecommendations = () => {
    const recommendations = [];

    if (averages.avgWater < waterGoal-100) {
      recommendations.push(
        `You are drinking less water than your goal. Remember to stay hydrated and drink more water throughout the day. Your average intake for the last 7 days is ${averages.avgWater.toFixed(
          1
        )} ml, but your goal is ${waterGoal} ml.`
      );
    } else if (averages.avgWater > waterGoal+100) {
        recommendations.push(
          `You are drinking more water than your goal. Good job staying hydrated! Your average intake for the last 7 days is ${averages.avgWater.toFixed(
            1
          )} ml, but your goal is ${waterGoal} ml.`
        );
    } else {
      recommendations.push(
        `Your average water intake is on track. Your average amount drank for the last 7 days is ${averages.avgWater.toFixed(
          1
        )} ml, meeting your goal of ${waterGoal} ml.`
      );
    }

    if (averages.avgSleep < sleepGoal-0.5) {
      recommendations.push(
        `You are getting less sleep than your goal. Consider improving your sleep hygiene or adjusting your bedtime routine. Your average sleep for the last 7 days is ${averages.avgSleep.toFixed(
          1
        )} hours, but your goal is ${sleepGoal} hours.`
      );
    } else if (averages.avgSleep > sleepGoal+0.5) {
        recommendations.push(
          `You are getting more sleep than your goal. Keep up the good sleep habits! Your average sleep for the last 7 days is ${averages.avgSleep.toFixed(
            1
          )} hours, but your goal is ${sleepGoal} hours.`
        );
    } else {
      recommendations.push(
        `Your average sleep hours are on track. You have been getting an average of ${averages.avgSleep.toFixed(
          1
        )} hours of sleep for the last 7 days, meeting your goal of ${sleepGoal} hours.`
      );
    }

    if (averages.avgCalories < calorieGoal-100) {
      recommendations.push(
        `You are consuming fewer calories than your goal. Consider increasing your calorie intake or adjusting your goal. Your average intake for the last 7 days is ${averages.avgCalories.toFixed(
          1
        )} kcal, but your goal is ${calorieGoal} kcal.`
      );
    } else if (averages.avgCalories > calorieGoal+100) {
      recommendations.push(
        `You are consuming more calories than your goal. Consider reducing your calorie intake or increasing physical activity. Your average intake for the last 7 days is ${averages.avgCalories.toFixed(
          1
        )} kcal, but your goal is ${calorieGoal} kcal.`
      );
    } else {
      recommendations.push(
        `Your average calorie intake is on track. You have been consuming an average of ${averages.avgCalories.toFixed(
          1
        )} kcal for the last 7 days, meeting your goal of ${calorieGoal} kcal.`
      );
    }

    return recommendations;
  };

  // Add a new exercise entry to the exercises state
  const addExercise = () => {
      setExercises([
        ...exercises,
        {
          name: "",
          bodyPart: "",
          reps: null,
          weight: null,
        },
      ]);
  };

  // Remove an exercise entry from the exercises state by its index
  const removeExercise = (indexToRemove) => {
    setExercises(exercises.filter((_, index) => index !== indexToRemove));
  };
  

  return (
    <div className={styles.dailyDiary}>
      <form onSubmit={handleSubmit} >
        <h1>Daily Diary</h1>
        <div className={styles.inputGroup}>
        <label>Date: </label>
        <input
          className={styles.inputField1}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        </div>
        <br />
        <div className={styles.inputGroup}>
        <label>Water (ml): </label>
        <input
          className={styles.inputField2}
          type="number"
          value={water}
          onChange={(e) => setWater(e.target.value)}
          min="0"
          max="10000"
        />
        </div>
        <div className={styles.inputGroup}>
        <label>Sleep (hours): </label>
        <input
          className={styles.inputField2}
          type="number"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
          min="0"
          max="1000"
        />
        </div>
        <div className={styles.inputGroup}>
        <label>Calories: </label>
        <input
          className={styles.inputField2}
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          min="0"
          max="50000"
        />
        </div>
        <h2>Exercises</h2>
        {exercises.map((exercise, index) => (
          <div key={index} className={styles.inputGroup}>
            <label>Name: </label>
        <input
          className={styles.inputField3}
          type="text"
          value={exercise.name}
          maxLength="100"
          onChange={(e) => {
            const newExercises = [...exercises];
            newExercises[index].name = e.target.value;
            setExercises(newExercises);
          }}
        />
        <label> Body Part: </label>
        <input
          className={styles.inputField3}
          type="text"
          value={exercise.bodyPart}
          maxLength="100"
          onChange={(e) => {
            const newExercises = [...exercises];
            newExercises[index].bodyPart = e.target.value;
            setExercises(newExercises);
          }}
        />
        <label> Reps: </label>
        <input
          className={styles.inputField3}
          type="number"
          value={exercise.reps}
          min="0"
          max="1000"
          onChange={(e) => {
            const newExercises = [...exercises];
            newExercises[index].reps = e.target.value;
            setExercises(newExercises);
          }}
        />
        <label> Weight: </label>
        <input
          className={styles.inputField3}
          type="number"
          value={exercise.weight}
          min="0"
          max="1000"
          onChange={(e) => {
            const newExercises = [...exercises];
            newExercises[index].weight = e.target.value;
            setExercises(newExercises);
          }}
          />
          <label>  </label>
          <button
            type="button"
            className={styles.button}
            onClick={() => removeExercise(index)}
            >
            Remove Exercise
          </button>
          <br/>
          </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addExercise}>Add Exercise</button>
          <br />
          <br />
          <button className={styles.submitButton} type="submit">Update Daily Diary</button>
          </form>
            {message && <p>{message}</p>}
            <h2>Charts</h2>
            <div className={styles.chartsContainer}>
              <div className={styles.chart}>
                <h3>Calorie Intake Chart</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={chartDataCalories}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </div>

              <div className={styles.chart}>
                <h3>Water Intake Chart</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={chartDataWater}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="water" stroke="#82ca9d" activeDot={{ r: 8 }} />
                </LineChart>
              </div>


              <div className={styles.chart}>
                <h3>Sleep Chart</h3>
                <LineChart
                  width={500}
                  height={300}
                  data={chartDataSleep}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sleep" stroke="#ffc658" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
              </div>
              <h2>Averages for the last 7 days</h2>
              <p>Average Water Intake: {averages.avgWater.toFixed(1)} ml</p>
              <p>Average Sleep Time: {averages.avgSleep.toFixed(1)} hours</p>
              <p>Average Calorie Intake: {averages.avgCalories.toFixed(1)} kcal</p>
              <div className={styles.recommendations2}>
              <h2>Personal Recommendations</h2>
              <h3>Daily Recommendations</h3>
              {(typeof calorieGoal === 'undefined' || typeof waterGoal === 'undefined' || typeof sleepGoal === 'undefined') ? (
                  <p className={styles.recommendation}>Please enter your goals</p>
                ) : (
                generateDailyRecommendations().map((recommendation, index) => (
                  <p key={index} className={styles.recommendation2}>
                    {recommendation}
                  </p>
                )))}
              <h3>Weekly Recommendations</h3>
              {(typeof calorieGoal === 'undefined' || typeof waterGoal === 'undefined' || typeof sleepGoal === 'undefined') ? (
                  <p className={styles.recommendation}>Please enter your goals</p>
                ) : (
                generateWeeklyRecommendations().map((recommendation, index) => (
                  <p key={index} className={styles.recommendation2}>
                    {recommendation}
                  </p>
                )))}
              </div>
                  </div>
                );
              };

export default DailyDiary;
