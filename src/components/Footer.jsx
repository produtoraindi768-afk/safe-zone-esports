import React from 'react';
import { Twitter, Instagram, Youtube, Twitch, MessageCircle } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'Twitch', icon: Twitch, href: '#' },
    { name: 'Discord', icon: MessageCircle, href: '#' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center sz-neon-glow">
                <img src="/logo sz.svg" alt="Safe Zone Logo" className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold sz-neon-text">Safe Zone</h3>
                <p className="text-sm" style={{color: 'var(--muted-foreground)'}}>ESPORTS</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Equipe profissional de esports competindo nos principais torneios de CS2, Valorant e League of Legends. 
              Junte-se à nossa comunidade e acompanhe nossa jornada rumo ao topo.
            </p>
            
            {/* Redes Sociais */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-primary hover:bg-gray-700 transition-all duration-200 sz-card-hover"
                    aria-label={social.name}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-primary transition-colors">Início</a></li>
              <li><a href="/noticias" className="text-gray-400 hover:text-primary transition-colors">Notícias</a></li>
              <li><a href="/partidas" className="text-gray-400 hover:text-primary transition-colors">Partidas</a></li>
              <li><a href="/equipe" className="text-gray-400 hover:text-primary transition-colors">Equipe</a></li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Informações</h4>
            <ul className="space-y-2">
              <li><a href="/sobre" className="text-gray-400 hover:text-primary transition-colors">Sobre Nós</a></li>
              <li><a href="/contato" className="text-gray-400 hover:text-primary transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Parcerias</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Imprensa</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Safe Zone Esports. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

