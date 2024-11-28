// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9Hx_MrXx4ZYIzfc3KVKZ6C5pxWRyCy2Y",
  authDomain: "astro-authentication-39244.firebaseapp.com",
  projectId: "astro-authentication-39244",
  storageBucket: "astro-authentication-39244.firebasestorage.app",
  messagingSenderId: "1089843740199",
  appId: "1:1089843740199:web:3adf1d7a79fa199d6bd802"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.languageCode = 'ca'; //Idioma de l'aplicació

export const firebase = {
    app,
    auth
}