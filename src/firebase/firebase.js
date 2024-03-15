
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// eslint-disable-next-line
import { ref, uploadBytes } from "firebase/storage";

import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCVBvpGX-FOsHGj7nBfT71ORdADlkRw-q4",
  authDomain: "imov-a3e90.firebaseapp.com",
  projectId: "imov-a3e90",
  storageBucket: "imov-a3e90.appspot.com",
  messagingSenderId: "166615794462",
  appId: "1:166615794462:web:2b94313e2fbfcdb73bff0f",
};


const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const storage = getStorage(app);

const firestore = getFirestore(app);


export { auth, storage, firestore };
