// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJCMe5Wht7BcuK40U9aqjq1yFLOUv2Etk",
  authDomain: "moviewebsite-10a3f.firebaseapp.com",
  projectId: "moviewebsite-10a3f",
  storageBucket: "moviewebsite-10a3f.firebasestorage.app",
  messagingSenderId: "1020013185757",
  appId: "1:1020013185757:web:c7b4bd0eaf4b976dc8a934"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
