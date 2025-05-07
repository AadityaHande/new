import { db, auth } from './firebase-config.js';

const logoutBtn = document.getElementById('logoutBtn');
const userName = document.getElementById('userName');
const caloriesBurned = document.getElementById('caloriesBurned');
const workoutsCompleted = document.getElementById('workoutsCompleted');
const caloriesIntake = document.getElementById('caloriesIntake');

// Get current user
auth.onAuthStateChanged(user => {
  if (user) {
    // Get user data from Firestore
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then(doc => {
      const userData = doc.data();
      userName.innerHTML = `Hello, ${userData.name}`;

      // Update stats from Firestore data
      caloriesBurned.innerHTML = userData.caloriesBurned || 0;
      workoutsCompleted.innerHTML = userData.workoutsCompleted || 0;
      caloriesIntake.innerHTML = userData.caloriesIntake || 0;

      // Generate charts dynamically based on user data
      generateWorkoutChart(userData.workoutData);
      generateCaloriesChart(userData.caloriesData);
    });
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
