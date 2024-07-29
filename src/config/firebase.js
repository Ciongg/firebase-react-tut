// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByTsA9wPm-oVCEjbr8PCKndVic11hnxaA",
  authDomain: "fir-tut-3ee83.firebaseapp.com",
  projectId: "fir-tut-3ee83",
  storageBucket: "fir-tut-3ee83.appspot.com",
  messagingSenderId: "39181562436",
  appId: "1:39181562436:web:a296b94369cfdd2bc00211",
  measurementId: "G-HWH73Z2L9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app);

export const storage = getStorage(app);
// const analytics = getAnalytics(app);