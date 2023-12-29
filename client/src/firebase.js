// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4fce3.firebaseapp.com",
  projectId: "mern-estate-4fce3",
  storageBucket: "mern-estate-4fce3.appspot.com",
  messagingSenderId: "500259599874",
  appId: "1:500259599874:web:a4e264e35898a5fd12d91b",
  measurementId: "G-PWJM6CB6FE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);