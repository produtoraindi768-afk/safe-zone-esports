// Exemplo de configuração do Firebase com credenciais reais
// Copie este arquivo para config.js e substitua pelas suas credenciais

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Exemplo de configuração real do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

export { db };
export default app;

// INSTRUÇÕES:
// 1. Vá para https://console.firebase.google.com/
// 2. Crie um novo projeto ou selecione um existente
// 3. Vá para Configurações do projeto > Geral
// 4. Role para baixo até "Seus apps" e clique no ícone da web
// 5. Registre seu app e copie as configurações
// 6. Substitua os valores acima pelas suas credenciais reais
// 7. Renomeie este arquivo para config.js

// ESTRUTURA DO FIRESTORE:
// Coleção: streamers
// Documentos com campos:
// {
//   name: "Nome do Streamer",
//   isOnline: true/false,
//   streamUrl: "https://twitch.tv/streamer",
//   category: "Valorant",
//   avatarUrl: "https://exemplo.com/avatar.jpg",
//   platform: "Twitch"
// }