import React, { useState, useEffect } from 'react';
import { Menu, X, Gamepad2, Trophy, Users, Info, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { getFeaturedStreamer, processStreamerData } from '../firebase/streamersService';
import { getFeaturedMatches, processMatchData, formatMatchDateTime } from '../firebase/matchesService';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [featuredStreamer, setFeaturedStreamer] = useState(null);
  const [featuredMatches, setFeaturedMatches] = useState([]);
  const location = useLocation();

  // Carregar dados do streamer e partida em destaque para exibir o widget
  useEffect(() => {
    const loadFeaturedStreamer = async () => {
      try {
        const featured = await getFeaturedStreamer();
        if (featured) {
          setFeaturedStreamer(processStreamerData(featured));
        }
      } catch (error) {
        console.error('Erro ao carregar streamer em destaque:', error);
      }
    };

    const loadFeaturedMatches = async () => {
      try {
        const matches = await getFeaturedMatches();
        if (matches && matches.length > 0) {
          const processedMatches = matches.map(match => processMatchData(match)).filter(Boolean);
          setFeaturedMatches(processedMatches);
        } else {
          setFeaturedMatches([]);
        }
      } catch (error) {
        console.error('Erro ao carregar dados em destaque:', error);
        // Não mostrar card se não houver partidas em destaque
        setFeaturedMatches([]);
      }
    };

    loadFeaturedStreamer();
    loadFeaturedMatches();
  }, []);

  // Função para lidar com o clique no botão "Ver Ao Vivo"
  const handleVerAoVivoClick = () => {
    if (location.pathname !== '/') {
      // Redirecionar para a página inicial onde o StreamPopup é gerenciado
      window.location.href = '/';
    } else {
      // Se já estiver na página inicial, disparar evento para controlar o popup
      const event = new CustomEvent('streamPopupToggle', { detail: 'toggle' });
      window.dispatchEvent(event);
    }
  };

  const navigation = [
    { name: 'Início', href: '/', icon: Gamepad2 },
    { name: 'Notícias', href: '/noticias', icon: Trophy },
    { name: 'Partidas', href: '/partidas', icon: Trophy },
    { name: 'Equipe', href: '/equipe', icon: Users },
    { name: 'Sobre', href: '/sobre', icon: Info },
    { name: 'Contato', href: '/contato', icon: Mail },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 sz-gradient-bg backdrop-blur-md border-b" style={{borderColor: 'var(--border)'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center">
              <img src="/logo sz.svg" alt="Safe Zone Logo" className="w-8 h-8" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold sz-neon-text">Sᴀꜰᴇ Zᴏɴᴇ</h1>
              <p className="text-xs -mt-1" style={{color: 'var(--muted-foreground)'}}>ESPORTS</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'sz-neon-text sz-neon-glow'
                      : 'hover:sz-neon-text'
                  }`}
                  style={{
                    color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)',
                    backgroundColor: isActive(item.href) ? 'var(--primary)/10' : 'transparent'
                  }}
                >
                  <Icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="hover:sz-neon-text p-2 transition-colors"
              style={{color: 'var(--muted-foreground)'}}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Widgets - Below Header */}
      {/* Exibir apenas quando há partidas em destaque */}
      {featuredMatches.length > 0 && (
        <div className="fixed top-16 right-8 z-40 mt-4 space-y-2">
          {/* Match Widgets - Partidas em Destaque */}
          {featuredMatches.map((featuredMatch, index) => (
            <div key={index} className="bg-gray-900/95 border border-gray-700 rounded-md px-3 py-2 backdrop-blur-md shadow-lg animate-pulse-slow sz-popup-hover cursor-pointer">
              <div className="flex items-center space-x-2 text-xs mb-1">
                <div className="text-gray-400">{formatMatchDateTime(featuredMatch.date, featuredMatch.time)}</div>
                <div className="text-orange-400 font-semibold">{featuredMatch.format}</div>
                <div className="text-gray-400">•</div>
                <div className="text-gray-400">{featuredMatch.tournament}</div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                 <div className="flex items-center space-x-2">
                   {featuredMatch.teams.home.avatar ? (
                     <img 
                       src={featuredMatch.teams.home.avatar} 
                       alt={featuredMatch.teams.home.name}
                       className="w-4 h-4 rounded-sm object-cover"
                     />
                   ) : (
                     <div className={`w-4 h-4 bg-gradient-to-br ${featuredMatch.teams.home.color} rounded-sm flex items-center justify-center`}>
                       <span className="text-white text-xs font-bold">{featuredMatch.teams.home.logo}</span>
                     </div>
                   )}
                   <span className="text-white text-xs font-medium">{featuredMatch.teams.home.name}</span>
                    <span className={`font-bold text-sm ${
                      featuredMatch.teams.home.score > featuredMatch.teams.away.score 
                        ? 'text-green-400' 
                        : featuredMatch.teams.home.score < featuredMatch.teams.away.score 
                          ? 'text-red-400' 
                          : 'text-yellow-400'
                    }`}>{featuredMatch.teams.home.score}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    {/* Score MD3/MD5 elevado */}
                    <div className="text-xs text-gray-300 mb-1 font-medium">
                      {featuredMatch.format === 'MD5' && featuredMatch.resultMD5 ? (
                        <span>{featuredMatch.resultMD5.team1Score} - {featuredMatch.resultMD5.team2Score}</span>
                      ) : featuredMatch.format === 'MD3' && featuredMatch.resultMD3 ? (
                        <span>{featuredMatch.resultMD3.team1Score} - {featuredMatch.resultMD3.team2Score}</span>
                      ) : featuredMatch.team1ScoreMD3 !== undefined && featuredMatch.team2ScoreMD3 !== undefined ? (
                        <span>{featuredMatch.team1ScoreMD3} - {featuredMatch.team2ScoreMD3}</span>
                      ) : null}
                    </div>
                    <span className="text-gray-400 text-xs font-medium">VS</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`font-bold text-sm ${
                      featuredMatch.teams.away.score > featuredMatch.teams.home.score 
                        ? 'text-green-400' 
                        : featuredMatch.teams.away.score < featuredMatch.teams.home.score 
                          ? 'text-red-400' 
                          : 'text-yellow-400'
                    }`}>{featuredMatch.teams.away.score}</span>
                   <span className="text-white text-xs font-medium">{featuredMatch.teams.away.name}</span>
                   {featuredMatch.teams.away.avatar ? (
                     <img 
                       src={featuredMatch.teams.away.avatar} 
                       alt={featuredMatch.teams.away.name}
                       className="w-4 h-4 rounded-sm object-cover"
                     />
                   ) : (
                     <div className={`w-4 h-4 bg-gradient-to-br ${featuredMatch.teams.away.color} rounded-sm flex items-center justify-center`}>
                       <span className="text-white text-xs font-bold">{featuredMatch.teams.away.logo}</span>
                     </div>
                   )}
                 </div>
               </div>
            </div>
          ))}
          
          {/* Botão Ver Ao Vivo */}
           <div className="flex justify-center mt-2">
             <button 
               onClick={handleVerAoVivoClick}
               className="bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white px-3 py-1.5 rounded text-xs font-medium transition-all duration-200 flex items-center justify-center gap-1.5 border border-gray-600/30 hover:border-gray-500/50"
             >
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></div>
               Ver Ao Vivo
             </button>
           </div>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sz-gradient-bg border-t" style={{borderColor: 'var(--border)'}}>
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-all duration-200 ${
                    isActive(item.href)
                      ? 'sz-neon-text sz-neon-glow'
                      : 'hover:sz-neon-text'
                  }`}
                  style={{
                    color: isActive(item.href) ? 'var(--primary)' : 'var(--muted-foreground)',
                    backgroundColor: isActive(item.href) ? 'var(--primary)/10' : 'transparent'
                  }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Stream Popup removido - gerenciado pelo Home.jsx */}
    </header>
  );
};

export default Header;

