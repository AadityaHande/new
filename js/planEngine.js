// Plan generation logic based on survey data
function generatePlan(surveyData) {
  const { age, height, weight, goal, activity_level, diet_type, food_exclusions, health_issues } = surveyData;

  // Calculate BMI (Body Mass Index)
  const bmi = calculateBMI(height, weight);

  // Determine caloric needs based on goal and activity level
  const dailyCalories = calculateDailyCalories(bmi, goal, activity_level);

  // Generate workout plan based on goal and activity level
  const workoutPlan = generateWorkoutPlan(goal, activity_level);

  // Generate diet plan based on diet type and food exclusions
  const dietPlan = generateDietPlan(diet_type, food_exclusions);

  // Incorporate health conditions into the plan
  const healthConsiderations = getHealthConsiderations(health_issues);

  // Final fitness plan object
  const fitnessPlan = {
    bmi: bmi,
    dailyCalories: dailyCalories,
    workoutPlan: workoutPlan,
    dietPlan: dietPlan,
    healthConsiderations: healthConsiderations,
    motivation: surveyData.motivation // Use the user's motivation for personalized recommendations
  };

  // Return the generated plan
  return fitnessPlan;
}

// BMI Calculation
function calculateBMI(height, weight) {
  height = height / 100; // Convert height to meters
  return (weight / (height * height)).toFixed(1);
}

// Daily Calorie Needs Calculation based on BMI, goal, and activity level
function calculateDailyCalories(bmi, goal, activity_level) {
  let baseCalories = 2000; // Base calories for average individual

  // Adjust calories based on BMI (you can fine-tune these ranges)
  if (bmi < 18.5) {
    baseCalories += 500; // Underweight, need more calories
  } else if (bmi >= 25) {
    baseCalories -= 500; // Overweight, reduce calories
  }

  // Adjust calories based on fitness goal
  if (goal === 'Weight Loss') {
    baseCalories -= 500; // Reduce for weight loss
  } else if (goal === 'Muscle Gain') {
    baseCalories += 500; // Increase for muscle gain
  }

  // Adjust calories based on activity level
  if (activity_level === 'Sedentary') {
    baseCalories -= 200;
  } else if (activity_level === 'Light') {
    baseCalories += 200;
  } else if (activity_level === 'Moderate') {
    baseCalories += 400;
  } else if (activity_level === 'Intense') {
    baseCalories += 600;
  }

  return baseCalories;
}

// Workout Plan Generator based on goal and activity level
function generateWorkoutPlan(goal, activity_level) {
  let workoutPlan = [];

  if (goal === 'Weight Loss') {
    workoutPlan.push('Cardio: 30–45 minutes, 4–5 times a week');
    workoutPlan.push('Strength Training: 3 times a week');
  } else if (goal === 'Muscle Gain') {
    workoutPlan.push('Strength Training: 4–5 times a week');
    workoutPlan.push('Cardio: 15–20 minutes, 2–3 times a week');
  } else if (goal === 'Endurance') {
    workoutPlan.push('Cardio: 45–60 minutes, 4–5 times a week');
  } else if (goal === 'Flexibility') {
    workoutPlan.push('Yoga/Pilates: 3–4 times a week');
  }

  if (activity_level === 'Sedentary') {
    workoutPlan.push('Start with light walking and bodyweight exercises');
  }

  return workoutPlan;
}

// Diet Plan Generator based on diet type and food exclusions
function generateDietPlan(diet_type, food_exclusions) {
  let dietPlan = [];

  if (diet_type === 'Vegetarian') {
    dietPlan.push('Focus on plant-based proteins (tofu, beans, lentils)');
  } else if (diet_type === 'Vegan') {
    dietPlan.push('Ensure adequate intake of plant-based protein and B12');
  } else if (diet_type === 'Keto') {
    dietPlan.push('High fat, moderate protein, very low carbs');
  } else if (diet_type === 'Balanced') {
    dietPlan.push('Balanced intake of protein, carbs, and healthy fats');
  }

  if (food_exclusions) {
    dietPlan.push(`Avoid the following foods: ${food_exclusions}`);
  }

  return dietPlan;
}

// Health Conditions Considerations (optional, e.g., for specific conditions)
function getHealthConsiderations(health_issues) {
  let considerations = [];

  if (health_issues.toLowerCase().includes('diabetes')) {
    considerations.push('Monitor blood sugar levels and reduce simple sugars');
  }
  if (health_issues.toLowerCase().includes('hypertension')) {
    considerations.push('Limit salt intake and focus on heart-healthy foods');
  }
  if (health_issues.toLowerCase().includes('asthma')) {
    considerations.push('Include breathing exercises and avoid triggers');
  }

  return considerations;
}

// Example usage
const surveyData = {
  age: 25,
  height: 175,
  weight: 70,
  goal: 'Muscle Gain',
  activity_level: 'Moderate',
  diet_type: 'Balanced',
  food_exclusions: 'dairy',
  health_issues: 'asthma',
  motivation: 'To gain muscle and improve overall health'
};

const fitnessPlan = generatePlan(surveyData);
console.log(fitnessPlan);
