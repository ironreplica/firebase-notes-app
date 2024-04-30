// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1OxO4r16QNw5MV02sMe2s5wdKBV9Y1JM",
  authDomain: "fir-notes-app-84a99.firebaseapp.com",
  projectId: "fir-notes-app-84a99",
  storageBucket: "fir-notes-app-84a99.appspot.com",
  messagingSenderId: "92877657504",
  appId: "1:92877657504:web:0770b310b277b97c9e80c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
