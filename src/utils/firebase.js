// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUIE3hUR3baXe_e0G5Fof2gG81xokXXro",
  authDomain: "netflixgpt-445fa.firebaseapp.com",
  projectId: "netflixgpt-445fa",
  storageBucket: "netflixgpt-445fa.appspot.com",
  messagingSenderId: "392490377694",
  appId: "1:392490377694:web:ac6bc538fd21529f7ffd4f",
  measurementId: "G-G5GPFB23BV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();