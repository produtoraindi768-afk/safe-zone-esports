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

async function addImmediateMatch() {
  try {
    console.log('Adicionando partida imediata...');
    
    // Data para 5 minutos a partir de agora
    const now = new Date();
    const matchDate = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutos
    
    const matchData = {
      status: 'upcoming',
      game: 'Valorant',
      tournament: 'Teste Imediato',
      tournamentName: 'Teste Imediato',
      scheduledDate: matchDate.toISOString(),
      team1: {
        name: 'Safe Zone Esports',
        logo: 'SZ'
      },
      team2: {
        name: 'Immediate Test Team',
        logo: 'ITT'
      },
      format: 'MD1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    const docRef = await addDoc(collection(db, 'matches'), matchData);
    
    console.log('✅ Partida imediata adicionada com sucesso!');
    console.log('ID do documento:', docRef.id);
    console.log('Data da partida:', matchData.scheduledDate);
    console.log('Dados da partida:', matchData);
    
  } catch (error) {
    console.error('❌ Erro ao adicionar partida:', error);
  }
}

addImmediateMatch();