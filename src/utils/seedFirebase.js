import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

// Dados de exemplo para popular o Firebase
const sampleNews = [
  {
    title: "Safe Zone Esports conquista primeiro lugar no campeonato regional",
    excerpt: "Em uma partida emocionante, nossa equipe demonstrou excelência técnica e estratégica, garantindo a vitória no torneio mais importante da região.",
    content: "<p>A equipe Safe Zone Esports fez história ao conquistar o primeiro lugar no campeonato regional de esports. Com uma performance excepcional em todas as partidas, os jogadores demonstraram não apenas habilidade técnica, mas também uma coordenação de equipe exemplar.</p><p>O torneio, que durou três dias intensos, reuniu as melhores equipes da região em uma competição acirrada. Nossa equipe mostrou consistência e determinação, superando adversários experientes e consolidando sua posição como uma das principais forças do cenário competitivo.</p>",
    contentHtml: "<p>A equipe Safe Zone Esports fez história ao conquistar o primeiro lugar no campeonato regional de esports. Com uma performance excepcional em todas as partidas, os jogadores demonstraram não apenas habilidade técnica, mas também uma coordenação de equipe exemplar.</p><p>O torneio, que durou três dias intensos, reuniu as melhores equipes da região em uma competição acirrada. Nossa equipe mostrou consistência e determinação, superando adversários experientes e consolidando sua posição como uma das principais forças do cenário competitivo.</p>",
    author: "Redação Safe Zone",
    category: "Competições",
    bannerUrl: "https://picsum.photos/800/400?random=1",
    featuredImage: "https://picsum.photos/600/300?random=1",
    publishDate: new Date('2024-01-15'),
    createdAt: new Date(),
    isFeatured: true,
    status: "published",
    readingTime: 3,
    tags: ["campeonato", "vitória", "esports"],
    slug: "safe-zone-conquista-primeiro-lugar-campeonato-regional",
    seoTitle: "Safe Zone Esports conquista primeiro lugar no campeonato regional",
    seoDescription: "Equipe Safe Zone Esports faz história ao conquistar o primeiro lugar no campeonato regional com performance excepcional.",
    views: 1250,
    updatedAt: new Date()
  },
  {
    title: "Novo patch traz mudanças significativas para o meta competitivo",
    excerpt: "As últimas atualizações do jogo prometem revolucionar as estratégias utilizadas pelas equipes profissionais.",
    content: "<p>O mais recente patch do jogo trouxe mudanças substanciais que estão impactando diretamente o cenário competitivo. As alterações nos personagens e mecânicas de jogo estão forçando as equipes a repensarem suas estratégias.</p><p>Nossa equipe de analistas já está estudando as implicações dessas mudanças e desenvolvendo novas táticas para se adaptar ao novo meta. Esperamos que essas atualizações tragam ainda mais dinamismo às competições.</p>",
    contentHtml: "<p>O mais recente patch do jogo trouxe mudanças substanciais que estão impactando diretamente o cenário competitivo. As alterações nos personagens e mecânicas de jogo estão forçando as equipes a repensarem suas estratégias.</p><p>Nossa equipe de analistas já está estudando as implicações dessas mudanças e desenvolvendo novas táticas para se adaptar ao novo meta. Esperamos que essas atualizações tragam ainda mais dinamismo às competições.</p>",
    author: "João Silva",
    category: "Análises",
    bannerUrl: "https://picsum.photos/800/400?random=2",
    featuredImage: "https://picsum.photos/600/300?random=2",
    publishDate: new Date('2024-01-14'),
    createdAt: new Date(),
    isFeatured: false,
    status: "published",
    readingTime: 5,
    tags: ["patch", "meta", "estratégia"],
    slug: "novo-patch-mudancas-meta-competitivo",
    seoTitle: "Novo patch traz mudanças significativas para o meta competitivo",
    seoDescription: "Análise das mudanças do novo patch e seu impacto no cenário competitivo de esports.",
    views: 890,
    updatedAt: new Date()
  },
  {
    title: "Entrevista exclusiva com o capitão da equipe",
    excerpt: "Conversamos com nosso capitão sobre as estratégias da equipe e os próximos desafios pela frente.",
    content: "<p>Em uma entrevista exclusiva, nosso capitão compartilhou insights valiosos sobre a preparação da equipe e as expectativas para os próximos torneios. Ele destacou a importância do trabalho em equipe e da dedicação constante aos treinos.</p><p>Durante a conversa, foram abordados temas como a evolução da equipe, os desafios enfrentados e as metas para o futuro. Uma entrevista imperdível para todos os fãs da Safe Zone Esports.</p>",
    contentHtml: "<p>Em uma entrevista exclusiva, nosso capitão compartilhou insights valiosos sobre a preparação da equipe e as expectativas para os próximos torneios. Ele destacou a importância do trabalho em equipe e da dedicação constante aos treinos.</p><p>Durante a conversa, foram abordados temas como a evolução da equipe, os desafios enfrentados e as metas para o futuro. Uma entrevista imperdível para todos os fãs da Safe Zone Esports.</p>",
    author: "Maria Santos",
    category: "Entrevistas",
    bannerUrl: "https://picsum.photos/800/400?random=3",
    featuredImage: "https://picsum.photos/600/300?random=3",
    publishDate: new Date('2024-01-13'),
    createdAt: new Date(),
    isFeatured: false,
    status: "published",
    readingTime: 4,
    tags: ["entrevista", "capitão", "equipe"],
    slug: "entrevista-exclusiva-capitao-equipe",
    seoTitle: "Entrevista exclusiva com o capitão da equipe Safe Zone",
    seoDescription: "Entrevista exclusiva com o capitão da Safe Zone Esports sobre estratégias e próximos desafios.",
    views: 675,
    updatedAt: new Date()
  },
  {
    title: "Calendário de competições 2024 é divulgado",
    excerpt: "Confira todas as datas importantes dos torneios e campeonatos que acontecerão ao longo do ano.",
    content: "<p>O calendário oficial de competições para 2024 foi divulgado, trazendo uma programação repleta de torneios emocionantes. A Safe Zone Esports já confirmou participação em diversos eventos importantes.</p><p>Entre os destaques estão o Campeonato Nacional, a Liga Regional e vários torneios internacionais. Nossa equipe está se preparando intensivamente para cada competição, com foco em manter o alto nível de performance.</p>",
    contentHtml: "<p>O calendário oficial de competições para 2024 foi divulgado, trazendo uma programação repleta de torneios emocionantes. A Safe Zone Esports já confirmou participação em diversos eventos importantes.</p><p>Entre os destaques estão o Campeonato Nacional, a Liga Regional e vários torneios internacionais. Nossa equipe está se preparando intensivamente para cada competição, com foco em manter o alto nível de performance.</p>",
    author: "Carlos Oliveira",
    category: "Notícias",
    bannerUrl: "https://picsum.photos/800/400?random=4",
    featuredImage: "https://picsum.photos/600/300?random=4",
    publishDate: new Date('2024-01-12'),
    createdAt: new Date(),
    isFeatured: false,
    status: "published",
    readingTime: 2,
    tags: ["calendário", "competições", "2024"],
    slug: "calendario-competicoes-2024-divulgado",
    seoTitle: "Calendário de competições 2024 é divulgado",
    seoDescription: "Confira o calendário completo de competições de esports para 2024 e as participações da Safe Zone.",
    views: 1100,
    updatedAt: new Date()
  }
];

// Função para popular o Firebase com dados de exemplo
export const seedFirebaseNews = async () => {
  try {
    console.log('🌱 Iniciando população do Firebase com notícias de exemplo...');
    
    const newsCollection = collection(db, 'news');
    
    for (const news of sampleNews) {
      const docRef = await addDoc(newsCollection, news);
      console.log('✅ Notícia adicionada com ID:', docRef.id, '- Título:', news.title);
    }
    
    console.log('🎉 Firebase populado com sucesso! Total de notícias adicionadas:', sampleNews.length);
    return true;
  } catch (error) {
    console.error('❌ Erro ao popular Firebase:', error);
    return false;
  }
};

// Função para executar o seed (pode ser chamada manualmente)
export const runSeed = () => {
  seedFirebaseNews();
};