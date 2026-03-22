// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "lms-6dfc5.firebaseapp.com",
  projectId: "lms-6dfc5",
  storageBucket: "lms-6dfc5.firebasestorage.app",
  messagingSenderId: "718935860897",
  appId: "1:718935860897:web:99f1b71e04c8385b71f2e0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth=getAuth(app)
const provider=new GoogleAuthProvider()

export {auth,provider} 