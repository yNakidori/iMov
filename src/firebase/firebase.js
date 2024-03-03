// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVBvpGX-FOsHGj7nBfT71ORdADlkRw-q4",
  authDomain: "imov-a3e90.firebaseapp.com",
  projectId: "imov-a3e90",
  storageBucket: "imov-a3e90.appspot.com",
  messagingSenderId: "166615794462",
  appId: "1:166615794462:web:2b94313e2fbfcdb73bff0f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
