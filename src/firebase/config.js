// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACrLRVllKTJ0x9CKVzzCpRB1n4LZXUktg",
  authDomain: "react-auth-curso-af2fa.firebaseapp.com",
  projectId: "react-auth-curso-af2fa",
  storageBucket: "react-auth-curso-af2fa.appspot.com",
  messagingSenderId: "189104145442",
  appId: "1:189104145442:web:1b4e90520c58344c68b67b"
};

// Initialize Firebase
export const firebaseApp  = initializeApp(firebaseConfig);
//inicio el servicio de autenticacion de firebase
export const firebaseAuth = getAuth(firebaseApp);
//inicio del servicio de base de datos firestore
export const firebaseDB = getFirestore(firebaseApp)