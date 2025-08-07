import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getOnlineStreamers, subscribeToStreamers, processStreamerData, getFeaturedStreamer } from '../firebase/streamersService';

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

  // Verificar streams ao carregar o componente
  useEffect(() => {
    checkStreamStatus();
    
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

  const recentNews = [
    {
      id: 1,
      title: "Safe Zone conquista vitória épica no torneio regional",
      summary: "Equipe demonstra excelente coordenação em partida decisiva contra rivals tradicionais.",
      date: "2024-01-15",
      image: "/src/assets/search_images/BvYRHtryfcGU.png",
      category: "CS2"
    },
    {
      id: 2,
      title: "Novo jogador se junta ao roster principal",
      summary: "SZ_Lightning traz experiência internacional para fortalecer a equipe de Valorant.",
      date: "2024-01-12",
      image: "/src/assets/search_images/81uPdvvPCZKn.png",
      category: "Valorant"
    },
    {
      id: 3,
      title: "Calendário de treinos intensivos para próxima temporada",
      summary: "Preparação focada em estratégias avançadas e coordenação de equipe.",
      date: "2024-01-10",
      image: "/src/assets/search_images/vcCA7ugxuX5u.png",
      category: "Geral"
    },
    {
      id: 4,
      title: "Análise tática: Como a Safe Zone dominou o meta atual",
      summary: "Breakdown completo das estratégias que levaram a equipe ao topo do ranking.",
      date: "2024-01-08",
      image: "/src/assets/search_images/CHMA6ghxYIgZ.jpg",
      category: "CS2"
    },
    {
      id: 5,
      title: "Bootcamp internacional marca preparação para Major",
      summary: "Equipe viaja para Europa para treinar com os melhores times do mundo.",
      date: "2024-01-05",
      image: "/src/assets/search_images/y3F6G6k0zluy.jpg",
      category: "Torneios"
    }
  ];

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
      {/* Hero Section com Live Streams */}
      <section className="relative py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Área de Destaque - Stream Principal ou Notícias */}
          <div className="mb-8">
            {featuredStreamer ? (
              // Stream em Destaque
              <div className="relative">
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="sz-neon-text">AO VIVO AGORA</span>
                  </h1>
                  <p className="text-lg text-gray-300">
                    Stream em destaque da Safe Zone Esports
                  </p>
                </div>
                
                {/* Stream Principal */}
                 <div className="max-w-3xl mx-auto">
                   <a 
                     href={`https://www.twitch.tv/${featuredStreamer.twitchChannel}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                   >
                     <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                       <div className="relative">
                         {featuredStreamer.twitchChannel ? (
                           <div className="w-full relative">
                             <iframe
                               src={`https://player.twitch.tv/?channel=${featuredStreamer.twitchChannel}&parent=localhost&autoplay=true&muted=true&controls=false`}
                               height="280"
                               width="100%"
                               allowFullScreen
                               className="w-full h-70 rounded-lg"
                             ></iframe>
                             <div className="absolute bottom-4 right-4">
                               <button 
                                 onClick={(e) => {
                                   e.preventDefault();
                                   window.open(`https://www.twitch.tv/${featuredStreamer.twitchChannel}`, '_blank');
                                 }}
                                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                               >
                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                 </svg>
                                 Assistir no Twitch
                               </button>
                             </div>
                           </div>
                         ) : (
                           <img 
                             src={featuredStreamer.thumbnail} 
                             alt={`${featuredStreamer.player} stream`}
                             className="w-full h-70 object-cover"
                           />
                         )}
                         <div className="absolute top-4 left-4 sz-live-indicator text-white px-3 py-1 rounded-full text-sm font-bold">
                           🔴 AO VIVO
                         </div>
                       </div>
                       <CardContent className="p-4">
                         <div className="flex justify-between items-start">
                           <div>
                             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent sz-text-gradient mb-2">
                               {featuredStreamer.player}
                             </h2>
                             <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                               <span className="text-red-400 font-semibold text-sm">TRANSMITINDO AO VIVO</span>
                             </div>
                             {featuredStreamer.game && (
                               <div className="flex items-center gap-2 mb-2">
                                 <span className="text-gray-400 text-sm">Jogando:</span>
                                 <span className="text-primary font-semibold text-sm">{featuredStreamer.game}</span>
                               </div>
                             )}
                             <div className="flex items-center gap-2">
                               <Users className="w-4 h-4 text-gray-400" />
                               <span className="text-gray-300 text-sm">{featuredStreamer.viewers} viewers</span>
                             </div>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </a>
                 </div>
              </div>
            ) : liveStreams.length > 0 ? (
              // Stream Principal (quando não há featured mas há streams online)
              <div className="relative">
                <div className="text-center mb-8">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    <span className="sz-neon-text">AO VIVO AGORA</span>
                  </h1>
                  <p className="text-lg text-gray-300">
                    Stream em destaque da Safe Zone Esports
                  </p>
                </div>
                
                {/* Stream Principal */}
                 <div className="max-w-3xl mx-auto">
                   <a 
                     href={`https://www.twitch.tv/${liveStreams[0].twitchChannel}`}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="block cursor-pointer transform hover:scale-[1.02] transition-all duration-300"
                   >
                     <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                       <div className="relative">
                         {liveStreams[0].twitchChannel ? (
                           <div className="w-full relative">
                             <iframe
                               src={`https://player.twitch.tv/?channel=${liveStreams[0].twitchChannel}&parent=localhost&autoplay=true&muted=true&controls=false`}
                               height="280"
                               width="100%"
                               allowFullScreen
                               className="w-full h-70 rounded-lg"
                             ></iframe>
                             <div className="absolute bottom-4 right-4">
                               <button 
                                 onClick={(e) => {
                                   e.preventDefault();
                                   window.open(`https://www.twitch.tv/${liveStreams[0].twitchChannel}`, '_blank');
                                 }}
                                 className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                               >
                                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                                 </svg>
                                 Assistir no Twitch
                               </button>
                             </div>
                           </div>
                         ) : (
                           <img 
                             src={liveStreams[0].thumbnail} 
                             alt={`${liveStreams[0].player} stream`}
                             className="w-full h-70 object-cover"
                           />
                         )}
                         <div className="absolute top-4 left-4 sz-live-indicator text-white px-3 py-1 rounded-full text-sm font-bold">
                           🔴 AO VIVO
                         </div>
                       </div>
                       <CardContent className="p-4">
                         <div className="flex justify-between items-start">
                           <div>
                             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent sz-text-gradient mb-2">
                               {liveStreams[0].player}
                             </h2>
                             <div className="flex items-center gap-2 mb-2">
                               <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                               <span className="text-red-400 font-semibold text-sm">TRANSMITINDO AO VIVO</span>
                             </div>
                             {liveStreams[0].game && (
                               <div className="flex items-center gap-2 mb-2">
                                 <span className="text-gray-400 text-sm">Jogando:</span>
                                 <span className="text-primary font-semibold text-sm">{liveStreams[0].game}</span>
                               </div>
                             )}
                             <div className="flex items-center gap-2">
                               <Users className="w-4 h-4 text-gray-400" />
                               <span className="text-gray-300 text-sm">{liveStreams[0].viewers} viewers</span>
                             </div>
                           </div>
                         </div>
                       </CardContent>
                     </Card>
                   </a>
                 </div>
              </div>
            ) : (
              // Últimas Notícias em Destaque - Bento Grid Design
              <div className="relative">
                {/* Notícia Principal */}
                <div className="max-w-7xl mx-auto mb-8">
                  <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-80 group">
                    <div className="relative h-full">
                      <img 
                        src={recentNews[0].image} 
                        alt={recentNews[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-primary text-black px-3 py-1 rounded-full text-sm font-bold">
                        {recentNews[0].category}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-3 line-clamp-2">{recentNews[0].title}</h1>
                        <p className="text-gray-200 text-base mb-4 line-clamp-3">{recentNews[0].summary}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-300 text-sm">{recentNews[0].date}</span>
                          <Button className="bg-primary text-black hover:bg-primary/80">
                            Ler matéria completa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Grid de Notícias Secundárias - 3x2 */}
                <div className="max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Primeira Fileira - 3 Notícias */}
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-3">
                       {/* Primeira Notícia Secundária */}
                        <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[1].image} 
                            alt={recentNews[1].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            {recentNews[1].category}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{recentNews[1].title}</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">{recentNews[1].summary}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">{recentNews[1].date}</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Ler mais
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Segunda Notícia Secundária */}
                        <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[2].image} 
                            alt={recentNews[2].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            {recentNews[2].category}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{recentNews[2].title}</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">{recentNews[2].summary}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">{recentNews[2].date}</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Ler mais
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Terceira Notícia Secundária */}
                        <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[3].image} 
                            alt={recentNews[3].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            {recentNews[3].category}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{recentNews[3].title}</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">{recentNews[3].summary}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">{recentNews[3].date}</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Ler mais
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {/* Segunda Fileira - 3 Notícias */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:col-span-3">
                      {/* Quarta Notícia Secundária */}
                        <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[4].image} 
                            alt={recentNews[4].title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            {recentNews[4].category}
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{recentNews[4].title}</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">{recentNews[4].summary}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">{recentNews[4].date}</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Ler mais
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Quinta Notícia Secundária */}
                        <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[1].image} 
                            alt="Notícia adicional"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            Esports
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">Novidades em breve</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">Acompanhe as últimas atualizações do mundo dos esports.</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">2024-01-01</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Em breve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>

                      {/* Sexta Notícia */}
                       <Card className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden h-48 group">
                        <div className="relative h-full">
                          <img 
                            src={recentNews[0].image} 
                            alt="Notícia adicional"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                            Destaque
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <h3 className="text-base font-bold text-white mb-2 line-clamp-2">Mais notícias em breve</h3>
                            <p className="text-gray-300 text-sm mb-2 line-clamp-2">Fique ligado para mais atualizações da Safe Zone Esports.</p>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-xs">2024-01-01</span>
                              <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80 text-xs">
                                Em breve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            )}
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

      {/* Seção de Notícias Recentes */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-black/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Últimas Notícias</h2>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
              Ver Todas
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentNews.map((news) => (
              <Card key={news.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                <div className="relative">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                    {news.category}
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{news.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">{news.summary}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500">{news.date}</span>
                    <Button size="sm" variant="ghost" className="text-primary hover:text-primary/80">
                      Ler mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
    </div>
  );
};

export default Home;

