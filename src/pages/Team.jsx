import React, { useState } from 'react';
import { Twitter, Instagram, Twitch, Youtube, MapPin, Trophy, Target, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Team = () => {
  const [selectedTeam, setSelectedTeam] = useState('Principal');

  const teams = ['Principal', 'Academy', 'Feminino', 'Staff'];

  const teamMembers = {
    Principal: [
      {
        id: 1,
        nickname: 'SZ_Phantom',
        realName: 'João Silva',
        role: 'AWPer',
        game: 'CS2',
        age: 22,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/5kEh4FUWOhOa.jpg',
        isLive: true,
        socialMedia: {
          twitter: '@sz_phantom',
          instagram: '@phantom_cs',
          twitch: 'sz_phantom',
          youtube: 'PhantomCS'
        },
        stats: {
          rating: 1.24,
          kd: 1.18,
          adr: 82.5
        },
        achievements: ['Regional Champion 2024', 'ESL Pro League Qualifier'],
        bio: 'AWPer principal da Safe Zone com experiência em torneios nacionais e internacionais.'
      },
      {
        id: 2,
        nickname: 'SZ_Lightning',
        realName: 'Pedro Santos',
        role: 'Duelist',
        game: 'Valorant',
        age: 19,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/y3F6G6k0zluy.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@sz_lightning',
          instagram: '@lightning_val',
          twitch: 'sz_lightning',
          youtube: 'LightningVAL'
        },
        stats: {
          rating: 1.31,
          kd: 1.45,
          adr: 165.2
        },
        achievements: ['VCT Americas Qualifier', 'Regional MVP 2024'],
        bio: 'Duelista agressivo com excelente aim e posicionamento tático.'
      },
      {
        id: 3,
        nickname: 'SZ_Viper',
        realName: 'Maria Costa',
        role: 'Controller',
        game: 'Valorant',
        age: 21,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/qZpgCtBJuP69.png',
        isLive: true,
        socialMedia: {
          twitter: '@sz_viper',
          instagram: '@viper_val',
          twitch: 'sz_viper',
          youtube: 'ViperVAL'
        },
        stats: {
          rating: 1.15,
          kd: 1.02,
          adr: 142.8
        },
        achievements: ['Best Controller BR 2024', 'VCT Americas'],
        bio: 'Controladora estratégica especializada em smokes e utilitários.'
      },
      {
        id: 4,
        nickname: 'SZ_Carry',
        realName: 'Lucas Oliveira',
        role: 'ADC',
        game: 'LoL',
        age: 20,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/CHMA6ghxYIgZ.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@sz_carry',
          instagram: '@carry_lol',
          twitch: 'sz_carry',
          youtube: 'CarryLoL'
        },
        stats: {
          rating: 8.2,
          kd: 3.1,
          adr: 612.5
        },
        achievements: ['CBLOL Champion 2024', 'Worlds Qualifier'],
        bio: 'ADC com mecânicas excepcionais e excelente farm.'
      },
      {
        id: 5,
        nickname: 'SZ_Support',
        realName: 'Ana Rodrigues',
        role: 'Support',
        game: 'LoL',
        age: 23,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/5kEh4FUWOhOa.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@sz_support',
          instagram: '@support_lol',
          twitch: 'sz_support',
          youtube: 'SupportLoL'
        },
        stats: {
          rating: 7.8,
          kd: 1.8,
          adr: 245.3
        },
        achievements: ['Best Support CBLOL 2024', 'MVP Finals'],
        bio: 'Support com excelente visão de jogo e shotcalling.'
      }
    ],
    Academy: [
      {
        id: 6,
        nickname: 'SZ_Rising',
        realName: 'Carlos Mendes',
        role: 'Rifler',
        game: 'CS2',
        age: 18,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/y3F6G6k0zluy.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@sz_rising',
          twitch: 'sz_rising'
        },
        stats: {
          rating: 1.08,
          kd: 1.12,
          adr: 75.2
        },
        achievements: ['Academy Champion 2024'],
        bio: 'Jovem talento em desenvolvimento na academia da Safe Zone.'
      }
    ],
    Feminino: [
      {
        id: 7,
        nickname: 'SZ_Queen',
        realName: 'Sofia Almeida',
        role: 'IGL',
        game: 'Valorant',
        age: 22,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/qZpgCtBJuP69.png',
        isLive: false,
        socialMedia: {
          twitter: '@sz_queen',
          twitch: 'sz_queen'
        },
        stats: {
          rating: 1.19,
          kd: 1.25,
          adr: 158.7
        },
        achievements: ['Game Changers Champion 2024'],
        bio: 'Líder da equipe feminina com excelente capacidade de liderança.'
      }
    ],
    Staff: [
      {
        id: 8,
        nickname: 'Coach_Tactical',
        realName: 'Roberto Lima',
        role: 'Head Coach',
        game: 'Multi',
        age: 35,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/CHMA6ghxYIgZ.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@coach_tactical'
        },
        stats: null,
        achievements: ['Coach of the Year 2024', '5x Regional Champion'],
        bio: 'Técnico principal com mais de 10 anos de experiência em esports.'
      },
      {
        id: 9,
        nickname: 'Analyst_Pro',
        realName: 'Fernanda Costa',
        role: 'Analista',
        game: 'Multi',
        age: 28,
        nationality: 'Brasil',
        photo: '/src/assets/search_images/5kEh4FUWOhOa.jpg',
        isLive: false,
        socialMedia: {
          twitter: '@analyst_pro'
        },
        stats: null,
        achievements: ['Best Analyst BR 2024'],
        bio: 'Analista especializada em estratégias e estudo de adversários.'
      }
    ]
  };

  const currentTeamMembers = teamMembers[selectedTeam] || [];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Nossa Equipe</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conheça os atletas e profissionais que fazem da Safe Zone uma das principais organizações de esports do Brasil
          </p>
        </div>

        {/* Team Selector */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2 bg-gray-900/50 p-2 rounded-lg">
              {teams.map((team) => (
                <Button
                  key={team}
                  variant={selectedTeam === team ? "default" : "ghost"}
                  onClick={() => setSelectedTeam(team)}
                  className={selectedTeam === team 
                    ? "bg-primary text-black hover:bg-primary/90" 
                    : "text-gray-300 hover:text-primary hover:bg-gray-800"
                  }
                >
                  <Users className="mr-2 h-4 w-4" />
                  {team}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentTeamMembers.map((member) => (
            <Card key={member.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
              {/* Profile Header */}
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-gray-800 to-gray-700"></div>
                <div className="absolute -bottom-12 left-6">
                  <div className="relative">
                    <img 
                      src={member.photo} 
                      alt={member.nickname}
                      className="w-24 h-24 rounded-full border-4 border-gray-900 object-cover"
                    />
                    {member.isLive && (
                      <div className="absolute -top-1 -right-1 sz-live-indicator text-white px-2 py-1 rounded-full text-xs font-bold">
                        🔴 LIVE
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <CardContent className="pt-16 p-6">
                {/* Basic Info */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{member.nickname}</h3>
                  <p className="text-gray-400 text-sm mb-2">{member.realName}</p>
                  
                  <div className="flex items-center space-x-4 mb-3">
                    <Badge variant="outline" className="border-primary text-primary">
                      {member.role}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-700 text-gray-300">
                      {member.game}
                    </Badge>
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {member.nationality}
                    </div>
                    <span>{member.age} anos</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {member.bio}
                </p>

                {/* Stats */}
                {member.stats && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Estatísticas</h4>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-gray-800 rounded p-2">
                        <div className="text-primary font-bold">{member.stats.rating}</div>
                        <div className="text-xs text-gray-400">Rating</div>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <div className="text-primary font-bold">{member.stats.kd}</div>
                        <div className="text-xs text-gray-400">K/D</div>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <div className="text-primary font-bold">{member.stats.adr}</div>
                        <div className="text-xs text-gray-400">ADR</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Achievements */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-white mb-2">Conquistas</h4>
                  <div className="space-y-1">
                    {member.achievements.slice(0, 2).map((achievement, index) => (
                      <div key={index} className="flex items-center text-xs text-gray-400">
                        <Trophy className="h-3 w-3 mr-2 text-yellow-500" />
                        {achievement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    {member.socialMedia.twitter && (
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-blue-400 transition-colors">
                        <Twitter size={14} />
                      </a>
                    )}
                    {member.socialMedia.instagram && (
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-400 transition-colors">
                        <Instagram size={14} />
                      </a>
                    )}
                    {member.socialMedia.twitch && (
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-purple-400 transition-colors">
                        <Twitch size={14} />
                      </a>
                    )}
                    {member.socialMedia.youtube && (
                      <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-red-400 transition-colors">
                        <Youtube size={14} />
                      </a>
                    )}
                  </div>
                  
                  {member.isLive && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white">
                      <Twitch className="mr-1 h-3 w-3" />
                      Assistir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Estatísticas da Equipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">{currentTeamMembers.length}</div>
                <div className="text-gray-400">Membros</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">15</div>
                <div className="text-gray-400">Títulos</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">85%</div>
                <div className="text-gray-400">Taxa de Vitória</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gray-900/50 border-gray-700 text-center">
              <CardContent className="p-6">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white">1.24</div>
                <div className="text-gray-400">Rating Médio</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-primary/20 sz-neon-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Quer fazer parte da Safe Zone?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Estamos sempre em busca de novos talentos. Se você tem o que é preciso para competir no mais alto nível, entre em contato conosco.
              </p>
              <Button className="bg-primary text-black hover:bg-primary/90">
                Candidatar-se
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Team;

