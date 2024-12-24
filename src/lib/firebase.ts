import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAhdVcTP9BohHjoQZFq6PnvBb-ek7Fx_e8",
  authDomain: "anfaal-9bfa6.firebaseapp.com",
  projectId: "anfaal-9bfa6",
  storageBucket: "anfaal-9bfa6.firebasestorage.app",
  messagingSenderId: "1059801489477",
  appId: "1:1059801489477:web:35fd5cb82c8c1554b3832c"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);