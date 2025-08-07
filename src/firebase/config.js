// Configuração do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração do Firebase com as credenciais do projeto dashboard
const firebaseConfig = {
  apiKey: "AIzaSyBMJ_OR41iCIMGDEmGYUkf1mI6Aym9W04w",
  authDomain: "dashboard-f0217.firebaseapp.com",
  projectId: "dashboard-f0217",
  storageBucket: "dashboard-f0217.firebasestorage.app",
  messagingSenderId: "791615571",
  appId: "1:791615571:web:396e6bc323a648864d0ea6",
  measurementId: "G-DN79LHPJ42"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

export { db };
export default app;