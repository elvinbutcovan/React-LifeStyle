// Import necessary modules and components
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './App.module.css';

// ExerciseDescriptions component
function ExerciseDescriptions() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [bodyPart, setBodyPart] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');

  // Redirect to login page if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Navigate back to the main page
  const handleBack = () => {
    navigate('/main');
  };

  // Handle change in body part selection
  const handleBodyPartChange = (e) => {
    setBodyPart(e.target.value);
  };

  // Set the selected body part
  const handleConfirmBodyPart = () => {
    setSelectedBodyPart(bodyPart);
  };

  // Define exercise information
  const exerciseInfo = {
    chest: [
      {
        name: "Push-ups",
        description:
          "A classic exercise that targets the chest, shoulders, and triceps. Begin in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest almost touches the floor, then push back up to the starting position.",
      },
      {
        name: 'Weighted Dips',
        description: 'A compound exercise that targets the lower chest, triceps, and shoulders. Secure a weight belt around your waist and attach the desired weight. Grasp the dip bars, and push yourself up to the starting position with arms extended. Lower yourself down until your upper arms are parallel to the ground. Push back up to the starting position, fully extending your arms. Repeat for the desired number of reps.'
      },
      {
        name: 'Incline Bench Press',
        description: 'A compound exercise that targets the upper chest, shoulders, and triceps. Lie on an incline bench with your feet planted on the ground. Grasp the barbell with a shoulder-width grip, unrack the weight, and lower the barbell to your upper chest. Press the weight back up, extending your arms fully. Repeat for the desired number of reps.'
      },
      {
        name: 'Incline Press (Dumbbell)',
        description: 'A compound exercise that targets the upper chest, shoulders, and triceps. Lie on an incline bench with your feet planted on the ground. Grasp a pair of dumbbells with a neutral grip and hold them at shoulder level. Press the dumbbells up, extending your arms fully. Lower the dumbbells back down to the starting position with control. Repeat for the desired number of reps.'
      },
      {
        name: 'Bench Press (Barbell)',
        description: 'A compound exercise that targets the chest, triceps, and shoulders. Lie flat on a bench with your feet planted on the ground. Grasp the barbell with a shoulder-width grip, unrack the weight, and lower the barbell to your mid-chest. Press the weight back up, extending your arms fully. Repeat for the desired number of reps.'
      },
      {
        name: 'Hammer Decline Chest Press',
        description: 'A compound exercise that targets the lower chest, triceps, and shoulders. Sit on a decline bench of a Hammer Strength chest press machine. Grasp the handles with a neutral grip and extend your arms fully. Lower the weight with control, keeping your chest engaged. Press the weight back up to the starting position, extending your arms fully. Repeat for the desired number of reps.'
      },
      {
        name: 'Landmine Press',
        description: 'A compound exercise that targets the chest, shoulders, and triceps. Place one end of a barbell in a landmine attachment or in the corner of a room. Grasp the other end of the barbell with both hands, palms facing each other. Extend your arms fully, pressing the barbell away from your chest. Lower the barbell back to the starting position with control. Repeat for the desired number of reps.'
      },
      {
        name: 'Sling Shot Bench',
        description: 'A compound exercise that targets the chest, triceps, and shoulders. Using a Sling Shot device, lie flat on a bench with your feet planted on the ground. Grasp the barbell with a shoulder-width grip, unrack the weight, and lower the barbell to your mid-chest. The Sling Shot will assist you in pressing the weight back up, extending your arms fully. Repeat for the desired number of reps.'
      },
      {
        name: 'Close Grip Bench',
        description: 'A compound exercise that targets the chest, triceps, and shoulders, with an emphasis on the triceps. Lie flat on a bench with your feet planted on the ground. Grasp the barbell with a close grip, slightly narrower than shoulder-width. Unrack the weight and lower the barbell to your mid-chest. Press the weight back up, extending your arms fully. Repeat for the desired number of reps.'
      },
      {
        name: 'Cable Fly',
        description: 'An isolation exercise that targets the chest muscles. Stand between the cable machine with both cables set to shoulder height. Grasp the handles with palms facing forward and arms extended out to the sides. Slightly bend your elbows and bring the handles together in front of your chest, squeezing your chest muscles. Slowly return to the starting position. Repeat for the desired number of reps.'
      },
      {
        name: 'Low Incline Dumbbell Bench',
        description: 'A compound exercise that targets the chest, shoulders, and triceps. Lie on a low incline bench with your feet planted on the ground. Grasp a pair of dumbbells with a neutral grip and hold them at shoulder level. Press the dumbbells up, extending your arms fully. Lower the dumbbells back down to the starting position with control. Repeat for the desired number of reps.'
      }      
    ],
    biceps: [
        {
          name: 'Hammer Curl',
          description: 'A variation of the bicep curl that targets the brachioradialis and the brachialis muscles, in addition to the biceps. Hold a dumbbell in each hand with a neutral grip, palms facing your thighs. Curl the weights up towards your shoulders while keeping your elbows stationary. Slowly lower the weights back down to the starting position.'
        },
        {
          name: 'Bicep Curl (Barbell)',
          description: 'A classic bicep exercise using a barbell. Stand with your feet shoulder-width apart, gripping the barbell with an underhand grip. With your elbows close to your body, curl the barbell up towards your chest. Slowly lower the barbell back down to the starting position.'
        },
        {
          name: 'Bicep Curl (Dumbbell)',
          description: 'A classic bicep exercise using dumbbells. Stand with your feet shoulder-width apart, holding a dumbbell in each hand with an underhand grip. With your elbows close to your body, curl the dumbbells up towards your shoulders. Slowly lower the dumbbells back down to the starting position.'
        },
        {
          name: 'Curl Ez Bar',
          description: 'A bicep curl variation using an EZ bar, which is designed to reduce strain on the wrists. Stand with your feet shoulder-width apart, gripping the EZ bar with an underhand grip. With your elbows close to your body, curl the bar up towards your chest. Slowly lower the bar back down to the starting position.'
        },
      ],
      triceps: [
        {
          name: 'Tricep Pushdown',
          description: 'A cable machine exercise that targets the triceps. Stand in front of a cable machine with a high pulley and a straight or V-shaped bar attached. Grasp the bar with an overhand grip and position your elbows close to your body. Push the bar down towards the floor, fully extending your arms. Slowly return the bar to the starting position, maintaining control throughout the movement.'
        },
        {
          name: 'Tricep Extension',
          description: 'An isolation exercise targeting the triceps. This can be performed using dumbbells, a barbell, or a cable machine. Extend your arms overhead, holding the weight with both hands. Lower the weight behind your head by bending your elbows, keeping them close to your ears. Raise the weight back up by straightening your arms, squeezing your triceps at the top of the movement.'
        },
        {
          name: 'Skullcrusher (Barbell)',
          description: 'A triceps isolation exercise also known as a lying triceps extension. Lie on a flat bench with a barbell or EZ bar. Hold the bar with an overhand grip and extend your arms straight above your chest. Bend your elbows and lower the bar towards your forehead, keeping your upper arms stationary. Extend your arms back to the starting position, engaging your triceps throughout the movement.'
        },
      ],
      legs: [
        {
          name: 'Squat (Barbell)',
          description: 'A compound lower body exercise targeting the quadriceps, hamstrings, and glutes. Position a barbell on your upper back and shoulders, grasping it with an overhand grip. Stand with your feet shoulder-width apart. Bend your knees and hips to lower your body into a squat, keeping your chest up and back straight. Push through your heels to return to the starting position.'
        },
        {
          name: 'Deadlift (Barbell)',
          description: 'A compound exercise targeting the hamstrings, glutes, lower back, and upper back. Stand with your feet shoulder-width apart and the barbell over your mid-foot. Bend at your hips and knees, grasp the bar with an overhand or mixed grip. Lift the bar by straightening your hips and knees, keeping your back straight and chest up. Lower the bar to the ground, maintaining control throughout the movement.'
        },
        {
          name: 'Romanian Deadlift (Barbell)',
          description: 'A hinge movement targeting the hamstrings and glutes. Stand with your feet hip-width apart, holding a barbell in front of your thighs with an overhand grip. Keep a slight bend in your knees and hinge at your hips, lowering the barbell along your legs. Keep your back straight and shoulders engaged. Once you feel a stretch in your hamstrings, extend your hips to return to the starting position.'
        },
        {
          name: 'Leg Outward Fly',
          description: 'An isolation exercise targeting the outer thigh and hip abductor muscles. Stand next to a cable machine with an ankle strap attached to the low pulley. Attach the strap to your working leg and step away from the machine. Move your working leg away from your body in a controlled manner, maintaining balance. Slowly return to the starting position.'
        },
        {
          name: 'Glute Extension',
          description: 'An isolation exercise targeting the glutes. Stand facing a cable machine with a low pulley and ankle strap attachment. Attach the strap to your working ankle. Move your working leg straight behind you, keeping your leg straight and engaging your glutes. Slowly return to the starting position, maintaining control throughout the movement.'
        },
        {
          name: 'Good Morning (Barbell)',
          description: 'A hinge exercise targeting the lower back, hamstrings, and glutes. Position a barbell on your upper back and shoulders, grasping it with an overhand grip. Stand with your feet shoulder-width apart and a slight bend in your knees. Hinge at your hips and lower your upper body, keeping your back straight. Extend your hips and return to the starting position.'
        },
        {
          name: 'Leg Press (Hinge)',
          description: 'A compound lower body exercise targeting the quadriceps, hamstrings, and glutes. Sit in a leg press machine with your feet on the platform shoulder-width apart. Bend your knees and lower the platform, keeping your lower back pressed against the seat. Push through your heels to extend your legs and return to the starting position.'
        },
        {
            name: 'Hack Squat',
            description: 'A compound lower body exercise targeting the quadriceps, hamstrings, and glutes. Position yourself on a hack squat machine, placing your shoulders and back against the pads. Stand with your feet shoulder-width apart. Bend your knees and lower your body, keeping your chest up and back straight. Push through your heels to return to the starting position.'
          },
          {
            name: 'Rack Pull - 1 Pin',
            description: 'A variation of the deadlift targeting the hamstrings, glutes, and lower back. Set a barbell on a squat rack at knee height (1 pin). Stand with your feet shoulder-width apart and the barbell over your mid-foot. Bend at your hips and knees, grasp the bar with an overhand or mixed grip. Lift the bar by straightening your hips and knees, keeping your back straight and chest up. Lower the bar to the rack, maintaining control throughout the movement.'
          },
          {
            name: 'Rack Pull 2 Pin',
            description: 'A variation of the deadlift targeting the hamstrings, glutes, and lower back. Set a barbell on a squat rack at mid-shin height (2 pins). Stand with your feet shoulder-width apart and the barbell over your mid-foot. Bend at your hips and knees, grasp the bar with an overhand or mixed grip. Lift the bar by straightening your hips and knees, keeping your back straight and chest up. Lower the bar to the rack, maintaining control throughout the movement.'
          },
          {
            name: 'Leg Curl',
            description: 'An isolation exercise targeting the hamstrings. Position yourself on a leg curl machine with your legs under the padded lever. Grasp the handles for stability. Curl your legs towards your glutes, squeezing your hamstrings at the top of the movement. Slowly return to the starting position, maintaining control throughout.'
          },
          {
            name: 'Kettlebell Swings',
            description: 'A full-body exercise targeting the hamstrings, glutes, lower back, and shoulders. Stand with your feet shoulder-width apart, holding a kettlebell with both hands in front of your body. Bend your knees slightly and hinge at your hips, swinging the kettlebell between your legs. Drive your hips forward, swinging the kettlebell to chest height. Maintain control as the kettlebell swings back down, and repeat the movement.'
          },
          {
            name: 'Front Squat (Barbell)',
            description: 'A compound lower body exercise targeting the quadriceps, hamstrings, and glutes. Position a barbell on the front of your shoulders, with your elbows pointing forward and hands crossed or in a clean grip. Stand with your feet shoulder-width apart. Bend your knees and hips to lower your body into a squat, keeping your chest up and back straight. Push through your heels to return to the starting position.'
          },
          {
            name: 'Sumo Deadlift',
            description: 'A variation of the deadlift targeting the hamstrings, glutes, and inner thighs. Stand with your feet wider than shoulder-width apart and your toes pointing outwards. Bend at your hips and knees, grasp the barbell with an overhand grip. Lift the bar by straightening your hips and knees, keeping your back straight and chest up. Lower the bar to the ground, maintaining control throughout the movement.'
          },
          {
            name: 'High Bar Squat',
            description: 'A compound lower body exercise targeting the quadriceps, hamstrings, and glutes. Position a barbell on your upper traps, grasping it with an overhand grip. Stand with your feet shoulder-width apart. Bend your knees and hips to lower your body into a squat, keeping your chest up and back straight. Push through your heels to return to the starting position.'
          },
          {
            name: 'Deadlift - Trap Bar',
            description: 'A compound exercise targeting the hamstrings, glutes, lower back, and upper back. Stand inside a trap bar with your feet shoulder-width apart. Bend at your hips and knees, grasp the handles with an overhand grip. Lift the bar by straightening your hips and knees, keeping your back straight and chest up. Lower the bar to the ground, maintaining control throughout the movement.'
          },
          {
            name: 'Leg Press',
            description: 'A compound exercise targeting the quadriceps, hamstrings, and glutes. Sit on a leg press machine, placing your feet shoulder-width apart on the platform. Release the safety, and lower the platform towards your chest by bending your knees. Press through your heels to extend your legs, pushing the platform away from you. Return to the starting position with control, keeping the tension in your legs throughout the movement.'
          },
          {
            name: 'Stairmaster',
            description: 'A cardio exercise that targets the glutes, hamstrings, quadriceps, and calves. Step onto the Stairmaster machine, grasping the handrails for balance. Set your desired resistance and speed. Move your feet in a climbing motion, mimicking the action of climbing stairs. Maintain a steady pace, focusing on engaging your leg muscles throughout the workout.'
          }
      ],
      shoulders: [
        {
          name: 'Seated Shoulder Press (Barbell)',
          description: 'A compound exercise that targets the shoulders, triceps, and upper back. Sit on a bench with a back support, feet planted on the ground. Grasp the barbell with a slightly wider than shoulder-width grip. Unrack the weight and position it at shoulder level. Press the barbell upward, extending your arms fully. Lower the barbell back down to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Lateral Raise (Dumbbell)',
          description: 'An isolation exercise that targets the lateral deltoids. Stand with your feet shoulder-width apart, holding a dumbbell in each hand with your arms at your sides. Keeping your elbows slightly bent, raise your arms out to the sides until they are parallel with the floor. Lower the dumbbells back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Lateral Raise',
          description: 'The lateral raise machine targets the lateral deltoids, which are the side muscles of your shoulders. To perform this exercise using the machine, adjust the seat height and weight on the machine to your desired level. Sit on the machine with your back flat against the backrest and your arms resting on the pads. Slowly lift your arms out to the side, keeping a slight bend in your elbows, until they reach shoulder height. Hold for a moment, then slowly lower your arms back to the starting position. Perform the desired number of repetitions. This exercise helps to improve shoulder stability and contributes to overall shoulder strength.'
        },
        {
          name: 'Seated Shoulder Press (Dumbbell)',
          description: 'A compound exercise that targets the shoulders, triceps, and upper back. Sit on a bench with a back support, feet planted on the ground. Hold a dumbbell in each hand at shoulder level. Press the dumbbells upward, extending your arms fully. Lower the dumbbells back down to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Shoulder Press (Standing)',
          description: 'A compound exercise that targets the shoulders, triceps, and upper back. Stand with your feet shoulder-width apart, grasping a barbell with a slightly wider than shoulder-width grip. Position the barbell at shoulder level. Press the barbell upward, extending your arms fully. Lower the barbell back down to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Rotator Cuff Work',
          description: 'A group of exercises that target the small muscles around the shoulder joint, responsible for stability and injury prevention. Common exercises include internal and external rotations, standing cable rotations, and shoulder external rotation with a resistance band. Perform these exercises with light weights or resistance bands, focusing on slow, controlled movements.'
        },
        {
          name: 'Hammer Shoulder Press',
          description: 'A compound exercise that targets the shoulders and triceps, typically performed on a Hammer Strength machine. Sit on the machine seat with your back against the support, and position the handles at shoulder level. Press the handles upward, extending your arms fully. Lower the handles back down to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Overhead Press (Dumbbell)',
          description: 'A compound exercise that targets the shoulders, triceps, and upper back. Stand with your feet shoulder-width apart, holding a dumbbell in each hand at shoulder level. Press the dumbbells upward, extending your arms fully. Lower the dumbbells back down to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Overhead Press (Barbell)',
          description: 'A compound exercise that targets the shoulders, triceps, and upper back. Stand with your feet shoulder-width apart, grasping a barbell with a slightly wider than shoulder-width grip. Position the barbell at shoulder level. Press the barbell upward, extending your arms fully. Lower the barbell back down to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Rope Never Ending',
          description: 'An intense shoulder exercise typically performed with a heavy rope or battling rope. Anchor the rope to a fixed point and stand facing the anchor point with your feet shoulder-width apart. Grasp each end of the rope in your hands. Raise your arms up and down in a rhythmic motion, creating waves in the rope. Continue for the desired amount of time or reps.'
        }
      ],
      back: [
        {
          name: 'Chin Up',
          description: 'A compound exercise that targets the lats, biceps, and upper back. Grasp a pull-up bar with an underhand grip, hands shoulder-width apart. Hang from the bar with your arms fully extended. Pull your body up until your chin is above the bar, keeping your elbows close to your body. Lower your body back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Lat Pulldown',
          description: 'A compound exercise that targets the lats, biceps, and upper back. Sit at a lat pulldown machine with your knees secured under the pads. Grasp the bar with a wide overhand grip. Pull the bar down to your upper chest, squeezing your shoulder blades together. Slowly return the bar to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Seated Cable Row (Close Grip)',
          description: 'A compound exercise that targets the middle back, biceps, and forearms. Sit at a cable row machine with your feet on the platform and knees slightly bent. Grasp the close-grip attachment with both hands. Pull the attachment towards your abdomen, squeezing your shoulder blades together. Slowly return to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Rear Delt Fly',
          description: 'An isolation exercise that targets the rear deltoids and upper back. Stand or sit with a dumbbell in each hand, hinged forward at the hips with your arms hanging straight down. With a slight bend in your elbows, raise your arms out to the sides, squeezing your shoulder blades together. Lower the dumbbells back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Seated Row',
          description: 'A compound exercise that targets the middle back, biceps, and forearms. Sit at a cable row machine with your feet on the platform and knees slightly bent. Grasp the straight bar attachment with both hands. Pull the attachment towards your abdomen, squeezing your shoulder blades together. Slowly return to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'T-Bar Row',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position a loaded T-bar row machine with your feet shoulder-width apart and your knees slightly bent. Grasp the handle with both hands, maintaining a flat back. Pull the weight up towards your chest, squeezing your shoulder blades together. Lower the weight back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Bent Over Row (Dumbbell)',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Stand with your feet shoulder-width apart, holding a dumbbell in each hand. Hinge forward at the hips, keeping your back straight and your knees slightly bent. Pull the dumbbells up towards your chest, squeezing your shoulder blades together. Lower the dumbbells back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer Back Row Wide 45 Angle',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength row machine with a wide grip at a 45-degree angle. Keep your chest against the pad, grasp the handles, and pull them towards your body, squeezing your shoulder blades together. Slowly return the handles to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer Lat Pulldown',
          description: 'A compound exercise that targets the lats, biceps, and upper back. Sit at a Hammer Strength lat pulldown machine with your knees secured under the pads. Grasp the handles with a neutral grip, arms extended. Pull the handles down to your upper chest, squeezing your shoulder blades together. Slowly return the handles to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Shrugs (Dumbbell)',
          description: 'An isolation exercise that targets the upper trapezius muscles. Stand with your feet shoulder-width apart, holding a dumbbell in each hand at your sides. Keep your arms straight, and elevate your shoulders as high as possible, as if trying to touch your ears. Hold the top position for a moment before slowly lowering your shoulders back down. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer Seated Row',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength seated row machine with a neutral grip. Grasp the handles and pull them towards your body, squeezing your shoulder blades together. Slowly return the handles to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer Seated Row (Close Grip)',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength seated row machine with a close grip attachment. Grasp the handles and pull them towards your body, squeezing your shoulder blades together. Slowly return the handles to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Pull Up',
          description: 'A compound exercise that targets the lats, biceps, and upper back. Grasp a pull-up bar with an overhand grip, hands wider than shoulder-width apart. Hang from the bar with your arms fully extended. Pull your body up until your chin is above the bar. Lower your body back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Neutral Chin',
          description: 'A compound exercise that targets the lats, biceps, and upper back. Grasp a pull-up bar with a neutral grip, hands shoulder-width apart. Hang from the bar with your arms fully extended. Pull your body up until your chin is above the bar. Lower your body back to the starting position with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Deadlift (Barbell)',
          description: 'A compound exercise that targets the lower back, hamstrings, and glutes. Stand with your feet shoulder-width apart, with a loaded barbell on the ground in front of you. Bend at the hips and knees, grasping the barbell with an overhand or mixed grip. Keep your back straight, and lift the barbell by extending your hips and knees. Lower the barbell back to the ground with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Face Pull',
          description: 'An isolation exercise that targets the rear deltoids and upper back. Stand facing a cable machine with a rope attachment at face level. Grasp the rope with both hands, palms facing each other. Pull the rope towards your face, spreading your hands apart and squeezing your shoulder blades together. Slowly return the rope to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer Row Stand 1Armed',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength row machine with a single arm attachment. Stand with one foot forward for balance and grasp the handle with one hand. Pull the handle towards your body, squeezing your shoulder blades together. Slowly return the handle to the starting position. Repeat for the desired number of reps, then switch to the other arm.'
        },
        {
          name: 'Hammer Row - Wide Grip',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength row machine with a wide grip attachment. Grasp the handles and pull them towards your body, squeezing your shoulder blades together. Slowly return the handles to the starting position. Repeat for the desired number of reps.'
        },
        {
          name: 'Shrugs',
          description: 'An isolation exercise that targets the upper trapezius muscles. Stand with your feet shoulder-width apart, holding a barbell or dumbbells at your sides. Keep your arms straight, and elevate your shoulders as high as possible, as if trying to touch your ears. Hold the top position for a moment before slowly lowering your shoulders back down. Repeat for the desired number of reps.'
        },
        {
          name: 'Hammer High Row - 1 Arm',
          description: 'A compound exercise that targets the middle and upper back, as well as the biceps. Position yourself on a Hammer Strength high row machine with a single arm attachment. Grasp the handle with one hand, keeping your chest against the pad. Pull the handle towards your body, squeezing your shoulder blades together. Slowly return the handle to the starting position. Repeat for the desired number of reps, then switch to the other arm.'
        },
        {
          name: 'Rack Pull 2 Pin',
          description: 'A compound exercise that targets the lower back, hamstrings, and glutes. Set up a barbell in a power rack at knee height (2 pins). Stand with your feet shoulder-width apart, bending at the hips and knees to grasp the barbell with an overhand or mixed grip. Keep your back straight and lift the barbell by extending your hips and knees. Lower the barbell back to the pins with control. Repeat for the desired number of reps.'
        },
        {
          name: 'Rack Pull - 1 Pin',
          description: 'A compound exercise that targets the lower back, hamstrings, and glutes. Set up a barbell in a power rack at mid-shin height (1 pin). Stand with your feet shoulder-width apart, bending at the hips and knees to grasp the barbell with an overhand or mixed grip. Keep your back straight and lift the barbell by extending your hips and knees. Lower the barbell back to the pins with control. Repeat for the desired number of reps.'
        }
      ]       
  };
  

return (
    <div className="App">
        <header className="App-header">
        <h1>LifeStyle</h1>
      </header>
      <div className={styles.exerciseDescription}>
      <h2>Exercise Descriptions</h2>
      <label htmlFor="bodypart">Select body part: </label>
      <select id="bodypart" onChange={handleBodyPartChange} value={bodyPart}>
        <option value="">Choose a body part</option>
        <option value="chest">Chest</option>
        <option value="shoulders">Shoulders</option>
        <option value="triceps">Triceps</option>
        <option value="biceps">Biceps</option>
        <option value="back">Back</option>
        <option value="legs">Legs</option>
      </select>
      <button onClick={handleConfirmBodyPart} className={styles.button3}>Confirm</button>
      {selectedBodyPart && (
  <div>
    <h3>Exercises for: {selectedBodyPart}</h3>
    {exerciseInfo[selectedBodyPart].map((exercise) => (
      <div key={exercise.name}>
        <h4>{exercise.name}</h4>
        <p>{exercise.description}</p>
      </div>
    ))}
  </div>
)}
        </div>
      <button onClick={handleBack} className={styles.button3} >Back</button>
    </div>
  );
}

export default ExerciseDescriptions;
