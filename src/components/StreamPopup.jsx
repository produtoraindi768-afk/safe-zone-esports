import React, { useState, useRef, useEffect } from 'react';
import { X, ExternalLink, Minimize2, Maximize2, Move, Users, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StreamPopup = ({ 
  featuredStreamer, 
  liveStreams, 
  isOpen, 
  onClose, 
  onStreamChange 
}) => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [currentStreamIndex, setCurrentStreamIndex] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const popupRef = useRef(null);

  // Filtrar apenas streams marcadas como destaque no banco de dados
  const featuredStreams = liveStreams.filter(stream => {
    return stream.isFeatured === true;
  });
  
  // Combinar featuredStreamer com outras streams em destaque, evitando duplicação
  const allFeaturedStreams = [];
  
  // Adicionar featuredStreamer primeiro se existir
  if (featuredStreamer) {
    allFeaturedStreams.push(featuredStreamer);
  }
  
  // Adicionar outras streams em destaque que não sejam o featuredStreamer
  featuredStreams.forEach(stream => {
    if (!featuredStreamer || stream.id !== featuredStreamer.id) {
      allFeaturedStreams.push(stream);
    }
  });
  
  const allStreams = allFeaturedStreams;
  const currentStream = allStreams[currentStreamIndex];

  // Garantir que sempre comece com a stream em destaque quando o popup abrir
  useEffect(() => {
    if (isOpen && featuredStreamer) {
      setCurrentStreamIndex(0); // Sempre começar com a stream em destaque (índice 0)
    }
  }, [isOpen, featuredStreamer]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // Limitar movimento dentro da viewport com margem
      const margin = 10;
      const popupWidth = isMinimized ? 300 : 450;
      const popupHeight = isMinimized ? 60 : 350;
      const maxX = window.innerWidth - popupWidth - margin;
      const maxY = window.innerHeight - popupHeight - margin;
      
      setPosition({
        x: Math.max(margin, Math.min(newX, maxX)),
        y: Math.max(margin, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };

    if (isDragging) {
      document.body.style.cursor = 'grabbing';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
      document.body.style.userSelect = 'auto';
    };
  }, [isDragging, dragOffset, isMinimized]);

  const handleMouseDown = (e) => {
    // Evitar arrastar quando clicar em botões ou elementos interativos
    const isButton = e.target.closest('button') || 
                    e.target.tagName === 'BUTTON' ||
                    e.target.closest('[role="button"]');
    
    const isInteractiveElement = e.target.closest('iframe') ||
                                e.target.closest('svg') ||
                                e.target.tagName === 'SVG' ||
                                e.target.closest('.pointer-events-auto button');
    
    // Verificar se o clique foi em um dos botões específicos (fechar ou abrir Twitch)
    const isControlButton = e.target.closest('[title="Fechar popup"]') ||
                           e.target.closest('[title="Abrir no Twitch"]');
    
    if (isButton || isInteractiveElement || isControlButton) {
      return; // Não prevenir o evento, apenas não iniciar o arraste
    }
    
    setIsDragging(true);
    const rect = popupRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const nextStream = () => {
    const newIndex = (currentStreamIndex + 1) % allStreams.length;
    setCurrentStreamIndex(newIndex);
    onStreamChange?.(allStreams[newIndex]);
  };

  const prevStream = () => {
    const newIndex = currentStreamIndex === 0 ? allStreams.length - 1 : currentStreamIndex - 1;
    setCurrentStreamIndex(newIndex);
    onStreamChange?.(allStreams[newIndex]);
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isOpen || !currentStream) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div
        ref={popupRef}
        className={`absolute pointer-events-auto transition-all duration-300 ease-out cursor-grab ${
          isDragging ? 'scale-105 shadow-2xl cursor-grabbing' : 'scale-100'
        } ${
          isHovering ? 'shadow-purple-500/20' : ''
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isMinimized ? '320px' : '520px',
          height: isMinimized ? '60px' : '420px',
          transform: `scale(${isDragging ? 1.02 : 1})`,
          transition: isDragging ? 'none' : 'all 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Card className={`bg-gradient-to-br from-gray-900/95 via-gray-800/90 to-gray-900/95 border-2 backdrop-blur-xl h-full transition-all duration-500 ${
          isDragging ? 'border-purple-400 shadow-2xl shadow-purple-500/40 cursor-grabbing ring-2 ring-purple-500/30' : 
          isHovering ? 'border-cyan-400/60 shadow-2xl shadow-cyan-500/20 cursor-grab ring-1 ring-cyan-400/20' : 'border-gray-600/50 shadow-xl shadow-black/50 cursor-grab'
        } rounded-2xl overflow-hidden`}>
          {/* Header */}
          <div 
            className={`bg-gradient-to-r from-slate-800/95 via-gray-800/90 to-slate-700/95 px-6 py-4 flex items-center justify-between border-b transition-all duration-300 backdrop-blur-md ${
              isDragging ? 'bg-gradient-to-r from-purple-800/90 via-purple-700/85 to-indigo-800/90 border-purple-400/60 shadow-lg shadow-purple-500/25' : 
              isHovering ? 'bg-gradient-to-r from-cyan-800/80 via-slate-800/85 to-cyan-700/80 border-cyan-400/40' : 'border-gray-500/30'
            } relative overflow-hidden`}
          >
            {/* Efeito de brilho animado */}
            <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform transition-transform duration-1000 ${
              isHovering ? 'translate-x-full' : '-translate-x-full'
            }`}></div>
            <div className="flex items-center gap-4 relative z-10 flex-1">
              {/* Indicador de arraste com efeito neon */}
              <div className="p-1 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm">
                <Move className={`w-4 h-4 cursor-grab transition-all duration-300 ${
                  isDragging ? 'text-purple-300 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 
                  isHovering ? 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]' : 'text-gray-300'
                }`} />
              </div>
              
              {/* Título com efeito glassmorphism */}
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 border border-white/10 backdrop-blur-sm">
                  <Users className="w-5 h-5 text-purple-300 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                </div>
                <h2 className="text-white font-bold text-base bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
                  Streams Ao Vivo
                </h2>
                <div className="relative">
                  <span className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-white/20 backdrop-blur-sm">
                    {allStreams.length}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                </div>
                {/* Badge de destaque sempre visível para todas as streams */}
                <div className="relative">
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-2 py-1 rounded-full text-xs font-bold shadow-lg border border-yellow-300/30 backdrop-blur-sm">
                    ⭐ DESTAQUE
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full blur-sm opacity-40 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 relative z-50">
              {/* Controles modernizados */}
              <div className="flex items-center gap-3 relative z-50 pointer-events-auto">
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const twitchChannel = currentStream?.twitchChannel || currentStream?.name?.toLowerCase();
                      if (twitchChannel) {
                        const url = `https://www.twitch.tv/${twitchChannel}`;
                        window.open(url, '_blank', 'noopener,noreferrer');
                      }
                    }}
                    className="text-purple-300 hover:text-white bg-white/5 hover:bg-purple-500/30 border border-white/10 hover:border-purple-400/50 transition-all duration-300 backdrop-blur-sm rounded-xl p-2.5 shadow-lg hover:shadow-purple-500/25 pointer-events-auto relative z-50 cursor-pointer"
                    title="Abrir no Twitch"
                  >
                    <ExternalLink className="w-4 h-4 drop-shadow-[0_0_4px_rgba(168,85,247,0.6)]" />
                  </Button>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                </div>
                
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (typeof onClose === 'function') {
                        onClose();
                      }
                    }}
                    className="text-gray-300 hover:text-white bg-white/5 hover:bg-red-500/30 border border-white/10 hover:border-red-400/50 transition-all duration-300 backdrop-blur-sm rounded-xl p-2.5 shadow-lg hover:shadow-red-500/25 pointer-events-auto relative z-50 cursor-pointer"
                    title="Fechar popup"
                  >
                    <X className="w-4 h-4 drop-shadow-[0_0_4px_rgba(239,68,68,0.6)]" />
                  </Button>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur-sm opacity-0 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo do stream */}
          {!isMinimized && (
            <CardContent className="p-0 h-full overflow-hidden">
              <div className="relative h-full">
                {currentStream.twitchChannel ? (
                  <iframe
                    src={`https://player.twitch.tv/?channel=${currentStream.twitchChannel}&parent=localhost&autoplay=true&muted=true&controls=false`}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <img 
                      src={currentStream.thumbnail} 
                      alt={`${currentStream.player || currentStream.name} stream`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                {/* Overlay superior compacto no topo esquerdo - horizontal */}
                {allStreams && allStreams.length > 1 && (
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 bg-gradient-to-r from-black/80 via-gray-900/70 to-black/80 backdrop-blur-xl rounded-lg px-3 py-2 border border-white/10 shadow-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-white text-xs font-semibold">
                          {allStreams.length} Online
                        </span>
                      </div>
                      <div className="flex gap-1.5 ml-2">
                        {allStreams.map((stream, index) => {
                          const isActive = index === currentStreamIndex;
                          const isFeatured = featuredStreamer && index === 0;
                          
                          return (
                            <div
                              key={stream.id || index}
                              className={`relative cursor-pointer transition-all duration-300 ${
                                isActive ? 'scale-110' : 'scale-100 hover:scale-105'
                              }`}
                              onClick={() => setCurrentStreamIndex(index)}
                              title={`${stream.player || stream.name} - ${stream.game || 'Streaming'}`}
                            >
                              {/* Container do avatar compacto */}
                              <div className={`relative w-8 h-8 rounded-full transition-all duration-300 ${
                                isActive 
                                  ? 'ring-2 ring-purple-400/60 shadow-lg shadow-purple-500/50' 
                                  : 'ring-1 ring-white/20 hover:ring-cyan-400/40 shadow-md'
                              }`}>
                                <img
                                  src={stream.thumbnail || '/src/assets/search_images/default.jpg'}
                                  alt={stream.player || stream.name}
                                  className="w-full h-full rounded-full object-cover border border-white/10"
                                />
                                
                                {/* Efeito de brilho no avatar ativo */}
                                {isActive && (
                                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-sm animate-pulse"></div>
                                )}
                              </div>
                              
                              {/* Indicador de destaque compacto - sempre visível */}
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full border border-white shadow-lg flex items-center justify-center">
                                <span className="text-white text-xs font-bold">⭐</span>
                              </div>
                              
                              {/* Status online indicator compacto */}
                              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border border-white shadow-md">
                                <div className="absolute inset-0 bg-green-400 rounded-full blur-sm opacity-60 animate-pulse"></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Overlay com informações ultra moderno */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-gray-900/80 to-transparent p-6">
                  <div className="flex justify-between items-end">
                    <div className="flex-1 space-y-3">
                      {/* Nome do streamer com efeito neon */}
                      <h3 className="text-white font-bold text-lg mb-2 truncate bg-gradient-to-r from-white via-purple-100 to-cyan-100 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                        {currentStream.player || currentStream.name}
                      </h3>
                      
                      {/* Game com design moderno */}
                      {currentStream.game && (
                        <div className="flex items-center gap-2 mb-2">
                          <div className="relative">
                            <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg"></div>
                            <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full blur-sm opacity-60 animate-pulse"></div>
                          </div>
                          <p className="text-gray-100 text-sm font-semibold bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">
                            {currentStream.game}
                          </p>
                        </div>
                      )}
                      
                      {/* Indicador LIVE ultra moderno */}
                      <div className="relative inline-flex">
                        <div className="flex items-center gap-2 bg-gradient-to-r from-red-500/90 to-pink-500/90 rounded-full px-4 py-2 backdrop-blur-sm border border-red-400/30 shadow-lg">
                          <Eye className="w-4 h-4 text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                          <span className="text-white text-sm font-bold tracking-wide">LIVE</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-full blur-md opacity-50 animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StreamPopup;