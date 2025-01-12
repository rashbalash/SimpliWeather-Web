// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDor-Q5vHXi3iEyE6K-j2-tRMpfseUYM0o",
  authDomain: "yourweathereveryday.firebaseapp.com",
  databaseURL: "https://yourweathereveryday.firebaseio.com",
  projectId: "yourweathereveryday",
  storageBucket: "yourweathereveryday.firebasestorage.app",
  messagingSenderId: "173119982342",
  appId: "1:173119982342:web:9ef4ebb63bda19e49f2c87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);