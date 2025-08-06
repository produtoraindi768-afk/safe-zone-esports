import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, User, MessageSquare, Building, Twitter, Instagram, Youtube, Twitch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui seria implementada a lógica de envio do formulário
    console.log('Form submitted:', formData);
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: 'Email',
      content: 'contato@safezone.gg',
      description: 'Para parcerias e oportunidades'
    },
    {
      icon: <Phone className="h-6 w-6 text-primary" />,
      title: 'Telefone',
      content: '+55 (11) 99999-9999',
      description: 'Atendimento comercial'
    },
    {
      icon: <MapPin className="h-6 w-6 text-primary" />,
      title: 'Endereço',
      content: 'São Paulo, SP - Brasil',
      description: 'Gaming House & Escritório'
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Horário',
      content: 'Seg - Sex: 9h às 18h',
      description: 'Horário comercial'
    }
  ];

  const departments = [
    {
      title: 'Parcerias & Patrocínios',
      email: 'parcerias@safezone.gg',
      description: 'Para oportunidades de patrocínio e parcerias comerciais'
    },
    {
      title: 'Recursos Humanos',
      email: 'rh@safezone.gg',
      description: 'Oportunidades de carreira e recrutamento'
    },
    {
      title: 'Imprensa',
      email: 'imprensa@safezone.gg',
      description: 'Solicitações de mídia e entrevistas'
    },
    {
      title: 'Suporte Técnico',
      email: 'suporte@safezone.gg',
      description: 'Problemas técnicos e suporte geral'
    }
  ];

  const socialMedia = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      handle: '@SafeZoneEsports',
      url: '#',
      color: 'hover:text-blue-400'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="h-5 w-5" />,
      handle: '@safezoneesports',
      url: '#',
      color: 'hover:text-pink-400'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="h-5 w-5" />,
      handle: 'Safe Zone Esports',
      url: '#',
      color: 'hover:text-red-400'
    },
    {
      name: 'Twitch',
      icon: <Twitch className="h-5 w-5" />,
      handle: 'SafeZoneEsports',
      url: '#',
      color: 'hover:text-purple-400'
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Entre em Contato</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Estamos sempre prontos para conversar sobre parcerias, oportunidades de carreira 
            ou qualquer dúvida sobre a Safe Zone Esports.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="mr-3 h-6 w-6 text-primary" />
                  Envie uma Mensagem
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Nome Completo
                      </label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Seu nome"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="seu@email.com"
                        className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Assunto
                    </label>
                    <Input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Assunto da mensagem"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Mensagem
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Escreva sua mensagem aqui..."
                      rows={6}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary text-black hover:bg-primary/90 font-semibold"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Quick Contact */}
            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{info.title}</h3>
                      <p className="text-primary font-medium">{info.content}</p>
                      <p className="text-gray-400 text-sm">{info.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Social Media */}
            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardHeader>
                <CardTitle className="text-white">Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {socialMedia.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center space-x-3 text-gray-300 ${social.color} transition-colors`}
                    >
                      {social.icon}
                      <div>
                        <div className="font-medium">{social.name}</div>
                        <div className="text-sm text-gray-400">{social.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Departments */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Departamentos Específicos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 sz-card-hover">
                <CardContent className="p-6 text-center">
                  <Building className="h-8 w-8 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">{dept.title}</h3>
                  <p className="text-primary font-medium mb-3">{dept.email}</p>
                  <p className="text-gray-400 text-sm">{dept.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Como posso me candidatar para a equipe?
                </h3>
                <p className="text-gray-300">
                  Envie seu currículo e highlights para rh@safezone.gg. Incluímos informações sobre 
                  sua experiência competitiva, rank atual e disponibilidade.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Vocês oferecem oportunidades de estágio?
                </h3>
                <p className="text-gray-300">
                  Sim! Temos programas de estágio em diversas áreas como análise, marketing, 
                  produção de conteúdo e gestão. Entre em contato conosco.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Como funciona o processo de patrocínio?
                </h3>
                <p className="text-gray-300">
                  Para parcerias e patrocínios, envie sua proposta para parcerias@safezone.gg 
                  com detalhes sobre sua empresa e objetivos de marketing.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-700 sz-card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-3">
                  Posso visitar a Gaming House?
                </h3>
                <p className="text-gray-300">
                  Visitas são possíveis mediante agendamento prévio. Entre em contato conosco 
                  para agendar uma visita ou tour pelas nossas instalações.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 border-primary/20 sz-neon-glow">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Pronto para Fazer Parte da Safe Zone?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Seja como atleta, parceiro ou fã, há sempre espaço para você na nossa comunidade. 
                Vamos construir o futuro dos esports juntos!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-primary text-black hover:bg-primary/90">
                  <User className="mr-2 h-4 w-4" />
                  Candidatar-se à Equipe
                </Button>
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
                  <Building className="mr-2 h-4 w-4" />
                  Proposta de Parceria
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;

