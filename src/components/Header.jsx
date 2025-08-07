import React, { useState } from 'react';
import { Menu, X, Gamepad2, Trophy, Users, Info, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
            <div className="w-10 h-10 rounded-lg flex items-center justify-center sz-neon-glow">
              <img src="/logo sz.svg" alt="Safe Zone Logo" className="w-8 h-8" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold sz-neon-text">Safe Zone</h1>
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

      {/* Floating Match Widget - Below Header */}
      <div className="fixed top-16 right-8 z-40 mt-4">
        <div className="bg-gray-900/95 border border-gray-700 rounded-md px-3 py-2 backdrop-blur-md shadow-lg animate-pulse-slow sz-popup-hover cursor-pointer">
          <div className="flex items-center space-x-2 text-xs mb-1">
            <div className="text-gray-400">Hoje, 12:00</div>
            <div className="text-orange-400 font-semibold">MD3</div>
            <div className="text-gray-400">•</div>
            <div className="text-gray-400">VCT 2025</div>
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">⚡</span>
              </div>
              <span className="text-white text-xs font-medium">Gentle Mates</span>
              <span className="text-primary font-bold text-sm">0</span>
            </div>
            <div className="text-primary font-bold text-sm px-1">VS</div>
            <div className="flex items-center space-x-2">
              <span className="text-primary font-bold text-sm">0</span>
              <span className="text-white text-xs font-medium">GIANTX</span>
              <div className="w-4 h-4 bg-gradient-to-br from-orange-500 to-red-600 rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
    </header>
  );
};

export default Header;

