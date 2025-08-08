import { db } from './config';
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, where, limit, onSnapshot } from 'firebase/firestore';

// Coleção de notícias no Firestore
const NEWS_COLLECTION = 'news';

/**
 * Processa e formata os dados das notícias do Firebase
 * @param {Array} newsArray - Array de notícias brutas do Firebase
 * @returns {Array} Array de notícias processadas
 */
export const processNewsData = (newsData) => {
  // Se for um objeto único, converte para array
  const newsArray = Array.isArray(newsData) ? newsData : [newsData];
  
  const processedNews = newsArray.map(news => {
    // Formatar data de publicação
    let formattedDate = '';
    if (news.publishDate) {
      try {
        const date = new Date(news.publishDate);
        formattedDate = date.toLocaleDateString('pt-BR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
      } catch (error) {
        formattedDate = news.publishDate;
      }
    }

    // Formatar timestamp de criação
    let createdAtFormatted = '';
    if (news.createdAt) {
      try {
        let date;
        if (news.createdAt.toDate) {
          // Firestore Timestamp
          date = news.createdAt.toDate();
        } else {
          // String ou Date
          date = new Date(news.createdAt);
        }
        createdAtFormatted = date.toLocaleDateString('pt-BR');
      } catch (error) {
        createdAtFormatted = news.createdAt;
      }
    }

    return {
      id: news.id,
      title: news.title || '',
      excerpt: news.excerpt || '',
      content: news.content || '',
      contentHtml: news.contentHtml || '',
      author: news.author || 'SAFEzone Admin',
      category: news.category || 'Esports',
      bannerUrl: news.bannerUrl || news.featuredImage || '',
      featuredImage: news.featuredImage || news.bannerUrl || '',
      publishDate: formattedDate,
      createdAt: createdAtFormatted,
      isFeatured: news.isFeatured || false,
      status: news.status || 'published',
      readingTime: news.readingTime || 1,
      tags: news.tags || [],
      slug: news.slug || '',
      seoTitle: news.seoTitle || news.title,
      seoDescription: news.seoDescription || news.excerpt,
      views: news.views || 0,
      updatedAt: news.updatedAt || news.createdAt
    };
  });
  
  // Se foi passado um objeto único, retorna apenas o primeiro item
  return Array.isArray(newsData) ? processedNews : processedNews[0];
};

/**
 * Busca todas as notícias do Firebase
 * @returns {Promise<Array>} Array de notícias
 */
export const getAllNews = async () => {
  try {
    console.log('🔍 Buscando todas as notícias no Firebase...');
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(newsCollection, orderBy('publishDate', 'desc'));
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      news.push({
        id: doc.id,
        ...data
      });
    });
    
    console.log('✅ Notícias encontradas no Firebase:', news.length);
    return news;
  } catch (error) {
    console.error('❌ Erro ao buscar notícias:', error);
    console.error('❌ Detalhes do erro:', error.message);
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
      where('isFeatured', '==', true),
      where('status', '==', 'published'),
      orderBy('publishDate', 'desc')
    );
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return processNewsData(news);
  } catch (error) {
    console.error('Erro ao buscar notícias em destaque:', error);
    throw error;
  }
};

/**
 * Busca a notícia principal em destaque
 * @returns {Promise<Object|null>} Notícia principal em destaque
 */
export const getMainFeaturedNews = async () => {
  try {
    const featuredNews = await getFeaturedNews();
    return featuredNews.length > 0 ? featuredNews[0] : null;
  } catch (error) {
    console.error('Erro ao buscar notícia principal:', error);
    return null;
  }
};

/**
 * Busca notícias recentes (excluindo a principal)
 * @param {number} limitCount - Número de notícias a retornar
 * @returns {Promise<Array>} Array de notícias recentes
 */
export const getRecentNews = async (limitCount = 6) => {
  try {
    const newsCollection = collection(db, NEWS_COLLECTION);
    const newsQuery = query(
      newsCollection,
      where('status', '==', 'published'),
      orderBy('publishDate', 'desc'),
      limit(limitCount + 1) // +1 para excluir a principal depois
    );
    const querySnapshot = await getDocs(newsQuery);
    
    const news = [];
    querySnapshot.forEach((doc) => {
      news.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    // Remove a primeira notícia se ela for featured (para não duplicar)
    const processedNews = processNewsData(news);
    const mainFeatured = await getMainFeaturedNews();
    
    if (mainFeatured && processedNews.length > 0 && processedNews[0].id === mainFeatured.id) {
      return processedNews.slice(1, limitCount + 1);
    }
    
    return processedNews.slice(0, limitCount);
  } catch (error) {
    console.error('Erro ao buscar notícias recentes:', error);
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