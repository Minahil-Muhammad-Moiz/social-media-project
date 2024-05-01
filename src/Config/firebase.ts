// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdw8cSihiZqajZVxLDcyFLw5jWQ05Jbpw",
  authDomain: "social-media-project-rea-c3246.firebaseapp.com",
  projectId: "social-media-project-rea-c3246",
  storageBucket: "social-media-project-rea-c3246.appspot.com",
  messagingSenderId: "618147494779",
  appId: "1:618147494779:web:ea9a8e0c561242ed1cdbde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const database = getFirestore(app);