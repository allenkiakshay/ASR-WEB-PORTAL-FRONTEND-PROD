import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
/* 
? Personal Firebase Account is used here for development. */

const firebaseConfig = {
    apiKey: "AIzaSyDWAsfcO-wKUhsq55v2ZQ_ymFqYK70jqyk",
    authDomain: "asr-editor-b1396.firebaseapp.com",
    projectId: "asr-editor-b1396",
    storageBucket: "asr-editor-b1396.appspot.com",
    messagingSenderId: "360948012816",
    appId: "1:360948012816:web:dd5980ff6fef3049bdb795",
    measurementId: "G-3X9TMWT4RJ"
  };

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
