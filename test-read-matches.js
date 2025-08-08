import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, orderBy } from 'firebase/firestore';

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

async function testReadMatches() {
  try {
    console.log('🔍 Testando leitura de partidas do Firebase...');
    
    // Tentar buscar todas as partidas primeiro
    const allMatchesRef = collection(db, 'matches');
    const allMatchesSnapshot = await getDocs(allMatchesRef);
    
    console.log('📊 Total de partidas encontradas:', allMatchesSnapshot.size);
    
    if (allMatchesSnapshot.size > 0) {
      console.log('\n📋 Lista de todas as partidas:');
      allMatchesSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ID: ${doc.id}`);
        console.log(`  Status: ${data.status}`);
        console.log(`  Data: ${data.scheduledDate}`);
        console.log(`  Jogo: ${data.game}`);
        console.log(`  Torneio: ${data.tournament || data.tournamentName}`);
        console.log(`  Time 1: ${data.team1?.name}`);
        console.log(`  Time 2: ${data.team2?.name}`);
        console.log('---');
      });
    }
    
    // Tentar buscar apenas partidas upcoming
    console.log('\n🔍 Buscando partidas com status "upcoming"...');
    const upcomingQuery = query(
      collection(db, 'matches'),
      where('status', '==', 'upcoming')
    );
    
    const upcomingSnapshot = await getDocs(upcomingQuery);
    console.log('📊 Partidas upcoming encontradas:', upcomingSnapshot.size);
    
    if (upcomingSnapshot.size > 0) {
      console.log('\n📋 Partidas upcoming:');
      upcomingSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${data.team1?.name} vs ${data.team2?.name}`);
        console.log(`  Data: ${data.scheduledDate}`);
        console.log(`  Torneio: ${data.tournament || data.tournamentName}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Erro ao ler partidas:', error);
  }
}

testReadMatches();