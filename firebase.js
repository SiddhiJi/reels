

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsQUwoNsi01Bc7Bc4rf-0L1DD-dvAFOIQ",
  authDomain: "reels-fac77.firebaseapp.com",
  projectId: "reels-fac77",
  storageBucket: "reels-fac77.appspot.com",
  messagingSenderId: "426505214115",
  appId: "1:426505214115:web:3527a2fc59dcb0bd774716"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//this done by us
const auth = getAuth();  // to use it import getAuth() from 'firebase/auth'
const storage = getStorage();
const db = getFirestore();


export {auth,db,storage}
export default app;  