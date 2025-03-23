// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbBX_H8x8non1u-RAffKJguXx2tg-5p2M",
  authDomain: "moull9anoun.firebaseapp.com",
  projectId: "moull9anoun",
  storageBucket: "moull9anoun.firebasestorage.app",
  messagingSenderId: "864404293448",
  appId: "1:864404293448:web:5caaff734e6723cfce557d",
  measurementId: "G-FQD9KXDDX8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Export Auth instance
export const auth = getAuth(app);