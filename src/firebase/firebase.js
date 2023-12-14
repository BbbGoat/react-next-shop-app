import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCItjk9reyv6K5z6XkI1qo9Eb-Y6QhO5zg",
  authDomain: "react-next-pj-app.firebaseapp.com",
  projectId: "react-next-pj-app",
  storageBucket: "react-next-pj-app.appspot.com",
  messagingSenderId: "786212703184",
  appId: "1:786212703184:web:21244ddeccbf4e9aec87d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;