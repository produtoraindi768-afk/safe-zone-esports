import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBHdZXGGBJOLnXGGBJOLnXGGBJOLnXGGBJO",
  authDomain: "safe-zone-esports.firebaseapp.com",
  projectId: "safe-zone-esports",
  storageBucket: "safe-zone-esports.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop",
  measurementId: "G-ABCDEFGHIJ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addTodayMatch() {
  try {
    console.log('Adicionando partida para hoje...');
    
    // Data para hoje às 20:00
    const today = new Date();
    today.setHours(20, 0, 0, 0);
    
    const matchData = {
      status: 'upcoming',
      game: 'CS2',
      tournament: 'Partida de Hoje',
      tournamentName: 'Partida de Hoje',
      scheduledDate: today.toISOString(),
      team1: {
        name: 'Safe Zone Esports',
        logo: 'SZ'
      },
      team2: {
        name: 'Today Team',
        logo: 'TT'
      },
      format: 'MD3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'matches'), matchData);
    
    console.log('✅ Partida de hoje adicionada com sucesso!');
    console.log('ID do documento:', docRef.id);
    console.log('Data da partida:', matchData.scheduledDate);
    console.log('Dados da partida:', matchData);
    
  } catch (error) {
    console.error('❌ Erro ao adicionar partida:', error);
  }
}

addTodayMatch();