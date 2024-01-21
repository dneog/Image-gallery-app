
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "auth-51bda.firebaseapp.com",
  databaseURL: "https://auth-51bda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "auth-51bda",
  storageBucket: "auth-51bda.appspot.com",
  messagingSenderId: "274447857370",
  appId: "1:274447857370:web:f61e0bf3f6f92ee2ec97e3"
};

const app = initializeApp(firebaseConfig);
export const auth= getAuth(app);
export const db= getFirestore(app);
export const storage= getStorage(app);
export default app;