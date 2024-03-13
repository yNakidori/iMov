// Importe as funções que você precisa dos SDKs que precisa
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// eslint-disable-next-line
import { ref, uploadBytes } from "firebase/storage";

import { getFirestore } from "firebase/firestore";

// Seu arquivo de configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCVBvpGX-FOsHGj7nBfT71ORdADlkRw-q4",
  authDomain: "imov-a3e90.firebaseapp.com",
  projectId: "imov-a3e90",
  storageBucket: "imov-a3e90.appspot.com",
  messagingSenderId: "166615794462",
  appId: "1:166615794462:web:2b94313e2fbfcdb73bff0f",
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

// Inicialize o Firebase Authentication e obtenha uma referência ao serviço
const auth = getAuth(app);

// Inicialize o Firebase Storage e obtenha uma referência ao serviço
const storage = getStorage(app);

const firestore = getFirestore(app);

// Exporte as funções de autenticação e armazenamento
export { auth, storage, firestore };
