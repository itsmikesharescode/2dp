import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDSp5GXG1sia9AzfvgyK243gvRIhrOvlDY",
  authDomain: "dp-auth-b6fde.firebaseapp.com",
  projectId: "dp-auth-b6fde",
  storageBucket: "dp-auth-b6fde.appspot.com",
  messagingSenderId: "305588990562",
  appId: "1:305588990562:web:6b2a560030f266fc99d73b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const ggAuth = new GoogleAuthProvider();
export const db = getFirestore(app);