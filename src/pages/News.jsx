import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Tag, Eye, MessageSquare, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { subscribeToNews, getPopularNews, incrementNewsViews } from '@/firebase/newsService';

const News = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [searchTerm, setSearchTerm] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['Todas', 'CS2', 'Valorant', 'LoL', 'Geral', 'Transferências', 'Torneios'];

  // Dados simulados como fallback
  const fallbackNews = [
    {
      id: 'fallback-1',
      title: "Safe Zone conquista vitória épica no Regional Championship",
      summary: "Em uma partida eletrizante que durou mais de 2 horas, a Safe Zone demonstrou excelente coordenação tática e individual skill para derrotar os Thunder Wolves por 2-1 na final do Regional Championship de CS2.",
      content: "A partida começou de forma equilibrada, com ambas as equipes mostrando um nível técnico excepcional. No primeiro mapa, Mirage, a Safe Zone conseguiu uma vantagem inicial mas os Thunder Wolves reagiram e fecharam 16-14. O segundo mapa, Inferno, foi dominado pela Safe Zone com uma performance brilhante do SZ_Phantom que terminou com 28 frags. O mapa decisivo, Dust2, foi uma verdadeira montanha-russa emocional...",
      date: "2024-01-15",
      author: "João Silva",
      image: "/src/assets/search_images/BvYRHtryfcGU.png",
      category: "CS2",
      views: 2847,
      comments: 156,
      featured: true
    },
    {
      id: 'fallback-2',
      title: "SZ_Lightning: O novo reforço que promete revolucionar o Valorant",
      summary: "Entrevista exclusiva com o mais novo membro da Safe Zone, que traz experiência internacional e uma mentalidade vencedora para fortalecer ainda mais a equipe de Valorant.",
      content: "SZ_Lightning, de apenas 19 anos, já acumula experiência em torneios internacionais e chega à Safe Zone com grandes expectativas. Em entrevista exclusiva, ele revela seus planos para a equipe e como pretende contribuir para os próximos torneios...",
      date: "2024-01-12",
      author: "Maria Santos",
      image: "/src/assets/search_images/81uPdvvPCZKn.png",
      category: "Valorant",
      views: 1923,
      comments: 89,
      featured: false
    },
    {
      id: 'fallback-3',
      title: "Calendário intensivo de treinos para a nova temporada",
      summary: "Safe Zone anuncia programa de preparação focado em estratégias avançadas, coordenação de equipe e análise de adversários para dominar a próxima temporada competitiva.",
      content: "A organização Safe Zone revelou hoje os detalhes do programa de treinos para a temporada 2024. O cronograma inclui 8 horas diárias de prática, sessões de análise de replays e bootcamps com equipes internacionais...",
      date: "2024-01-10",
      author: "Pedro Costa",
      image: "/src/assets/search_images/vcCA7ugxuX5u.png",
      category: "Geral",
      views: 1456,
      comments: 67,
      featured: false
    }
  ];

  // useEffect para buscar notícias do Firebase
  useEffect(() => {
    let unsubscribeNews = null;

    const loadNews = async () => {
      try {
        console.log('🔥 Tentando conectar ao Firebase para buscar notícias...');
        
        // Subscrever para atualizações em tempo real
        unsubscribeNews = subscribeToNews((firebaseNews) => {
          console.log('📰 Notícias recebidas do Firebase:', firebaseNews.length);
          if (firebaseNews.length > 0) {
            setNewsArticles(firebaseNews);
            setError(null);
          } else {
            console.log('⚠️ Nenhuma notícia encontrada no Firebase, usando dados simulados');
            setNewsArticles(fallbackNews);
          }
          setLoading(false);
        });

        // Buscar notícias populares
        const popular = await getPopularNews(5);
        if (popular.length > 0) {
          setPopularNews(popular);
        } else {
          setPopularNews(fallbackNews.slice(0, 3));
        }

      } catch (error) {
        console.error('❌ Erro ao conectar com Firebase:', error);
        console.log('🔄 Usando dados simulados como fallback');
        setNewsArticles(fallbackNews);
        setPopularNews(fallbackNews.slice(0, 3));
        setError('Conectando ao Firebase... Usando dados simulados.');
        setLoading(false);
      }
    };

    loadNews();

    // Cleanup
    return () => {
      if (unsubscribeNews) {
        unsubscribeNews();
      }
    };
  }, []);

  // Função para incrementar visualizações
  const handleReadMore = async (newsId) => {
    try {
      await incrementNewsViews(newsId);
      console.log(`📈 Visualização incrementada para notícia ${newsId}`);
    } catch (error) {
      console.error('Erro ao incrementar visualizações:', error);
    }
  };

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === 'Todas' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredArticle = newsArticles.find(article => article.featured);
  const regularArticles = filteredNews.filter(article => !article.featured);

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Portal de Notícias</h1>
          <p className="text-gray-400 text-lg">
            Fique por dentro de todas as novidades da Safe Zone Esports
          </p>
          {error && (
            <div className="mt-4 p-3 bg-yellow-900/50 border border-yellow-600 rounded-lg">
              <p className="text-yellow-300 text-sm">{error}</p>
            </div>
          )}
          {loading && (
            <div className="mt-4 p-3 bg-blue-900/50 border border-blue-600 rounded-lg">
              <p className="text-blue-300 text-sm">🔄 Carregando notícias...</p>
            </div>
          )}
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Pesquisar notícias..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-primary text-black hover:bg-primary/90" 
                  : "border-gray-600 text-gray-300 hover:border-primary hover:text-primary"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {featuredArticle && selectedCategory === 'Todas' && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Destaque</h2>
            <Card className="bg-gray-900/50 border-gray-700 overflow-hidden sz-card-hover">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                      {featuredArticle.category}
                    </span>
                    <span className="text-gray-400 text-sm">DESTAQUE</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{featuredArticle.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-3">{featuredArticle.summary}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span>Por {featuredArticle.author}</span>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredArticle.date}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {featuredArticle.views}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        {featuredArticle.comments}
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-primary text-black hover:bg-primary/90"
                    onClick={() => handleReadMore(featuredArticle.id)}
                  >
                    Ler Artigo Completo
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* News Grid */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory === 'Todas' ? 'Todas as Notícias' : `Notícias - ${selectedCategory}`}
            </h2>
            <span className="text-gray-400">
              {filteredNews.length} {filteredNews.length === 1 ? 'artigo' : 'artigos'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="bg-gray-900/50 border-gray-700 sz-card-hover overflow-hidden">
                <div className="relative">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary text-black px-2 py-1 rounded text-xs font-bold">
                    {article.category}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-3">
                    {article.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Por {article.author}</span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {article.date}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <div className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {article.views}
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {article.comments}
                      </div>
                    </div>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-primary hover:text-primary/80"
                      onClick={() => handleReadMore(article.id)}
                    >
                      Ler mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-black">
            Carregar Mais Notícias
          </Button>
        </div>

        {/* Sidebar with Popular Articles */}
        <div className="mt-12">
          <Card className="bg-gray-900/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Artigos Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularNews.map((article, index) => (
                  <div key={article.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-800/50 transition-colors">
                    <span className="text-primary font-bold text-lg">{index + 1}</span>
                    <div className="flex-1">
                      <h4 className="text-white text-sm font-medium line-clamp-2 mb-1">
                        {article.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        <span>{article.category}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          {article.views}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;

