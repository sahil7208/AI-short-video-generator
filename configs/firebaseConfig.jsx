// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-shorts-generator-e4376.firebaseapp.com",
  projectId: "ai-shorts-generator-e4376",
  storageBucket: "ai-shorts-generator-e4376.firebasestorage.app",
  messagingSenderId: "1078501865421",
  appId: "1:1078501865421:web:d36cef27c2ee69bf6ab684",
  measurementId: "G-GG8NXHHJD8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);