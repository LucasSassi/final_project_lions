# Marketplace de Carros - Frontend

Frontend do marketplace de carros com HTML, CSS e JavaScript puro.

## Deploy

### Opção 1: Vercel (Recomendado)

1. Instale o Vercel CLI:
```bash
npm install -g vercel
```

2. Faça login:
```bash
vercel login
```

3. Na pasta frontend, execute:
```bash
vercel
```

4. Siga as instruções e confirme as configurações padrão.

### Opção 2: Netlify

1. Instale o Netlify CLI:
```bash
npm install -g netlify-cli
```

2. Faça login:
```bash
netlify login
```

3. Na pasta frontend, execute:
```bash
netlify deploy
```

4. Para produção:
```bash
netlify deploy --prod
```

### Opção 3: GitHub Pages

1. Faça commit dos arquivos do frontend
2. Vá em Settings → Pages no GitHub
3. Escolha a branch e a pasta `frontend`
4. O site estará disponível em alguns minutos

## Estrutura

- `index.html` - Página de login/cadastro
- `marketplace.html` - Marketplace de carros
- `css/style.css` - Estilos
- `js/auth.js` - Autenticação
- `js/marketplace.js` - Lógica do marketplace
