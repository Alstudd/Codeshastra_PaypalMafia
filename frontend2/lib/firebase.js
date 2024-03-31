import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfp64qCGGcLfp985YnmKZLd3ZdgmFzkhc",
  authDomain: "learnblocks-22958.firebaseapp.com",
  projectId: "learnblocks-22958",
  storageBucket: "learnblocks-22958.appspot.com",
  messagingSenderId: "504382407651",
  appId: "1:504382407651:web:fc2e9e34f02b28a2ed16d6",
  measurementId: "G-V0RLX90995"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);