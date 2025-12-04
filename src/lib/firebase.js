// import { initializeApp } from "firebase/app";
// import { 
//   getAuth, 
//   setPersistence, 
//   browserLocalPersistence 
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// 
// // Config from your text paste (Case-sensitive correction applied)
// const firebaseConfig = {
//   apiKey: "AIzaSyAjSvGKK8X-iRU7i4_Io8Yl7JqSGVIoXm8",
//   authDomain: "omeca-mvp-fe349.firebaseapp.com",
//   projectId: "omeca-mvp-fe349",
//   storageBucket: "omeca-mvp-fe349.firebasestorage.app",
//   messagingSenderId: "292043500038",
//   appId: "1:292043500038:web:833605696a2ac5893bb187",
//   measurementId: "G-S1RZM1FMGS"
// };
// 
// // Initialize Firebase once
// const app = initializeApp(firebaseConfig);
// 
// // --- AUTH WITH PERSISTENCE FIX ---
// export const auth = getAuth(app);
// 
// // 🔥 This line fixes your redirect loop
// setPersistence(auth, browserLocalPersistence);
// 
// // Firestore
// export const db = getFirestore(app);
// 
// // Consistent App ID for your Firestore paths
// export const APP_ID = "omeca-mvp-fe349";

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  setPersistence, 
  browserLocalPersistence 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAjSvGKK8X-iRU7i4_Io8Yl7JqSGVIoXm8",
  authDomain: "omeca-mvp-fe349.firebaseapp.com",
  projectId: "omeca-mvp-fe349",
  storageBucket: "omeca-mvp-fe349.firebasestorage.app",
  messagingSenderId: "292043500038",
  appId: "1:292043500038:web:833605696a2ac5893bb187",
  measurementId: "G-S1RZM1FMGS"
};

// ❗ Absolutely NEVER reuse app instances in Vite/CRA.
// React Fast Refresh breaks persistence otherwise.
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// 🔥 MUST run on a fresh app every load.
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const APP_ID = "omeca-mvp-fe349";
