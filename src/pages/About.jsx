import React from 'react';
import { Trophy, Users, Target, Heart, Award, Calendar, MapPin, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const milestones = [
    {
      year: '2020',
      title: 'Fundação da Safe Zone',
      description: 'Criação da organização com foco em CS:GO e Valorant'
    },
    {
      year: '2021',
      title: 'Primeiro Título Regional',
      description: 'Conquista do Regional Championship de CS:GO'
    },
    {
      year: '2022',
      title: 'Expansão para LoL',
      description: 'Entrada no cenário competitivo de League of Legends'
    },
    {
      year: '2023',
      title: 'Equipe Feminina',
      description: 'Criação da divisão feminina de Valorant'
    },
    {
      year: '2024',
      title: 'Múltiplos Títulos',
      description: 'Ano de maior sucesso com títulos em todos os jogos'
    }
  ];

  const values = [
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: 'Excelência',
      description: 'Buscamos sempre o mais alto nível de performance em tudo que fazemos.'
    },
    {
      icon: <Users className="h-8 w-8 text-blue-500" />,
      title: 'Trabalho em Equipe',
      description: 'Acreditamos que juntos somos mais fortes e alcançamos resultados extraordinários.'
    },
    {
      icon: <Target className="h-8 w-8 text-green-500" />,
      title: 'Foco',
      description: 'Mantemos o foco nos nossos objetivos e na melhoria contínua.'
    },
    {
      icon: <Heart className="h-8 w-8 text-red-500" />,
      title: 'Paixão',
      description: 'Nossa paixão pelos esports é o que nos move a superar todos os desafios.'
    }
  ];

  const achievements = [
    { title: 'Regional Championships', count: '8x' },
    { title: 'International Tournaments', count: '3x' },
    { title: 'MVP Awards', count: '12x' },
    { title: 'Years of Excellence', count: '4+' }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Sobre a Safe Zone</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Somos uma organização de esports brasileira dedicada a formar os melhores atletas 
            e competir nos mais altos níveis dos principais jogos competitivos do mundo.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="mr-3 h-6 w-6 text-primary" />
                Nossa Missão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Desenvolver talentos excepcionais nos esports, proporcionando estrutura profissional, 
                treinamento de alto nível e oportunidades para que nossos atletas alcancem seus sonhos 
                e representem o Brasil nos maiores palcos competitivos do mundo.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="mr-3 h-6 w-6 text-primary" />
                Nossa Visão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 leading-relaxed">
                Ser reconhecida como a principal organização de esports da América Latina, 
                sendo referência em excelência competitiva, desenvolvimento de atletas e 
                inovação no cenário dos esports brasileiros.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nossos Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 sz-card-hover text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nossa Jornada</h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
                      <CardContent className="p-6">
                        <Badge className="bg-primary text-black mb-3">{milestone.year}</Badge>
                        <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-gray-900"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Conquistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 sz-card-hover text-center">
                <CardContent className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">{achievement.count}</div>
                  <div className="text-gray-300">{achievement.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Structure */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Estrutura Organizacional</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Users className="mr-3 h-6 w-6 text-primary" />
                  Equipes Competitivas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Time Principal (CS2, Valorant, LoL)</li>
                  <li>• Academia (Desenvolvimento)</li>
                  <li>• Equipe Feminina (Valorant)</li>
                  <li>• Streamers e Criadores</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Award className="mr-3 h-6 w-6 text-primary" />
                  Equipe Técnica
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Head Coach</li>
                  <li>• Analistas Especializados</li>
                  <li>• Psicólogo Esportivo</li>
                  <li>• Preparador Físico</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="mr-3 h-6 w-6 text-primary" />
                  Infraestrutura
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-300">
                  <li>• Gaming House Profissional</li>
                  <li>• Estúdio de Streaming</li>
                  <li>• Sala de Análise Tática</li>
                  <li>• Área de Descanso</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-primary/20 sz-neon-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Junte-se à Nossa Jornada</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Seja parte da Safe Zone Esports. Entre em contato conosco para parcerias, 
                oportunidades de carreira ou para saber mais sobre nossa organização.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contato" 
                  className="bg-primary text-black px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Entre em Contato
                </a>
                <a 
                  href="/equipe" 
                  className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary hover:text-black transition-colors"
                >
                  Conheça Nossa Equipe
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;

