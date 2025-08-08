import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOnlineStreamers, subscribeToStreamers, processStreamerData, getFeaturedStreamer } from '../firebase/streamersService';
import { getMainFeaturedNews, getRecentNews, processNewsData, getAllNews } from '../firebase/newsService';
import StreamPopup from '../components/StreamPopup';
import NewsModal from '../components/NewsModal';

// ===== CONFIGURAÇÃO DOS STREAMERS =====
// Dados simulados baseados no formato do Dashboard
// Formato: { isOnline, name, streamUrl, category }
const streamersDatabase = [
  {
    id: 1,
    name: "GaspaFV",
    streamUrl: "https://www.twitch.tv/gaspafv",
    category: "FPS",
    isOnline: true,
    thumbnail: "/src/assets/search_images/CHMA6ghxYIgZ.jpg",
    twitchChannel: "gaspafv"
  },
  {
    id: 2,
    name: "OKASCA",
    streamUrl: "https://www.twitch.tv/okasca",
    category: "FPS",
    isOnline: true,
    thumbnail: "/src/assets/search_images/y3F6G6k0zluy.jpg",
    twitchChannel: "okasca"
  },
  {
    id: 3,
    name: "fz",
    streamUrl: "https://www.twitch.tv/trevinsz",
    category: "Music",
    isOnline: true,
    thumbnail: "/src/assets/search_images/BvYRHtryfcGU.png",
    twitchChannel: "trevinsz"
  },
  {
    id: 4,
    name: "ThunderStrike",
    streamUrl: "https://www.twitch.tv/thunderstrike",
    category: "MOBA",
    isOnline: false,
    thumbnail: "/src/assets/search_images/81uPdvvPCZKn.png",
    twitchChannel: "thunderstrike"
  },
  {
    id: 5,
    name: "CyberNinja",
    streamUrl: "https://www.twitch.tv/cyberninja",
    category: "FPS",
    isOnline: false,
    thumbnail: "/src/assets/search_images/vcCA7ugxuX5u.png",
    twitchChannel: "cyberninja"
  }
];
// ===== FIM DA CONFIGURAÇÃO =====

