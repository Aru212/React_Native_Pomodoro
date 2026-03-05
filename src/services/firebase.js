import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAB0W7q_4Njz_7mvJkd3NVrt1t2ys5XYe0",
  authDomain: "smart-study-556c9.firebaseapp.com",
  projectId: "smart-study-556c9",
  storageBucket: "smart-study-556c9.firebasestorage.app",
  messagingSenderId: "105815275388",
  appId: "1:105815275388:web:8e0882ea0cae4dfbdb56f9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);