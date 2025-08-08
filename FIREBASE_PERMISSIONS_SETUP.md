# Configuração de Permissões do Firebase

## Problema Identificado

As próximas partidas não estão aparecendo na aplicação devido a **erros de permissão no Firebase Firestore**. Os logs mostram:

```
PERMISSION_DENIED: Permission denied on resource project dashboard-f0217
```

## Solução: Configurar Regras de Segurança do Firestore

### 1. Acesse o Console do Firebase

1. Vá para [Firebase Console](https://console.firebase.google.com/)
2. Selecione o projeto **dashboard-f0217**
3. No menu lateral, clique em **Firestore Database**
4. Clique na aba **Regras** (Rules)

### 2. Configure as Regras de Segurança

Substitua as regras atuais por uma das opções abaixo:

#### Opção A: Acesso Público (Para Desenvolvimento)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura e escrita para todas as coleções
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

#### Opção B: Acesso Somente Leitura (Mais Seguro)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite apenas leitura para todas as coleções
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

#### Opção C: Regras Específicas por Coleção (Recomendado)
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Regras para a coleção de partidas
    match /matches/{matchId} {
      allow read: if true;
      allow write: if true; // ou adicione condições específicas
    }
    
    // Regras para a coleção de notícias
    match /news/{newsId} {
      allow read: if true;
      allow write: if true;
    }
    
    // Regras para a coleção de streamers
    match /streamers/{streamerId} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### 3. Publique as Regras

1. Após escolher e configurar as regras, clique em **Publicar**
2. Aguarde alguns segundos para as regras serem aplicadas

### 4. Teste a Aplicação

1. Recarregue a página da aplicação
2. Verifique se as partidas agora aparecem na seção "Próximas Partidas"
3. Abra o console do navegador (F12) para verificar se não há mais erros de permissão

## Estrutura de Dados Esperada

Para que as partidas apareçam corretamente, certifique-se de que os documentos na coleção `matches` tenham a seguinte estrutura:

```javascript
{
  "status": "upcoming",
  "scheduledDate": "2025-08-08T20:00:00.000Z", // Data no formato ISO
  "game": "CS2",
  "tournament": "Nome do Torneio",
  "team1": {
    "name": "Safe Zone Esports",
    "logo": "SZ"
  },
  "team2": {
    "name": "Nome do Adversário",
    "logo": "ADV"
  },
  "format": "MD3",
  "createdAt": "2025-08-08T15:00:00.000Z",
  "updatedAt": "2025-08-08T15:00:00.000Z"
}
```

## Scripts de Teste Disponíveis

Após configurar as permissões, você pode usar os seguintes scripts para adicionar partidas de teste:

- `add-test-match.js` - Adiciona uma partida para amanhã
- `add-today-match.js` - Adiciona uma partida para hoje
- `test-read-matches.js` - Testa a leitura das partidas

## Verificação de Funcionamento

Após configurar as permissões:

1. ✅ As partidas devem aparecer na página inicial
2. ✅ Máximo de 4 partidas são exibidas
3. ✅ Partidas são ordenadas por data mais próxima
4. ✅ Apenas partidas futuras são mostradas
5. ✅ Atualizações em tempo real funcionam

## Contato

Se ainda houver problemas após seguir estes passos, verifique:

1. Se o projeto Firebase está ativo
2. Se as credenciais no `config.js` estão corretas
3. Se há dados na coleção `matches` com status `upcoming`