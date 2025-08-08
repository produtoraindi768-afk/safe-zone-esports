// Script para adicionar uma partida de teste no Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMJ_OR41iCIMGDEmGYUkf1mI6Aym9W04w",
  authDomain: "dashboard-f0217.firebaseapp.com",
  projectId: "dashboard-f0217",
  storageBucket: "dashboard-f0217.firebasestorage.app",
  messagingSenderId: "791615571",
  appId: "1:791615571:web:396e6bc323a648864d0ea6",
  measurementId: "G-DN79LHPJ42"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTestMatch() {
  try {
    console.log('Adicionando partida de teste...');
    
    // Criar data para amanhã
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(19, 0, 0, 0); // 19:00
    
    const testMatch = {
      status: 'upcoming',
      game: 'CS2',
      tournament: 'Regional Championship',
      tournamentName: 'Regional Championship',
      scheduledDate: tomorrow.toISOString(),
      team1: {
        name: 'Safe Zone Esports',
        logo: 'SZ'
      },
      team2: {
        name: 'Thunder Wolves',
        logo: 'TW'
      },
      format: 'MD3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const matchesRef = collection(db, 'matches');
    const docRef = await addDoc(matchesRef, testMatch);
    
    console.log('✅ Partida de teste adicionada com sucesso!');
    console.log('ID do documento:', docRef.id);
    console.log('Data da partida:', tomorrow.toISOString());
    console.log('Dados da partida:', testMatch);
    
  } catch (error) {
    console.error('❌ Erro ao adicionar partida de teste:', error);
  }
}

// Executar a função
addTestMatch();