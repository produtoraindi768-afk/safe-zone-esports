// Serviço para buscar dados das partidas do Firebase
import { collection, getDocs, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from './config';

// Função para buscar todas as partidas
export const getAllMatches = async () => {
  try {
    const matchesCollection = collection(db, 'matches');
    const matchesQuery = query(matchesCollection, orderBy('date', 'desc'));
    const matchesSnapshot = await getDocs(matchesQuery);
    const matches = matchesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Partidas encontradas no Firebase:', matches);
    return matches;
  } catch (error) {
    console.error('Erro ao buscar partidas do Firebase:', error);
    throw error;
  }
};

// Função para buscar partidas ao vivo
export const getLiveMatches = async () => {
  try {
    const matchesCollection = collection(db, 'matches');
    const liveQuery = query(matchesCollection, where('status', '==', 'live'));
    const liveSnapshot = await getDocs(liveQuery);
    const liveMatches = liveSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Partidas ao vivo encontradas no Firebase:', liveMatches);
    return liveMatches;
  } catch (error) {
    console.error('Erro ao buscar partidas ao vivo do Firebase:', error);
    throw error;
  }
};

// Função para buscar partidas em destaque (featured)
export const getFeaturedMatches = async () => {
  try {
    const matchesCollection = collection(db, 'matches');
    // Buscar todas as partidas marcadas como destaque
    const featuredQuery = query(
      matchesCollection, 
      where('isFeatured', '==', true)
    );
    const featuredSnapshot = await getDocs(featuredQuery);
    
    if (!featuredSnapshot.empty) {
      const featuredMatches = featuredSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Partidas em destaque encontradas no Firebase:', featuredMatches);
      return featuredMatches;
    }
    
    console.log('Nenhuma partida em destaque encontrada no Firebase');
    return [];
  } catch (error) {
    console.error('Erro ao buscar partidas em destaque do Firebase:', error);
    throw error;
  }
};

// Função para buscar uma única partida em destaque (compatibilidade)
export const getFeaturedMatch = async () => {
  try {
    const featuredMatches = await getFeaturedMatches();
    return featuredMatches.length > 0 ? featuredMatches[0] : null;
  } catch (error) {
    console.error('Erro ao buscar partida em destaque do Firebase:', error);
    throw error;
  }
};

// Função para buscar próximas partidas
export const getUpcomingMatches = async () => {
  try {
    const matchesCollection = collection(db, 'matches');
    const upcomingQuery = query(
      matchesCollection, 
      where('status', '==', 'upcoming'),
      orderBy('date', 'asc'),
      limit(5)
    );
    const upcomingSnapshot = await getDocs(upcomingQuery);
    const upcomingMatches = upcomingSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Próximas partidas encontradas no Firebase:', upcomingMatches);
    return upcomingMatches;
  } catch (error) {
    console.error('Erro ao buscar próximas partidas do Firebase:', error);
    throw error;
  }
};

// Função para escutar mudanças em tempo real nas partidas
export const subscribeToMatches = (callback) => {
  try {
    const matchesCollection = collection(db, 'matches');
    const matchesQuery = query(
      matchesCollection,
      where('status', 'in', ['live', 'upcoming']),
      orderBy('date', 'asc')
    );
    
    const unsubscribe = onSnapshot(matchesQuery, (snapshot) => {
      const matches = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      callback(matches);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Erro ao configurar listener de partidas:', error);
    throw error;
  }
};

// Função para processar dados de partida
export const processMatchData = (match) => {
  if (!match) return null;
  
  try {
    // Extrair data e hora do scheduledDate
    const scheduledDateTime = new Date(match.scheduledDate);
    const date = scheduledDateTime.toISOString().split('T')[0];
    const time = scheduledDateTime.toTimeString().slice(0, 5);
    
    return {
      id: match.id,
      date: date,
      time: time,
      tournament: match.tournamentName || 'Torneio',
      game: match.game || 'Game',
      status: match.status || 'scheduled',
      format: match.format || 'MD1',
      teams: {
        home: {
          name: match.team1?.name || 'Team 1',
          logo: match.team1?.logo || match.team1?.name?.charAt(0) || 'T1',
          score: match.result?.team1Score || 0,
          color: 'from-blue-500 to-purple-600',
          avatar: match.team1?.avatar || null
        },
        away: {
          name: match.team2?.name || 'Team 2',
          logo: match.team2?.logo || match.team2?.name?.charAt(0) || 'T2',
          score: match.result?.team2Score || 0,
          color: 'from-orange-500 to-red-600',
          avatar: match.team2?.avatar || null
        }
      },
      result: {
        team1Score: match.result?.team1Score || 0,
        team2Score: match.result?.team2Score || 0,
        winner: match.result?.winner || null,
        resultMD5: match.result?.resultMD5 || null
      },
      resultMD3: match.resultMD3 || null,
      resultMD5: match.resultMD5 || null,
      team1ScoreMD3: match.team1ScoreMD3 || 0,
      team2ScoreMD3: match.team2ScoreMD3 || 0,
      team1ScoreMD5: match.team1ScoreMD5 || 0,
      team2ScoreMD5: match.team2ScoreMD5 || 0,
      createdAt: match.createdAt,
      updatedAt: match.updatedAt
    };
  } catch (error) {
    console.error('Erro ao processar dados da partida:', error);
    return null;
  }
};

// Função para formatar data e hora da partida
export const formatMatchDateTime = (date, time) => {
  try {
    const matchDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Verificar se é hoje
    if (matchDate.toDateString() === today.toDateString()) {
      return `Hoje, ${time}`;
    }
    
    // Verificar se é amanhã
    if (matchDate.toDateString() === tomorrow.toDateString()) {
      return `Amanhã, ${time}`;
    }
    
    // Formato padrão: DD/MM, HH:MM
    const day = matchDate.getDate().toString().padStart(2, '0');
    const month = (matchDate.getMonth() + 1).toString().padStart(2, '0');
    return `${day}/${month}, ${time}`;
  } catch (error) {
    console.error('Erro ao formatar data da partida:', error);
    return 'Data inválida';
  }
};