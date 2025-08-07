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

  // Combinar featured streamer com live streams, evitando duplicação
  const filteredLiveStreams = featuredStreamer 
    ? liveStreams.filter(stream => stream.id !== featuredStreamer.id)
    : liveStreams;
  const allStreams = featuredStreamer ? [featuredStreamer, ...filteredLiveStreams] : liveStreams;
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
    if (e.target.closest('button') || e.target.closest('iframe')) {
      return;
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
        className={`absolute pointer-events-auto transition-all duration-300 ease-out ${
          isDragging ? 'scale-105 shadow-2xl' : 'scale-100'
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
        <Card className={`bg-gray-900/95 border-2 backdrop-blur-sm h-full transition-all duration-300 ${
          isDragging ? 'border-purple-500 shadow-2xl shadow-purple-500/25 cursor-grabbing' : 
          isHovering ? 'border-gray-600 shadow-xl cursor-grab' : 'border-gray-700 shadow-lg cursor-grab'
        }`}>
          {/* Header */}
          <div 
            className={`bg-gradient-to-r from-gray-800/95 to-gray-700/95 px-4 py-3 flex items-center justify-between border-b transition-all duration-200 ${
              isDragging ? 'bg-purple-800/90 border-purple-500' : 
              'hover:bg-gray-700/95 border-gray-600'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Indicador de arraste */}
              <div className={`flex items-center gap-1 transition-all duration-200 ${
                isDragging ? 'text-purple-300' : 'text-gray-400 hover:text-gray-300'
              }`}>
                <Move className="w-4 h-4" />
                <div className="flex flex-col gap-0.5">
                  <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                  <div className="w-1 h-1 bg-current rounded-full opacity-80"></div>
                  <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
                </div>
              </div>
              
              {/* Nome do streamer */}
              <div className="flex items-center gap-2">
                {featuredStreamer && currentStreamIndex === 0 && (
                  <span className="bg-gradient-to-r from-amber-400 to-yellow-500 text-gray-900 px-3 py-1.5 rounded-full text-xs font-semibold shadow-md border border-yellow-300/30 backdrop-blur-sm">
                    ⭐ DESTAQUE
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Controles principais */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(`https://www.twitch.tv/${currentStream.twitchChannel}`, '_blank')}
                  className="h-9 w-9 p-0 text-gray-300 hover:text-purple-300 hover:bg-purple-500/25 rounded-lg border border-transparent hover:border-purple-400/30 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-purple-500/20"
                  title="Abrir no Twitch"
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-9 w-9 p-0 text-gray-300 hover:text-purple-300 hover:bg-purple-500/25 rounded-lg border border-transparent hover:border-purple-400/30 backdrop-blur-sm transition-all duration-300 shadow-sm hover:shadow-purple-500/20"
                  title="Fechar popup"
                >
                  <X className="w-4 h-4" />
                </Button>
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
                
                {/* Overlay de avatares das streams online - Topo */}
                {allStreams && allStreams.length > 1 && (
                  <div className="absolute -top-8 -left-2 -right-2 bg-gradient-to-b from-black/90 via-black/60 to-transparent pt-12 px-6 pb-4 z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-xs font-semibold uppercase tracking-wide">
                        Streams Online ({allStreams.length})
                      </span>
                    </div>
                    <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 px-3 mt-2">
                      {allStreams.map((stream, index) => {
                        const isCurrentStream = index === currentStreamIndex;
                        return (
                          <div
                            key={stream.id || index}
                            className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 ${
                               isCurrentStream 
                                 ? 'scale-110' 
                                 : 'hover:scale-105'
                             }`}
                            onClick={() => setCurrentStreamIndex(index)}
                            title={`${stream.player || stream.name} - ${stream.game || 'Streaming'}`}
                          >
                            <div className="relative">
                              <img
                                 src={stream.thumbnail || '/src/assets/search_images/default.jpg'}
                                 alt={stream.player || stream.name}
                                 className="w-10 h-10 rounded-full object-cover shadow-lg"
                               />
                              {/* Indicador online */}
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                                <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              {/* Badge de destaque para featured streamer */}
                              {stream.isFeatured && (
                                <div className="absolute -top-0.5 -left-0.5 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                                  <span className="text-xs font-bold text-black">★</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Overlay com informações melhorado */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-sm mb-1 truncate">
                        {currentStream.player || currentStream.name}
                      </h3>
                      {currentStream.game && (
                        <div className="flex items-center gap-1 mb-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-gray-200 text-xs font-medium">
                            {currentStream.game}
                          </p>
                        </div>
                      )}
                      {/* Indicador LIVE */}
                      <div className="flex items-center gap-1 bg-black/40 rounded-full px-2 py-1">
                        <Eye className="w-3 h-3 text-green-400" />
                        <span className="text-green-400 text-xs font-bold">LIVE</span>
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