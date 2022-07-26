// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage'
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtDqBkzImF3qZEnf_3u9acsvK3CS2mX4E",
  authDomain: "reels-6865e.firebaseapp.com",
  projectId: "reels-6865e",
  storageBucket: "reels-6865e.appspot.com",
  messagingSenderId: "322184491624",
  appId: "1:322184491624:web:0a63a67798564f691581dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();
const db = getFirestore();


export {auth,db,storage}
export default app;