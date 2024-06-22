// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWg4Uz0n_YHnqCtATJ3-C5Z7fwLXwD2Bs",
  authDomain: "recations.firebaseapp.com",
  projectId: "recations",
  storageBucket: "recations.appspot.com",
  messagingSenderId: "408679501384",
  appId: "1:408679501384:web:eef84b9a2e1b6b64e2927d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);