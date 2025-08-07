# Configuração do Firebase - Projeto Dashboard

🎯 **SEU PROJETO FIREBASE ESTÁ CRIADO!** Agora você precisa configurar a Web API Key e o App ID para conectar ao dashboard.

## ✅ Informações do seu projeto:
- **Project name:** dashboard
- **Project ID:** dashboard-f0217
- **Project number:** 791615571
- **Status:** ⚠️ Web API Key não configurada

## 🚀 Passos para completar a configuração:

### 1. 🔑 Gerar Web API Key
1. Acesse https://console.firebase.google.com/project/dashboard-f0217
2. Vá para **Configurações do projeto** (ícone de engrenagem ⚙️)
3. Na aba **Geral**, role para baixo até "Suas chaves de API da Web"
4. Clique em **Criar chave de API da Web**
5. ✅ Copie a chave gerada (algo como: `AIzaSyC...`)

### 2. 📱 Criar App Web
1. No mesmo painel, role para baixo até "Seus apps"
2. Clique no ícone **</>** (Web)
3. Registre o app com nome "**Safe Zone Esports**"
4. **❌ NÃO** marque "Configurar Firebase Hosting"
5. Clique em **Registrar app**
6. ✅ Copie o `appId` da configuração mostrada (algo como: `1:791615571:web:abc123...`)

### 3. Configurar Firestore Database
1. No menu lateral, clique em **Firestore Database**
2. Clique em **Criar banco de dados**
3. Escolha **Modo de teste** (para desenvolvimento)
4. Selecione uma localização (ex: southamerica-east1)

### 4. Criar coleções no Firestore

#### 4.1. Coleção `streamers`
1. No Firestore, clique em **Iniciar coleção**
2. ID da coleção: `streamers`
3. Adicione documentos com esta estrutura:

```json
{
  "name": "GaspaFV",
  "platform": "Twitch",
  "game": "CS2",
  "isOnline": true,
  "viewers": 1250,
  "title": "Ranked CS2 - Rumo ao Global",
  "thumbnail": "https://example.com/thumbnail.jpg",
  "url": "https://twitch.tv/gaspafv",
  "lastUpdated": "2024-01-15T10:30:00Z"
}
```

#### 4.2. Coleção `news`
1. Crie uma nova coleção chamada `news`
2. Adicione documentos com esta estrutura:

```json
{
  "title": "Safe Zone conquista vitória épica no Regional Championship",
  "summary": "Em uma partida eletrizante que durou mais de 2 horas, a Safe Zone demonstrou excelente coordenação tática e individual skill para derrotar os Thunder Wolves por 2-1 na final do Regional Championship de CS2.",
  "content": "A partida começou de forma equilibrada, com ambas as equipes mostrando um nível técnico excepcional. No primeiro mapa, Mirage, a Safe Zone conseguiu uma vantagem inicial mas os Thunder Wolves reagiram e fecharam 16-14. O segundo mapa, Inferno, foi dominado pela Safe Zone com uma performance brilhante do SZ_Phantom que terminou com 28 frags. O mapa decisivo, Dust2, foi uma verdadeira montanha-russa emocional...",
  "date": "2024-01-15",
  "author": "João Silva",
  "image": "/src/assets/search_images/BvYRHtryfcGU.png",
  "category": "CS2",
  "views": 2847,
  "comments": 156,
  "featured": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 5. 🔧 Atualizar credenciais no código
Após obter a API Key e App ID, atualize o arquivo `src/firebase/config.js`:

**ANTES:**
```javascript
const firebaseConfig = {
  apiKey: "SUA_WEB_API_KEY_AQUI", // ⚠️ NECESSÁRIO
  appId: "SUA_APP_ID_AQUI" // ⚠️ NECESSÁRIO
};
```

**DEPOIS (com suas credenciais reais):**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...", // ✅ Sua Web API Key real
  authDomain: "dashboard-f0217.firebaseapp.com",
  projectId: "dashboard-f0217",
  storageBucket: "dashboard-f0217.appspot.com",
  messagingSenderId: "791615571",
  appId: "1:791615571:web:abc123..." // ✅ Seu App ID real
};
```

**🎯 IMPORTANTE:** Substitua apenas os valores `SUA_WEB_API_KEY_AQUI` e `SUA_APP_ID_AQUI` pelas credenciais reais obtidas no console do Firebase.

### 6. Configurar regras de segurança (temporário para teste)
1. No Firestore, vá para **Regras**
2. Substitua as regras por:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /streamers/{document} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ IMPORTANTE:** Essas regras são apenas para teste. Para produção, configure regras mais seguras.

## Testando a conexão:

1. Após configurar tudo, recarregue a página
2. Abra o console do navegador (F12)
3. Você deve ver logs como:
   - "Tentando conectar ao Firebase..."
   - "Stream [nome] está online no Firebase - será exibida"

## Estrutura recomendada dos documentos:

Crie pelo menos 3 documentos na coleção `streamers`:

**Documento 1:**
```json
{
  "name": "GaspaFV",
  "isOnline": true,
  "streamUrl": "https://www.twitch.tv/gaspafv",
  "category": "Valorant",
  "platform": "Twitch"
}
```

**Documento 2:**
```json
{
  "name": "OKASCA",
  "isOnline": true,
  "streamUrl": "https://www.twitch.tv/okasca",
  "category": "CS2",
  "platform": "Twitch"
}
```

**Documento 3:**
```json
{
  "name": "TestStreamer",
  "isOnline": false,
  "streamUrl": "https://www.twitch.tv/test",
  "category": "Just Chatting",
  "platform": "Twitch"
}
```

## Troubleshooting:

**Problema:** "No Web API Key for this project"
- **Solução:** Siga o passo 1 para gerar a Web API Key

**Problema:** Streams não aparecem
- Verifique se `isOnline: true` nos documentos
- Verifique o console para erros de conexão
- Confirme se as credenciais estão corretas

**Problema:** Erro de permissão
- Verifique as regras de segurança do Firestore
- Use as regras temporárias fornecidas acima

Após completar esses passos, o sistema irá conectar ao Firebase e mostrar apenas os streamers com `isOnline: true`!