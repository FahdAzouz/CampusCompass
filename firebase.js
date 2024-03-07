import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7ztXkRjYGFNSW1n0QdBK2wyI4jbOxL_U",
  authDomain: "campuscompass-25c8f.firebaseapp.com",
  projectId: "campuscompass-25c8f",
  storageBucket: "campuscompass-25c8f.appspot.com",
  messagingSenderId: "258471769282",
  appId: "1:258471769282:web:1d7f7decc135f36df5775b",
  measurementId: "G-PGQFTV4L7K"
};

// Initialize Firebase

export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = getAuth(FIREBASE_APP)
const analytics = getAnalytics(app);
export const FIREBASE_DB = getFirestore(FIREBASE_APP)