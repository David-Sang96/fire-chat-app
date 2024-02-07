import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3ZzhrKEjMTG3kIlaAlK0ADb_abed315w",
  authDomain: "chat-app-639d2.firebaseapp.com",
  projectId: "chat-app-639d2",
  storageBucket: "chat-app-639d2.appspot.com",
  messagingSenderId: "166152333652",
  appId: "1:166152333652:web:a7055db6893a19d0b540c1",
  measurementId: "G-CEB0KH9E58",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
