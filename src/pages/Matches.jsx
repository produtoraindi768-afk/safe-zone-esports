import React, { useState } from 'react';
import { Calendar, Clock, Trophy, Filter, Play, ExternalLink, Target, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Matches = () => {
  const [selectedGame, setSelectedGame] = useState('Todos');
  const [selectedTeam, setSelectedTeam] = useState('Todos');
  const [selectedTournament, setSelectedTournament] = useState('Todos');

  const games = ['Todos', 'CS2', 'Valorant', 'LoL'];
  const teams = ['Todos', 'Principal', 'Academy', 'Feminino'];
  const tournaments = ['Todos', 'Regional Championship', 'VCT Americas', 'CBLOL', 'ESL Pro League'];

  const matchHistory = [
    {
      id: 1,
      date: '2024-01-15',
      time: '19:00',
      opponent: 'Thunder Wolves',
      result: 'Vitória',
      score: '2-1',
      maps: ['Mirage (14-16)', 'Inferno (16-8)', 'Dust2 (16-12)'],
      tournament: 'Regional Championship',
      game: 'CS2',
      team: 'Principal',
      mvp: 'SZ_Phantom',
      vod: 'https://twitch.tv/safezone',
      status: 'finished'
    },
    {
      id: 2,
      date: '2024-01-12',
      time: '16:30',
      opponent: 'Cyber Eagles',
      result: 'Vitória',
      score: '2-0',
      maps: ['Bind (13-7)', 'Haven (13-9)'],
      tournament: 'VCT Americas',
      game: 'Valorant',
      team: 'Principal',
      mvp: 'SZ_Lightning',
      vod: 'https://twitch.tv/safezone',
      status: 'finished'
    },
    {
      id: 3,
      date: '2024-01-10',
      time: '20:00',
      opponent: 'Storm Riders',
      result: 'Derrota',
      score: '1-2',
      maps: ['Ascent (13-11)', 'Split (8-13)', 'Icebox (10-13)'],
      tournament: 'VCT Americas',
      game: 'Valorant',
      team: 'Principal',
      mvp: 'SZ_Viper',
      vod: 'https://twitch.tv/safezone',
      status: 'finished'
    },
    {
      id: 4,
      date: '2024-01-08',
      time: '18:00',
      opponent: 'Phoenix Gaming',
      result: 'Vitória',
      score: '16-12',
      maps: ['Cache'],
      tournament: 'ESL Pro League',
      game: 'CS2',
      team: 'Principal',
      mvp: 'SZ_Phantom',
      vod: 'https://twitch.tv/safezone',
      status: 'finished'
    },
    {
      id: 5,
      date: '2024-01-05',
      time: '15:00',
      opponent: 'Digital Wolves',
      result: 'Vitória',
      score: '2-1',
      maps: ['Summoner\'s Rift'],
      tournament: 'CBLOL',
      game: 'LoL',
      team: 'Principal',
      mvp: 'SZ_Carry',
      vod: 'https://twitch.tv/safezone',
      status: 'finished'
    }
  ];

  const upcomingMatches = [
    {
      id: 6,
      date: '2024-01-18',
      time: '19:00',
      opponent: 'Thunder Wolves',
      tournament: 'Regional Championship',
      game: 'CS2',
      team: 'Principal',
      status: 'upcoming'
    },
    {
      id: 7,
      date: '2024-01-20',
      time: '16:30',
      opponent: 'Cyber Eagles',
      tournament: 'VCT Qualifier',
      game: 'Valorant',
      team: 'Principal',
      status: 'upcoming'
    },
    {
      id: 8,
      date: '2024-01-22',
      time: '14:00',
      opponent: 'Nova Esports',
      tournament: 'CBLOL',
      game: 'LoL',
      team: 'Principal',
      status: 'upcoming'
    }
  ];

  const filteredMatches = matchHistory.filter(match => {
    const matchesGame = selectedGame === 'Todos' || match.game === selectedGame;
    const matchesTeam = selectedTeam === 'Todos' || match.team === selectedTeam;
    const matchesTournament = selectedTournament === 'Todos' || match.tournament === selectedTournament;
    return matchesGame && matchesTeam && matchesTournament;
  });

  const getResultColor = (result) => {
    switch (result) {
      case 'Vitória': return 'bg-green-600';
      case 'Derrota': return 'bg-red-600';
      case 'Empate': return 'bg-yellow-600';
      default: return 'bg-gray-600';
    }
  };

  const getGameIcon = (game) => {
    // Retorna ícones baseados no jogo
    return <Target className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Partidas</h1>
          <p className="text-gray-400 text-lg">
            Histórico completo de partidas e próximos confrontos da Safe Zone Esports
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Jogo</label>
                <div className="flex flex-wrap gap-2">
                  {games.map((game) => (
                    <Button
                      key={game}
                      variant={selectedGame === game ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedGame(game)}
                      className={selectedGame === game 
                        ? "bg-primary text-black hover:bg-primary/90" 
                        : "border-gray-600 text-gray-300 hover:border-primary hover:text-primary"
                      }
                    >
                      {game}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Time</label>
                <div className="flex flex-wrap gap-2">
                  {teams.map((team) => (
                    <Button
                      key={team}
                      variant={selectedTeam === team ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTeam(team)}
                      className={selectedTeam === team 
                        ? "bg-primary text-black hover:bg-primary/90" 
                        : "border-gray-600 text-gray-300 hover:border-primary hover:text-primary"
                      }
                    >
                      {team}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-300 mb-2">Torneio</label>
                <div className="flex flex-wrap gap-2">
                  {tournaments.slice(0, 3).map((tournament) => (
                    <Button
                      key={tournament}
                      variant={selectedTournament === tournament ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTournament(tournament)}
                      className={selectedTournament === tournament 
                        ? "bg-primary text-black hover:bg-primary/90" 
                        : "border-gray-600 text-gray-300 hover:border-primary hover:text-primary"
                      }
                    >
                      {tournament === 'Todos' ? tournament : tournament.split(' ')[0]}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Próximas Partidas */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Próximas Partidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="bg-gray-900/50 border-gray-700 sz-card-hover">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                      {getGameIcon(match.game)}
                      <Badge variant="outline" className="border-primary text-primary">
                        {match.game}
                      </Badge>
                    </div>
                    <Badge variant="secondary" className="bg-blue-600 text-white">
                      Próxima
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2">
                    Safe Zone vs {match.opponent}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">{match.tournament}</p>

                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {match.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {match.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Histórico de Partidas */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Histórico de Partidas</h2>
            <span className="text-gray-400">
              {filteredMatches.length} {filteredMatches.length === 1 ? 'partida' : 'partidas'}
            </span>
          </div>

          <div className="space-y-4">
            {filteredMatches.map((match) => (
              <Card key={match.id} className="bg-gray-900/50 border-gray-700 sz-card-hover">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Match Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          {getGameIcon(match.game)}
                          <Badge variant="outline" className="border-primary text-primary">
                            {match.game}
                          </Badge>
                        </div>
                        <Badge className={`${getResultColor(match.result)} text-white`}>
                          {match.result}
                        </Badge>
                        <span className="text-gray-400 text-sm">{match.tournament}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2">
                        Safe Zone vs {match.opponent}
                      </h3>

                      <div className="flex items-center space-x-6 text-sm text-gray-300 mb-3">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {match.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {match.time}
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {match.team}
                        </div>
                      </div>

                      {/* Maps */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-400 mb-1">Mapas:</p>
                        <div className="flex flex-wrap gap-2">
                          {match.maps.map((map, index) => (
                            <Badge key={index} variant="secondary" className="bg-gray-700 text-gray-300">
                              {map}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {match.mvp && (
                        <p className="text-sm text-gray-400">
                          <span className="text-primary font-semibold">MVP:</span> {match.mvp}
                        </p>
                      )}
                    </div>

                    {/* Score and Actions */}
                    <div className="flex flex-col items-end space-y-3">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-white mb-1">
                          {match.score}
                        </div>
                        <div className="text-sm text-gray-400">
                          Placar Final
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {match.vod && (
                          <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                            <Play className="h-4 w-4 mr-1" />
                            VOD
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="text-gray-400 hover:text-primary">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Statistics Summary */}
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
              <Target className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">3</div>
              <div className="text-gray-400">Derrotas</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <MapPin className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">85%</div>
              <div className="text-gray-400">Taxa de Vitória</div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900/50 border-gray-700 text-center">
            <CardContent className="p-6">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-white">15</div>
              <div className="text-gray-400">Partidas Jogadas</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Matches;

