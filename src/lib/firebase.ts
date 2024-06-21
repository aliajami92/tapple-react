// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCU8wd2D94zfIPvXEGtGUOh5UoanYvMolg",
  authDomain: "tappy-c5f46.firebaseapp.com",
  projectId: "tappy-c5f46",
  storageBucket: "tappy-c5f46.appspot.com",
  messagingSenderId: "2528286550",
  appId: "1:2528286550:web:a59d1346a734f3799a68f7",
  databaseURL:
    "https://tappy-c5f46-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
