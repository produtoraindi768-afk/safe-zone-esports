import React, { useState, useEffect } from 'react';
import { Play, Calendar, Clock, Trophy, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const [timeToNextMatch, setTimeToNextMatch] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });

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

  // Dados simulados
  const liveStreams = [
    {
      id: 1,
      player: "TREVINSZ",
      game: "FORTNITE",
      viewers: 1247,
      thumbnail: "/src/assets/search_images/CHMA6ghxYIgZ.jpg",
      isLive: true
    },
    {
      id: 2,
      player: "OKASCA",
      game: "FORTNITE",
      viewers: 892,
      thumbnail: "/src/assets/search_images/y3F6G6k0zluy.jpg",
      isLive: true
    }
  ];

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
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="sz-neon-text">SAFE ZONE</span>
              <br />
              <span className="text-white">ESPORTS</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dominando os cenários competitivos de CS2, Valorant e League of Legends
            </p>
          </div>

          {/* Live Streams em Destaque */}
          {liveStreams.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                🔴 AO VIVO AGORA
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveStreams.map((stream) => (
                  <Card key={stream.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                    <div className="relative">
                      <img 
                        src={stream.thumbnail} 
                        alt={`${stream.player} stream`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4 sz-live-indicator text-white px-3 py-1 rounded-full text-sm font-bold">
                        🔴 AO VIVO
                      </div>
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {stream.viewers} viewers
                      </div>
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Button className="bg-primary text-black hover:bg-primary/90">
                          <Play className="mr-2 h-4 w-4" />
                          Assistir
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-white">{stream.player}</h3>
                      <p className="text-gray-400">Jogando {stream.game}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Contagem Regressiva para Próxima Partida */}
          <div className="mb-16">
            <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-primary/20 sz-neon-glow">
              <CardContent className="p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">Próxima Partida</h2>
                <p className="text-gray-300 mb-6">Safe Zone vs Thunder Wolves - Regional Championship</p>
                <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                  <div className="text-center">
                    <div className="text-3xl font-bold sz-countdown">{timeToNextMatch.days}</div>
                    <div className="text-sm text-gray-400">Dias</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold sz-countdown">{timeToNextMatch.hours}</div>
                    <div className="text-sm text-gray-400">Horas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold sz-countdown">{timeToNextMatch.minutes}</div>
                    <div className="text-sm text-gray-400">Min</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold sz-countdown">{timeToNextMatch.seconds}</div>
                    <div className="text-sm text-gray-400">Seg</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

