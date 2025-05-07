// Getting the form and form steps
const surveyForm = document.getElementById('surveyForm');
const steps = document.querySelectorAll('.form-step');
const progress = document.getElementById('progress');
let currentStep = 0;

// Function to show current step and update progress
function showStep(stepIndex) {
  // Hide all steps
  steps.forEach((step, index) => {
    step.classList.remove('active');
    if (index === stepIndex) {
      step.classList.add('active');
    }
  });

  // Update progress bar width
  progress.style.width = ((stepIndex + 1) / steps.length) * 100 + '%';
}

// Function to handle "Next" button click
document.getElementById('nextBtn').addEventListener('click', () => {
  const currentFormStep = steps[currentStep];

  // Check if required fields are filled before moving to the next step
  if (validateStep(currentFormStep)) {
    currentStep++;
    if (currentStep >= steps.length) {
      currentStep = steps.length - 1; // Prevent going beyond the last step
    }
    showStep(currentStep);
  } else {
    alert('Please fill in all required fields.');
  }
});

// Function to handle "Previous" button click
document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

// Function to handle form submission
document.getElementById('submitBtn').addEventListener('click', () => {
  const formData = new FormData(surveyForm);

  const surveyResults = {};
  formData.forEach((value, key) => {
    surveyResults[key] = value;
  });

  // Store the collected data to Firebase Firestore
  storeSurveyResults(surveyResults);
});

// Validation function to check required fields on each step
function validateStep(step) {
  const inputs = step.querySelectorAll('input[required], select[required], textarea[required]');
  let valid = true;

  inputs.forEach(input => {
    if (!input.value) {
      valid = false;
    }
  });

  return valid;
}

// Firebase configuration (using your existing Firebase setup)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.3/firebase-firestore.js";

// Firebase config and initialization
const firebaseConfig = {
  apiKey: "AIzaSyB3-UILdIXK6I_G1odCkOhn2ZCpIyQgi_4",
  authDomain: "aurafit-f3c36.firebaseapp.com",
  projectId: "aurafit-f3c36",
  storageBucket: "aurafit-f3c36.firebasestorage.app",
  messagingSenderId: "1017552218994",
  appId: "1:1017552218994:web:cbb9869b55bf509396cbeb"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Store survey data to Firestore
async function storeSurveyResults(surveyData) {
  const user = firebase.auth().currentUser;
  if (user) {
    try {
      await setDoc(doc(db, "users", user.uid), surveyData);
      alert("Survey data saved successfully!");
      window.location.href = "dashboard.html"; // Redirect to dashboard after submission
    } catch (error) {
      console.error("Error saving survey data: ", error);
      alert("There was an error saving your data. Please try again.");
    }
  } else {
    alert("You need to be logged in to submit the survey.");
  }
}

// Initialize first step view
showStep(currentStep);
