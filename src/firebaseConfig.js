import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqDERteL9-wqPnIY5XdBxvhgBvnoLx-5o",
  authDomain: "doodle-eb48b.firebaseapp.com",
  projectId: "doodle-eb48b",
  storageBucket: "doodle-eb48b.appspot.com",
  messagingSenderId: "690797213984",
  appId: "1:690797213984:web:d58103716bf1e73da97f45",
  measurementId: "G-4ZY10F4KQC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
