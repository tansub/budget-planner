import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDizasc93LbOXltD7gnYw5oj3ltWi6eRgw",
  authDomain: "budget-planner-d186c.firebaseapp.com",
  projectId: "budget-planner-d186c",
  storageBucket: "budget-planner-d186c.firebasestorage.app",
  messagingSenderId: "485729032294",
  appId: "1:485729032294:web:9c08581bcb2b662808b5a7",
  measurementId: "G-DL4GW4WFC7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
