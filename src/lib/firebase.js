import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Config from your text paste (Case-sensitive correction applied)
const firebaseConfig = {
  apiKey: "AIzaSyAjSvGKK8X-iRU7i4_Io8Yl7JqSGVIoXm8",
  authDomain: "omeca-mvp-fe349.firebaseapp.com",
  projectId: "omeca-mvp-fe349",
  storageBucket: "omeca-mvp-fe349.firebasestorage.app",
  messagingSenderId: "292043500038",
  appId: "1:292043500038:web:833605696a2ac5893bb187",
  measurementId: "G-S1RZM1FMGS"
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Export services to be used across the app
export const auth = getAuth(app);
export const db = getFirestore(app);

// Consistent App ID for your Firestore paths
export const APP_ID = "omeca-mvp-fe349";