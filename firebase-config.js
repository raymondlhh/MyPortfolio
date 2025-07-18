// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxFRL0paKsShWeaePXb-OuEABDDJcFILM",
  authDomain: "my-portfolio-70502.firebaseapp.com",
  projectId: "my-portfolio-70502",
  storageBucket: "my-portfolio-70502.firebasestorage.app",
  messagingSenderId: "1055472469196",
  appId: "1:1055472469196:web:ccfd0ba84917acb9fe2e69",
  measurementId: "G-VGQ1LFPSKY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export for use in other files
window.db = db; 