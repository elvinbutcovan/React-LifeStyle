// Import necessary modules and components
import React, { useState } from "react";
import styles from './App.module.css';

// MuscleGroupForm component
const MuscleGroupForm = () => {
  const [muscleGroups, setMuscleGroups] = useState([{ muscleType: "", reps: "", weight: "" }]);
  const [result, setResult] = useState("");

  // Functions to handle muscle group operations
  const isMuscleGroupDisabled = (muscleGroup, currentIndex) => {
    return muscleGroups.some(
      (group, index) => group.muscleType === muscleGroup && index !== currentIndex
    );
  };

  const removeMuscleGroup = (index) => {
    setMuscleGroups((prevMuscleGroups) => {
      return prevMuscleGroups.filter((_, i) => i !== index);
    });
  };

  const addMuscleGroup = () => {
    setMuscleGroups([...muscleGroups, { muscleType: "", reps: "", weight: "" }]);
  };

  const updateMuscleGroup = (index, field, value) => {
    const newMuscleGroups = [...muscleGroups];
    newMuscleGroups[index][field] = value;
    setMuscleGroups(newMuscleGroups);
  };

  // Validate the form inputs
  const validateForm = () => {
    // Check if every muscle group is valid
    const validMuscleGroups = muscleGroups.every((group) => {
      return (
        group.muscleType.trim() !== "" &&
        !isNaN(group.reps) &&
        group.reps > 0 &&
        !isNaN(group.weight) &&
        group.weight >= 0
      );
    });
  
    return validMuscleGroups;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate the form and display result message accordingly
    if (!validateForm()) {
      setResult("Please check your input values and try again.");
      return;
    }
  
    // If the form is valid, send a POST request with the data
    try {
      const response = await postData("http://localhost:8000", { muscleGroups });
      const parsedResponse = JSON.parse(response);
      setResult(parsedResponse);
    } catch (error) {
      setResult("Error: " + error);
    }
  };

  // Function to send POST request with the form data
  const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return await response.text();
  };

  return (
    <div className={styles.generator}>
      <form onSubmit={handleSubmit} >
        <div >
        <h1> Workout Generator </h1>
          {muscleGroups.map((group, index) => (
            <div key={index} className={styles.inputGroup}>
              <label htmlFor="muscle-type">Muscle Type: </label>
              <select
              
                value={group.muscleType}
                onChange={(e) => updateMuscleGroup(index, "muscleType", e.target.value)}
                required
              >
                <option value="">Select muscle group</option>
                <option value="Chest" disabled={isMuscleGroupDisabled("Chest", index)}>
                  Chest
                </option>
                <option value="Shoulders" disabled={isMuscleGroupDisabled("Shoulders", index)}>
                  Shoulders
                </option>
                <option value="Triceps" disabled={isMuscleGroupDisabled("Triceps", index)}>
                  Triceps
                </option>
                <option value="Biceps" disabled={isMuscleGroupDisabled("Biceps", index)}>
                  Biceps
                </option>
                <option value="Back" disabled={isMuscleGroupDisabled("Back", index)}>
                  Back
                </option>
                <option value="Legs" disabled={isMuscleGroupDisabled("Legs", index)}>
                  Legs
                </option>
              </select>
              <label htmlFor="reps"> Amount of Reps: </label>
              <input
                className={styles.inputField2}
                type="number"
                required
                min="1"
                max="60"
                step="1"
                value={group.reps}
                onChange={(e) => updateMuscleGroup(index, "reps", parseInt(e.target.value))}
              />
              <label htmlFor="weight"> Weight (kg): </label>
              <input
                className={styles.inputField2}
                type="number"
                required
                min="0"
                max="500"
                step="1"
                value={group.weight}
                onChange={(e) => updateMuscleGroup(index, "weight", parseInt(e.target.value))}
              />
              <button className={styles.button}
                type="button"
                onClick={() => removeMuscleGroup(index)}
                disabled={muscleGroups.length === 1}
              >
                Remove
              </button>
              <br/>
            </div>
          ))}
        </div>
        <button 
          type="button"
          onClick={addMuscleGroup} 
          className={styles.addButton}
          disabled={muscleGroups.length >= 6}
        >
            Add Muscle Group
        </button >
        <label> </label>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
      <div>
        {Array.isArray(result) ? (
        <table className={styles.outputTable}>
          <thead>
            <tr>
              <th>Muscle Type</th>
              <th>Exercise Description</th>
              <th>Amount of Reps</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody>
            {result.map((exercise, index) => (
            <tr key={index}>
              <td>{exercise.muscleType}</td>
              <td>{exercise.exerciseDescription}</td>
              <td>{exercise.reps}</td>
              <td>{exercise.weight}</td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>{typeof result === 'string' ? result : 'Error occurred, please check your input.'}</p>
        )}
      </div>

    </div>
  );
};

export default MuscleGroupForm;