const Home = () => {
  const [timeToNextMatch, setTimeToNextMatch] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

  const [streamsData, setStreamsData] = useState([]);
  const [isLoadingStreams, setIsLoadingStreams] = useState(true);
  const [featuredStreamer, setFeaturedStreamer] = useState(null);
  const [showStreamPopup, setShowStreamPopup] = useState(false);
  const [currentPopupStream, setCurrentPopupStream] = useState(null);
  
  // Estados para notícias
  const [mainFeaturedNews, setMainFeaturedNews] = useState(null);
  const [recentNews, setRecentNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [selectedNews, setSelectedNews] = useState(null);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // Função para carregar notícias
  const loadNews = async () => {
    setIsLoadingNews(true);
    
    console.log('🔍 Iniciando carregamento de notícias...');
    console.log('🔧 Configuração do Firebase:', { projectId: 'dashboard-f0217' });
    
    // Dados simulados com estrutura completa
    const simulatedNews = [
      {
        id: "1",
        title: "Safe Zone conquista vitória épica no torneio regional",
        excerpt: "Equipe demonstra excelente coordenação em partida decisiva contra rivals tradicionais.",
        content: "A Safe Zone Esports conquistou uma vitória memorável no torneio regional de CS2, demonstrando coordenação excepcional e estratégias inovadoras que surpreenderam os adversários.",
        contentHtml: "<p>A Safe Zone Esports conquistou uma vitória memorável no torneio regional de CS2, demonstrando coordenação excepcional e estratégias inovadoras que surpreenderam os adversários.</p>",
        publishDate: "15/01/2024",
        createdAt: "15/01/2024",
        bannerUrl: "https://picsum.photos/800/400?random=1",
        featuredImage: "https://picsum.photos/800/400?random=1",
        category: "CS2",
        author: "SAFEzone Admin",
        isFeatured: true,
        status: "published",
        readingTime: 3,
        tags: ["CS2", "Vitória", "Torneio", "Regional", "Coordenação"],
        slug: "safe-zone-conquista-vitoria-epica-torneio-regional",
        seoTitle: "Safe Zone conquista vitória épica no torneio regional - SAFEzone Esports",
        seoDescription: "Equipe demonstra excelente coordenação em partida decisiva contra rivals tradicionais no torneio regional.",
        views: 2847,
        updatedAt: "15/01/2024"
      },
      {
        id: "2",
        title: "Novo recorde de audiência em stream oficial",
        excerpt: "Transmissão ao vivo da Safe Zone bate recorde histórico de visualizações simultâneas.",
        content: "A transmissão oficial da Safe Zone Esports estabeleceu um novo recorde de audiência, com mais de 50.000 espectadores simultâneos acompanhando a partida decisiva.",
        contentHtml: "<p>A transmissão oficial da Safe Zone Esports estabeleceu um novo recorde de audiência, com mais de 50.000 espectadores simultâneos acompanhando a partida decisiva.</p>",
        publishDate: "12/01/2024",
        createdAt: "12/01/2024",
        bannerUrl: "https://picsum.photos/800/400?random=2",
        featuredImage: "https://picsum.photos/800/400?random=2",
        category: "Streaming",
        author: "SAFEzone Admin",
        isFeatured: false,
        status: "published",
        readingTime: 2,
        tags: ["Stream", "Recorde", "Audiência", "Transmissão", "Visualizações"],
        slug: "novo-recorde-audiencia-stream-oficial",
        seoTitle: "Novo recorde de audiência em stream oficial - SAFEzone Esports",
        seoDescription: "Transmissão ao vivo da Safe Zone bate recorde histórico de visualizações simultâneas.",
        views: 1923,
        updatedAt: "12/01/2024"
      },
      {
        id: "3",
        title: "Calendário de treinos intensivos para próxima temporada",
        excerpt: "Preparação focada em estratégias avançadas e coordenação de equipe.",
        content: "A Safe Zone Esports anuncia seu calendário de treinos intensivos para a próxima temporada, com foco em estratégias avançadas e aprimoramento da coordenação de equipe.",
        contentHtml: "<p>A Safe Zone Esports anuncia seu calendário de treinos intensivos para a próxima temporada, com foco em estratégias avançadas e aprimoramento da coordenação de equipe.</p>",
        publishDate: "10/01/2024",
        createdAt: "10/01/2024",
        bannerUrl: "https://picsum.photos/800/400?random=3",
        featuredImage: "https://picsum.photos/800/400?random=3",
        category: "Geral",
        author: "SAFEzone Admin",
        isFeatured: false,
        status: "published",
        readingTime: 4,
        tags: ["Treinos", "Temporada", "Estratégia", "Preparação"],
        slug: "calendario-treinos-intensivos-proxima-temporada",
        seoTitle: "Calendário de treinos intensivos para próxima temporada - SAFEzone Esports",
        seoDescription: "Preparação focada em estratégias avançadas e coordenação de equipe para a nova temporada.",
        views: 654,
        updatedAt: "10/01/2024"
      },
      {
        id: "4",
        title: "Análise tática: Como a Safe Zone dominou o meta atual",
        excerpt: "Breakdown completo das estratégias que levaram a equipe ao topo do ranking.",
        content: "Uma análise detalhada das táticas e estratégias que permitiram à Safe Zone dominar o meta atual e alcançar o topo do ranking competitivo.",
        contentHtml: "<p>Uma análise detalhada das táticas e estratégias que permitiram à Safe Zone dominar o meta atual e alcançar o topo do ranking competitivo.</p>",
        publishDate: "08/01/2024",
        createdAt: "08/01/2024",
        bannerUrl: "https://picsum.photos/800/400?random=4",
        featuredImage: "https://picsum.photos/800/400?random=4",
        category: "CS2",
        author: "SAFEzone Admin",
        isFeatured: false,
        status: "published",
        readingTime: 5,
        tags: ["CS2", "Análise", "Tática", "Meta", "Ranking"],
        slug: "analise-tatica-safe-zone-dominou-meta-atual",
        seoTitle: "Análise tática: Como a Safe Zone dominou o meta atual - SAFEzone Esports",
        seoDescription: "Breakdown completo das estratégias que levaram a equipe ao topo do ranking competitivo.",
        views: 1456,
        updatedAt: "08/01/2024"
      },
      {
        id: "5",
        title: "Bootcamp internacional marca preparação para Major",
        excerpt: "Equipe viaja para Europa para treinar com os melhores times do mundo.",
        content: "A Safe Zone embarca em um bootcamp internacional na Europa, onde treinará intensivamente com algumas das melhores equipes do cenário mundial.",
        contentHtml: "<p>A Safe Zone embarca em um bootcamp internacional na Europa, onde treinará intensivamente com algumas das melhores equipes do cenário mundial.</p>",
        publishDate: "05/01/2024",
        createdAt: "05/01/2024",
        bannerUrl: "https://picsum.photos/800/400?random=5",
        featuredImage: "https://picsum.photos/800/400?random=5",
        category: "Torneios",
        author: "SAFEzone Admin",
        isFeatured: false,
        status: "published",
        readingTime: 3,
        tags: ["Bootcamp", "Major", "Internacional", "Europa", "Preparação"],
        slug: "bootcamp-internacional-preparacao-major",
        seoTitle: "Bootcamp internacional marca preparação para Major - SAFEzone Esports",
        seoDescription: "Equipe viaja para Europa para treinar com os melhores times do mundo em preparação para o Major.",
        views: 987,
        updatedAt: "05/01/2024"
      }
    ];
    
    try {
      console.log('🔍 Iniciando busca de notícias no Firebase...');
      
      // Primeiro, vamos verificar se há QUALQUER notícia no Firebase
      console.log('🔍 Verificando todas as notícias no Firebase...');
      const allNews = await getAllNews();
      console.log('📊 Total de notícias no Firebase:', allNews?.length || 0);
      
      if (allNews && allNews.length > 0) {
        console.log('📋 Primeiras 3 notícias encontradas:', allNews.slice(0, 3).map(n => ({ 
          id: n.id, 
          title: n.title, 
          isFeatured: n.isFeatured, 
          status: n.status,
          publishDate: n.publishDate 
        })));
        
        // Se há notícias, vamos usá-las diretamente
        const featuredNews = allNews.find(news => news.isFeatured === true && news.status === 'published');
        const mainNews = featuredNews || allNews[0];
        
        // Filtrar notícias recentes excluindo a notícia de destaque para evitar repetição
        const recentNewsFiltered = allNews
          .filter(news => news.status === 'published' && news.id !== mainNews.id)
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
          .slice(0, 6);
        
        console.log('🎯 Notícia em destaque encontrada:', featuredNews ? featuredNews.title : 'NENHUMA');
        console.log('📋 Notícias recentes filtradas (sem repetir destaque):', recentNewsFiltered.length);
        
        setMainFeaturedNews(mainNews);
        setRecentNews(recentNewsFiltered);
        console.log('🎉 Usando dados do Firebase!');
        
      } else {
        console.log('⚠️ Nenhuma notícia encontrada no Firebase. Usando dados simulados como fallback');
        setMainFeaturedNews(simulatedNews[0]);
        setRecentNews(simulatedNews.slice(1));
      }
      
    } catch (error) {
      console.error('❌ Erro ao carregar notícias do Firebase:', error);
      console.error('❌ Detalhes do erro:', error.message);
      console.log('🔄 Usando dados simulados como fallback devido ao erro');
      // Fallback para dados simulados em caso de erro
      setMainFeaturedNews(simulatedNews[0]);
      setRecentNews(simulatedNews.slice(1));
    }
    
    console.log('✅ Carregamento de notícias finalizado');
    
    // Simular um pequeno delay para mostrar o loading
    setTimeout(() => {
      setIsLoadingNews(false);
    }, 500);
  };

  // Função para buscar dados diretamente do Firebase
  const checkStreamStatus = async () => {
    setIsLoadingStreams(true);
    
    try {
      console.log('Tentando conectar ao Firebase...');
      
      // Busca streamer em destaque
      const featured = await getFeaturedStreamer();
      if (featured) {
        setFeaturedStreamer(processStreamerData(featured));
        console.log('Streamer em destaque encontrado:', featured.name);
      } else {
        setFeaturedStreamer(null);
        console.log('Nenhum streamer em destaque encontrado');
      }
      
      // Tenta buscar streamers online do Firebase
      const onlineStreamers = await getOnlineStreamers();
      
      // Processa os dados dos streamers online
      const onlineStreams = onlineStreamers.map(streamer => {
        console.log(`Stream ${streamer.name} está online no Firebase - será exibida`);
        return processStreamerData(streamer);
      });
      
      setStreamsData(onlineStreams);
      console.log(`${onlineStreams.length} streams online encontradas no Firebase`);
      
    } catch (error) {
      console.error('Erro ao conectar com Firebase (credenciais não configuradas):', error);
      console.log('Usando dados locais simulados para demonstração...');
      
      // Fallback para dados locais simulados
      const simulatedOnlineStreamers = streamersDatabase
        .filter(streamer => streamer.isOnline === true)
        .map(streamer => {
          console.log(`Stream ${streamer.name} está online (simulado) - será exibida`);
          return processStreamerData(streamer);
        });
      
      setStreamsData(simulatedOnlineStreamers);
      setFeaturedStreamer(null); // Sem featured nos dados simulados
      console.log(`${simulatedOnlineStreamers.length} streams online simuladas encontradas`);
    }
    
    setIsLoadingStreams(false);
  };

  // Função para abrir modal de notícia
  const handleReadMore = (news) => {
    setSelectedNews(news);
    setShowNewsModal(true);
  };

  // Verificar streams e carregar notícias ao carregar o componente
  useEffect(() => {
    checkStreamStatus();
    loadNews();
    
    // Tenta configurar listener em tempo real do Firebase
    let unsubscribe = null;
    
    try {
      unsubscribe = subscribeToStreamers((onlineStreamers) => {
        console.log('Atualização em tempo real recebida do Firebase');
        const onlineStreams = onlineStreamers.map(streamer => {
          console.log(`Stream ${streamer.name} atualizada em tempo real`);
          return processStreamerData(streamer);
        });
        setStreamsData(onlineStreams);
        setIsLoadingStreams(false);
      });
    } catch (error) {
      console.log('Firebase listener não configurado, usando apenas dados locais');
    }
    
    // Atualiza manualmente a cada 2 minutos
    const interval = setInterval(checkStreamStatus, 2 * 60 * 1000);
    
    return () => {
      if (unsubscribe) {
        try {
          unsubscribe();
        } catch (error) {
          console.log('Erro ao desconectar listener do Firebase');
        }
      }
      clearInterval(interval);
    };
  }, []);

  // Simular contagem regressiva
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeToNextMatch(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Como já filtramos streams offline no checkStreamStatus, todas em streamsData estão ao vivo
  const liveStreams = streamsData;

  // Detectar quando há live em destaque e outras lives online para mostrar popup
  useEffect(() => {
    // Mostrar popup quando há live em destaque E outras lives online (além da featured)
    if (featuredStreamer && liveStreams.length > 0) {
      setShowStreamPopup(true);
      setCurrentPopupStream(featuredStreamer);
    } else {
      setShowStreamPopup(false);
      setCurrentPopupStream(null);
    }
  }, [featuredStreamer, liveStreams]);

  // Listener para controle manual do StreamPopup via botão "Ver Ao Vivo"
  useEffect(() => {
    const handleStreamPopupToggle = (event) => {
      if (event.detail === 'toggle') {
        if (featuredStreamer) {
          setShowStreamPopup(prev => !prev);
          if (!showStreamPopup) {
            setCurrentPopupStream(featuredStreamer);
          }
        }
      }
    };

    window.addEventListener('streamPopupToggle', handleStreamPopupToggle);
    return () => window.removeEventListener('streamPopupToggle', handleStreamPopupToggle);
  }, [featuredStreamer, showStreamPopup]);



  const upcomingMatches = [
    {
      id: 1,
      opponent: "Thunder Wolves",
      tournament: "Regional Championship",
      date: "2024-01-18",
      time: "19:00",
      game: "CS2"
    },
    {
      id: 2,
      opponent: "Cyber Eagles",
      tournament: "VCT Qualifier",
      date: "2024-01-20",
      time: "16:30",
      game: "Valorant"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section com Notícias */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section - Sempre mostra notícias */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="sz-neon-text">ÚLTIMAS NOTÍCIAS</span>
            </h1>
            <p className="text-lg text-gray-300">Fique por dentro das novidades do mundo dos esports</p>
          </div>

          {/* Área de Destaque - Notícias */}
          <div className="mb-8">
            {/* Últimas Notícias em Destaque - Bento Grid Design */}
            <div className="relative">
                {/* Notícia Principal */}
                <div className="max-w-7xl mx-auto mb-8">
                  <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-80 group cursor-pointer" onClick={() => handleReadMore(mainFeaturedNews)}>
                    <div className="relative h-full">
                    {isLoadingNews ? (
                      <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                        <div className="text-gray-400">Carregando notícia...</div>
                      </div>
                    ) : mainFeaturedNews ? (
                      <>
                        <img 
                          src={mainFeaturedNews.bannerUrl} 
                          alt={mainFeaturedNews.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                          {mainFeaturedNews.category}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                        <div className="absolute top-12 left-0 right-0 bottom-6 p-6">
                          <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 line-clamp-2">{mainFeaturedNews.title}</h1>
                          <p className="text-gray-200 text-base mb-4 line-clamp-3">{mainFeaturedNews.excerpt}</p>
                          
                          {/* Informações adicionais do Firebase */}
                          <div className="flex items-center gap-4 mb-4">
                            {mainFeaturedNews.readingTime && (
                              <div className="flex items-center gap-1 text-gray-300 text-sm">
                                <Clock className="w-4 h-4" />
                                <span>{mainFeaturedNews.readingTime} min de leitura</span>
                              </div>
                            )}
                            {mainFeaturedNews.views && (
                              <div className="flex items-center gap-1 text-gray-300 text-sm">
                                <TrendingUp className="w-4 h-4" />
                                <span>{mainFeaturedNews.views.toLocaleString()} visualizações</span>
                              </div>
                            )}
                            {mainFeaturedNews.author && (
                              <div className="flex items-center gap-1 text-gray-300 text-sm">
                                <Users className="w-4 h-4" />
                                <span>Por {mainFeaturedNews.author}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Tags */}
                          {mainFeaturedNews.tags && mainFeaturedNews.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {mainFeaturedNews.tags.slice(0, 3).map((tag, tagIndex) => (
                                <span key={tagIndex} className="bg-gray-700/70 text-gray-200 px-3 py-1 rounded-full text-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <div className="flex justify-end items-center -mt-1">
                            <Button 
                              className="bg-primary text-black hover:bg-primary/80"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReadMore(mainFeaturedNews);
                              }}
                            >
                              Ler matéria completa
                            </Button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <div className="text-gray-400">Nenhuma notícia em destaque</div>
                      </div>
                    )}
                  </div>
                  </Card>
                </div>

                {/* Grid de Notícias Secundárias - 3x2 */}
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Primeira Fileira - 3 Notícias */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-3">
                       {isLoadingNews ? (
                         // Loading state para as três primeiras notícias
                         Array.from({length: 3}).map((_, index) => (
                           <Card key={index} className="bg-gray-900/50 border-gray-700 overflow-hidden h-48">
                             <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                               <div className="text-gray-400">Carregando...</div>
                             </div>
                           </Card>
                         ))
                       ) : (
                         recentNews.slice(0, 3).map((news, index) => (
                           <Card key={news.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden group cursor-pointer" onClick={() => handleReadMore(news)}>
                             <div className="relative h-48">
                               <img 
                                 src={news.featuredImage} 
                                 alt={news.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                               />
                               <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                                 {news.category}
                               </div>
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                               <div className="absolute top-8 left-0 right-0 bottom-0 p-4">
                                 <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{news.title}</h3>
                                 <p className="text-gray-300 text-sm mb-2 line-clamp-2">{news.excerpt}</p>
                                 
                                 {/* Botão Ler mais posicionado no canto inferior direito */}
                                 <div className="absolute bottom-4 right-4">
                                   <Button 
                                     size="sm" 
                                     className="bg-primary text-black hover:bg-primary/80 text-xs transition-all duration-200 flex items-center gap-1.5"
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       handleReadMore(news);
                                     }}
                                   >
                                     <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                                     Ler mais
                                   </Button>
                                 </div>
                               </div>
                             </div>
                             
                             {/* Seção cinza inferior com informações */}
                             <div className="bg-gray-800/50 p-3 border-t border-gray-700">
                               <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                                   <Clock className="w-3 h-3" />
                                   <span>{news.readingTime || '1'} min</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                                   <Users className="w-3 h-3" />
                                   <span>{news.author || 'SAFEzone Admin'}</span>
                                 </div>
                               </div>
                             </div>
                           </Card>
                         ))
                       )}
                    </div>

                    {/* Segunda Fileira - 3 Notícias */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-3">
                      {isLoadingNews ? (
                        // Loading state para as três últimas notícias
                        Array.from({length: 3}).map((_, index) => (
                          <Card key={index} className="bg-gray-900/50 border-gray-700 overflow-hidden h-48">
                            <div className="w-full h-full bg-gray-800 animate-pulse flex items-center justify-center">
                              <div className="text-gray-400">Carregando...</div>
                            </div>
                          </Card>
                        ))
                      ) : (
                        recentNews.slice(3, 6).map((news, index) => (
                          <Card key={news.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden group cursor-pointer" onClick={() => handleReadMore(news)}>
                             <div className="relative h-48">
                               <img 
                                 src={news.featuredImage} 
                                 alt={news.title}
                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                               />
                               <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                                 {news.category}
                               </div>
                               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                               <div className="absolute top-8 left-0 right-0 bottom-0 p-4">
                                 <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{news.title}</h3>
                                 <p className="text-gray-300 text-sm mb-2 line-clamp-2">{news.excerpt}</p>
                                 
                                 {/* Botão Ler mais posicionado no canto inferior direito */}
                                 <div className="absolute bottom-4 right-4">
                                   <Button 
                                     size="sm" 
                                     className="bg-primary text-black hover:bg-primary/80 text-xs transition-all duration-200 flex items-center gap-1.5"
                                     onClick={(e) => {
                                       e.stopPropagation();
                                       handleReadMore(news);
                                     }}
                                   >
                                     <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse"></div>
                                     Ler mais
                                   </Button>
                                 </div>
                               </div>
                             </div>
                             
                             {/* Seção cinza inferior com informações */}
                             <div className="bg-gray-800/50 p-3 border-t border-gray-700">
                               <div className="flex items-center gap-3">
                                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                                   <Clock className="w-3 h-3" />
                                   <span>{news.readingTime || '1'} min</span>
                                 </div>
                                 <div className="flex items-center gap-1 text-gray-400 text-xs">
                                   <Users className="w-3 h-3" />
                                   <span>{news.author || 'SAFEzone Admin'}</span>
                                 </div>
                               </div>
                             </div>
                           </Card>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
          </div>

          {/* Streams Adicionais - apenas se houver mais de uma stream */}
          {liveStreams.length > 1 && (
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white text-center flex-1">
                  Outras Streams Ao Vivo
                </h2>
                <button
                  onClick={checkStreamStatus}
                  disabled={isLoadingStreams}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                >
                  {isLoadingStreams ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Verificando...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Atualizar
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveStreams.slice(1).map((stream) => (
                  <a 
                    key={stream.id}
                    href={`https://www.twitch.tv/${stream.twitchChannel}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block cursor-pointer transform hover:scale-105 transition-all duration-300"
                  >
                    <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                      <div className="relative">
                         {stream.twitchChannel ? (
                           <div className="w-full relative">
                             <iframe
                                src={`https://player.twitch.tv/?channel=${stream.twitchChannel}&parent=localhost&autoplay=true&muted=true&controls=false`}
                                height="200"
                                width="100%"
                                allowFullScreen
                                className="w-full h-48 rounded-lg"
                              ></iframe>
                             <div className="absolute bottom-4 right-4">
                               <button 
                                 onClick={(e) => {
                                   e.preventDefault();
                                   window.open(`https://www.twitch.tv/${stream.twitchChannel}`, '_blank');
                                 }}
                                 className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                               >
                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                 </svg>
                                 Assistir
                               </button>
                             </div>
                           </div>
                         ) : (
                           <img 
                             src={stream.thumbnail} 
                             alt={`${stream.player} stream`}
                             className="w-full h-48 object-cover"
                           />
                         )}
                         <div className="absolute top-4 left-4 sz-live-indicator text-white px-3 py-1 rounded-full text-sm font-bold">
                            🔴 AO VIVO
                          </div>
                       </div>
                      <CardContent className="p-4">
                        <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent sz-text-gradient animate-pulse">
                          {stream.player}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                           <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                           <span className="text-red-400 font-semibold text-sm">TRANSMITINDO AO VIVO</span>
                         </div>
                        {stream.game && (
                          <div className="flex items-center gap-2">
                            <span className="text-gray-400 text-sm">Jogando:</span>
                            <span className="text-primary font-semibold text-sm">{stream.game}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-300 text-sm">{stream.viewers} viewers</span>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>



      {/* Próximas Partidas */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Próximas Partidas</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="bg-gray-900/50 border-gray-700 sz-card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">Safe Zone vs {match.opponent}</h3>
                      <p className="text-gray-400">{match.tournament}</p>
                    </div>
                    <div className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                      {match.game}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-300">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {match.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {match.time}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Estatísticas da Equipe */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Estatísticas da Temporada</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">12</div>
                <div className="text-gray-400">Vitórias</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">5</div>
                <div className="text-gray-400">Jogadores</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="text-gray-400">Taxa de Vitória</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">3</div>
                <div className="text-gray-400">Torneios</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stream Popup */}
      <StreamPopup
        featuredStreamer={featuredStreamer}
        liveStreams={liveStreams}
        isOpen={showStreamPopup}
        onClose={() => setShowStreamPopup(false)}
        onStreamChange={(stream) => setCurrentPopupStream(stream)}
      />

      {/* News Modal */}
      <NewsModal
        news={selectedNews}
        isOpen={showNewsModal}
        onClose={() => setShowNewsModal(false)}
      />
    </div>
  );
};

export default Home;

