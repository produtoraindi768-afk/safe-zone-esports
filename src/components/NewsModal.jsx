import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NewsModal = ({ news, isOpen, onClose }) => {
  if (!isOpen || !news) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        {/* Header do Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{news.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                {news.category}
              </span>
              <span>{news.publishDate || news.date}</span>
              <span>Por {news.author}</span>
              {news.readingTime && (
                <span>{news.readingTime} min de leitura</span>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Conteúdo do Modal */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Banner da Notícia */}
          {news.bannerUrl && (
            <div className="w-full h-64 overflow-hidden">
              <img 
                src={news.bannerUrl} 
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Resumo */}
          {news.excerpt && (
            <div className="p-6 border-b border-gray-700">
              <p className="text-lg text-gray-300 italic">{news.excerpt}</p>
            </div>
          )}

          {/* Conteúdo Principal */}
          <div className="p-6">
            {news.contentHtml ? (
              <div 
                className="prose prose-invert max-w-none text-gray-300"
                dangerouslySetInnerHTML={{ __html: news.contentHtml }}
              />
            ) : (
              <div className="text-gray-300 whitespace-pre-wrap">
                {news.content || news.summary}
              </div>
            )}
          </div>

          {/* Tags */}
          {news.tags && news.tags.length > 0 && (
            <div className="p-6 border-t border-gray-700">
              <h4 className="text-white font-semibold mb-3">Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsModal;