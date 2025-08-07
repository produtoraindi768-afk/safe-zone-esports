import { db } from './config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, limit, onSnapshot } from 'firebase/firestore';

// Coleção de notícias no Firestore
const NEWS_COLLECTION = 'news';

/**
 * Busca todas as notícias do Firebase
 * @returns {Promise<Array>} Array de notícias
 */
export const getAllNews = async () => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(newsCollection, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return news;
  } catch (error) {
    console.error('Erro ao buscar notícias:', error);
    throw error;
  }
};

/**
 * Busca notícias por categoria
 * @param {string} category - Categoria das notícias
 * @returns {Promise<Array>} Array de notícias da categoria
 */
export const getNewsByCategory = async (category) => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(
      newsCollection, 
      where('category', '==', category),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return news;
  } catch (error) {
    console.error('Erro ao buscar notícias por categoria:', error);
    throw error;
  }
};

/**
 * Busca notícias em destaque
 * @returns {Promise<Array>} Array de notícias em destaque
 */
export const getFeaturedNews = async () => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(
      newsCollection, 
      where('featured', '==', true),
      orderBy('date', 'desc')
    );
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return news;
  } catch (error) {
    console.error('Erro ao buscar notícias em destaque:', error);
    throw error;
  }
};

/**
 * Busca uma notícia específica por ID
 * @param {string} newsId - ID da notícia
 * @returns {Promise<Object>} Dados da notícia
 */
export const getNewsById = async (newsId) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, newsId);
    const docSnap = await getDoc(newsDoc);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data()
      };
    } else {
      throw new Error('Notícia não encontrada');
    }
  } catch (error) {
    console.error('Erro ao buscar notícia por ID:', error);
    throw error;
  }
};

/**
 * Subscreve para atualizações em tempo real das notícias
 * @param {Function} callback - Função chamada quando há atualizações
 * @returns {Function} Função para cancelar a subscrição
 */
export const subscribeToNews = (callback) => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(newsCollection, orderBy('date', 'desc'));
    
    const unsubscribe = onSnapshot(newsQuery, (querySnapshot) => {
      const news = [];
      querySnapshot.forEach((doc) => {
        news.push({
          id: doc.id,
          ...doc.data()
        });
      });
      callback(news);
    }, (error) => {
      console.error('Erro na subscrição de notícias:', error);
      callback([]);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Erro ao subscrever notícias:', error);
    return () => {};
  }
};

/**
 * Adiciona uma nova notícia
 * @param {Object} newsData - Dados da notícia
 * @returns {Promise<string>} ID da notícia criada
 */
export const addNews = async (newsData) => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const docRef = await addDoc(newsCollection, {
      ...newsData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Erro ao adicionar notícia:', error);
    throw error;
  }
};

/**
 * Atualiza uma notícia existente
 * @param {string} newsId - ID da notícia
 * @param {Object} updateData - Dados para atualizar
 * @returns {Promise<void>}
 */
export const updateNews = async (newsId, updateData) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, newsId);
    await updateDoc(newsDoc, {
      ...updateData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Erro ao atualizar notícia:', error);
    throw error;
  }
};

/**
 * Remove uma notícia
 * @param {string} newsId - ID da notícia
 * @returns {Promise<void>}
 */
export const deleteNews = async (newsId) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, newsId);
    await deleteDoc(newsDoc);
  } catch (error) {
    console.error('Erro ao deletar notícia:', error);
    throw error;
  }
};

/**
 * Incrementa o número de visualizações de uma notícia
 * @param {string} newsId - ID da notícia
 * @returns {Promise<void>}
 */
export const incrementNewsViews = async (newsId) => {
  try {
    const newsDoc = doc(db, NEWS_COLLECTION, newsId);
    const docSnap = await getDoc(newsDoc);
    
    if (docSnap.exists()) {
      const currentViews = docSnap.data().views || 0;
      await updateDoc(newsDoc, {
        views: currentViews + 1,
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    console.error('Erro ao incrementar visualizações:', error);
  }
};

/**
 * Busca notícias com base em termo de pesquisa
 * @param {string} searchTerm - Termo de pesquisa
 * @returns {Promise<Array>} Array de notícias que correspondem à pesquisa
 */
export const searchNews = async (searchTerm) => {
  try {
    // Como o Firestore não suporta busca full-text nativa,
    // vamos buscar todas as notícias e filtrar no cliente
    const allNews = await getAllNews();
    
    const filteredNews = allNews.filter(news => 
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return filteredNews;
  } catch (error) {
    console.error('Erro ao pesquisar notícias:', error);
    throw error;
  }
};

/**
 * Busca as notícias mais populares (por visualizações)
 * @param {number} limitCount - Número máximo de notícias a retornar
 * @returns {Promise<Array>} Array das notícias mais populares
 */
export const getPopularNews = async (limitCount = 5) => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(
      newsCollection, 
      orderBy('views', 'desc'),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return news;
  } catch (error) {
    console.error('Erro ao buscar notícias populares:', error);
    throw error;
  }
};