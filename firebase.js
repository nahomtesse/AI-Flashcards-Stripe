import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAib_KGqL1ddV_uYpDt9LLvy67wj8Sth-s",
  authDomain: "flashcard-ai-3b778.firebaseapp.com",
  projectId: "flashcard-ai-3b778",
  storageBucket: "flashcard-ai-3b778.appspot.com",
  messagingSenderId: "614697690505",
  appId: "1:614697690505:web:946e18fb56dd69fd386d58",
  measurementId: "G-Q2DVCRB24M"
};

let db;

if (typeof window !== 'undefined') {
  // Initialize Firebase only on the client-side
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
}

export default db;
