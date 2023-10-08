import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase  } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDoIEpwUbXYvTERotZ7ylh4AZF3aIk8CxA",
  authDomain: "smart-attendance-system-898a8.firebaseapp.com",
  projectId: "smart-attendance-system-898a8",
  storageBucket: "smart-attendance-system-898a8.appspot.com",
  messagingSenderId: "478041504329",
  appId: "1:478041504329:web:1dafaf4429fc76cbfbdd98",
  measurementId: "G-W23EXFRVRP"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);