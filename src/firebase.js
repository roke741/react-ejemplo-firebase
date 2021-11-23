// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
//import firebase from "firebase/app";
//import 'firebase/firestore';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoLdN59ISdiDICFTFE4iGamNV4Sp6VA1E",
  authDomain: "fb-bdreact1-2f856.firebaseapp.com",
  projectId: "fb-bdreact1-2f856",
  storageBucket: "fb-bdreact1-2f856.appspot.com",
  messagingSenderId: "494955109051",
  appId: "1:494955109051:web:62988837fa53c8fb1ca79e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const  bd = getFirestore(app); 