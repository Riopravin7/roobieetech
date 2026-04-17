// Firebase Configuration Template
// Replace the config object below with your actual Firebase project details.
// You can find these in the Firebase Console: Project Settings > General > Your apps

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Add Firebase Scripts to your HTML files before this script:
// <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js"></script>

// Initialize Firebase
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    console.log("Firebase initialized successfully");
} else {
    console.error("Firebase SDK not detected. Please ensure you've included the scripts in your HTML.");
}
