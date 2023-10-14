import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase  } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDOs77khSZxUiBM-QQJZZ56ezvGY5ioib0",
  authDomain: "faceattendance-ca61b.firebaseapp.com",
  databaseURL: "https://faceattendance-ca61b-default-rtdb.firebaseio.com/",
  projectId: "faceattendance-ca61b",
  storageBucket: "faceattendance-ca61b.appspot.com",
  messagingSenderId: "1023165376594",
  appId: "1:1023165376594:web:2c296c6521d57c92f2978b",
  measurementId: "G-JMCXF84DDL"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);