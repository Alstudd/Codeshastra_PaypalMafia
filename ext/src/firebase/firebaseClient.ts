// src/firebase/firebaseClient.ts
 
import { getApps, initializeApp } from "firebase/app"
import { GoogleAuthProvider, getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
 
const clientCredentials = {
  apiKey: "AIzaSyCfp64qCGGcLfp985YnmKZLd3ZdgmFzkhc",
  authDomain: "learnblocks-22958.firebaseapp.com",
  projectId: "learnblocks-22958",
  storageBucket: "learnblocks-22958.appspot.com",
  messagingSenderId: "504382407651",
  appId: "1:504382407651:web:fc2e9e34f02b28a2ed16d6",
  measurementId: "G-V0RLX90995"
}
 
let firebase_app
 
// Check if firebase app is already initialized to avoid creating new app on hot-reloads
if (!getApps().length) {
  firebase_app = initializeApp(clientCredentials)
} else {
  firebase_app = getApps()[0]
}
 
export const storage = getStorage(firebase_app)
export const auth = getAuth(firebase_app)
export const db = getFirestore(firebase_app)
export const googleAuth = new GoogleAuthProvider()
 
export default firebase_app

// const createUnit = async (e) => {
//   e.preventDefault();
//   try {
//     const docRef = doc(db, "Course", myId, "Unit", unitId, "Chapter");
//     await setDoc(docRef, {
//       name: chpName,
//       summary: chpSumm,
//       videoId: chpVidId,
//       youtubeSearchQuery: ytQuery,
//     });
//     alert("Project Updated successfully");
//   } catch (e) {
//     alert("Project not Updated successfully");
//     console.log(e);
//   }
//   e.target.reset();
// };