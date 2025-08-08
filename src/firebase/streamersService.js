// Serviço para buscar dados dos streamers do Firebase
import { collection, getDocs, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './config';

// Função para buscar todos os streamers
export const getAllStreamers = async () => {
  try {
    const streamersCollection = collection(db, 'streamers');
    const streamersSnapshot = await getDocs(streamersCollection);
    const streamers = streamersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Streamers encontrados no Firebase:', streamers);
    return streamers;
  } catch (error) {
    console.error('Erro ao buscar streamers do Firebase:', error);
    throw error;
  }
};

// Função para buscar apenas streamers online
export const getOnlineStreamers = async () => {
  try {
    const streamersCollection = collection(db, 'streamers');
    const onlineQuery = query(streamersCollection, where('isOnline', '==', true));
    const onlineSnapshot = await getDocs(onlineQuery);
    const onlineStreamers = onlineSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Streamers online encontrados no Firebase:', onlineStreamers);
    return onlineStreamers;
  } catch (error) {
    console.error('Erro ao buscar streamers online do Firebase:', error);
    throw error;
  }
};

// Função para buscar streamer em destaque (featured)
export const getFeaturedStreamer = async () => {
  try {
    const streamersCollection = collection(db, 'streamers');
    const featuredQuery = query(
      streamersCollection, 
      where('isOnline', '==', true),
      where('isFeatured', '==', true)
    );
    const featuredSnapshot = await getDocs(featuredQuery);
    const featuredStreamers = featuredSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log('Streamer em destaque encontrado no Firebase:', featuredStreamers);
    return featuredStreamers.length > 0 ? featuredStreamers[0] : null;
  } catch (error) {
    console.error('Erro ao buscar streamer em destaque do Firebase:', error);
    throw error;
  }
};

// Função para escutar mudanças em tempo real
export const subscribeToStreamers = (callback) => {
  try {
    const streamersCollection = collection(db, 'streamers');
    const onlineQuery = query(streamersCollection, where('isOnline', '==', true));
    
    const unsubscribe = onSnapshot(onlineQuery, (snapshot) => {
      const streamers = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      console.log('Atualização em tempo real - Streamers online:', streamers);
      callback(streamers);
    }, (error) => {
      console.error('Erro no listener em tempo real:', error);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Erro ao configurar listener em tempo real:', error);
    throw error;
  }
};

// Função para processar dados do streamer para o formato da interface
export const processStreamerData = (streamer) => {
  const viewers = Math.floor(Math.random() * 2000) + 100;
  
  return {
    id: streamer.id,
    player: streamer.name,
    name: streamer.name,
    category: streamer.category,
    streamUrl: streamer.streamUrl,
    thumbnail: streamer.avatarUrl || '/src/assets/search_images/default.jpg',
    twitchChannel: streamer.streamUrl ? streamer.streamUrl.split('/').pop() : streamer.name.toLowerCase(),
    isLive: true,
    isOnline: streamer.isOnline,
    isFeatured: streamer.isFeatured || false, // Preservar propriedade isFeatured
    viewers,
    game: streamer.category,
    twitchUrl: streamer.streamUrl,
    platform: streamer.platform || 'Twitch',
    createdAt: streamer.createdAt,
    lastStatusUpdate: streamer.lastStatusUpdate
  };
};