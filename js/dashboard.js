// js/dashboard.js
import { auth, db } from './firebase-config.js';
import { doc, getDoc } from 'firebase/firestore';

const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const caloriesBurned = document.getElementById('caloriesBurned');
const workoutsCompleted = document.getElementById('workoutsCompleted');
const caloriesIntake = document.getElementById('caloriesIntake');

// Get current user
auth.onAuthStateChanged(async user => {
  if (user) {
    try {
      // Reference to the user document using modular SDK
      const userRef = doc(db, 'users', user.uid);  // ✅ Correct usage of modular SDK
      const userSnap = await getDoc(userRef);     // ✅ Correct usage of modular SDK

      if (userSnap.exists()) {
        const userData = userSnap.data();
        userName.innerHTML = `Hello, ${userData.name}`;

        // Update stats from Firestore data
        caloriesBurned.innerHTML = userData.caloriesBurned || 0;
        workoutsCompleted.innerHTML = userData.workoutsCompleted || 0;
        caloriesIntake.innerHTML = userData.caloriesIntake || 0;

        // Generate charts dynamically based on user data
        generateWorkoutChart(userData.workoutData);
        generateCaloriesChart(userData.caloriesData);
      } else {
        console.error('No user data found in Firestore.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
  auth.signOut().then(() => {
    window.location.href = 'login.html';
  });
});

// Generate Workout Chart
function generateWorkoutChart(data) {
  const ctx = document.getElementById('workoutChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.days,
      datasets: [{
        label: 'Workouts Completed',
        data: data.workouts,
        borderColor: '#ff5722',
        fill: false,
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

// Generate Calories Chart
function generateCaloriesChart(data) {
  const ctx = document.getElementById('caloriesChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.days,
      datasets: [{
        label: 'Calories Intake vs Goal',
        data: data.calories,
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        }
      }
    }
  });
}

