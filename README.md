# 📚 SDI Project - Sequência Didática Interativa

Uma aplicação web moderna para condução de Sequências Didáticas Interativas, baseada na metodologia desenvolvida por **Maria Marly de Oliveira**.

![SDI Project](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue.svg)
![Vite](https://img.shields.io/badge/Vite-5.4.1-purple.svg)

## 🎯 Sobre o Projeto

A SDI (Sequência Didática Interativa) é uma proposta didático-metodológica com abordagem dialógico-hermenêutica, estruturada em etapas com funções pedagógicas específicas. Esta aplicação facilita a implementação dessa metodologia em ambientes educacionais.

### ✨ Funcionalidades Principais

- ✅ **Formação automática de grupos** - Algoritmo inteligente para grupos equilibrados de 4-5 participantes
- ✅ **Sistema de clusterização** - Para turmas grandes (>5 grupos)
- ✅ **Cronômetros integrados** - Controle de tempo flexível para cada fase
- ✅ **Geração de fichas PDF** - Fichas personalizadas para os participantes
- ✅ **Relatórios completos** - Documentação automática do processo
- ✅ **Interface responsiva** - Funciona em desktop, tablet e mobile
- ✅ **Persistência local** - Dados salvos automaticamente no navegador
- ✅ **Error Boundary** - Tratamento robusto de erros
- ✅ **Guia integrado da metodologia SDI**

## 🚀 As 8 Fases da SDI

1. **Planejamento** - Escolha do tema e formulação da pergunta hermenêutica
2. **Trabalho Individual** - Registro inicial das concepções de cada estudante
3. **Formação dos Grupos** - Grupos formados aleatoriamente a partir dos números das fichas
4. **Síntese em Grupo** - Discussão interna para elaborar uma síntese parcial
5. **Reunião de Líderes** - Negociação entre líderes eleitos democraticamente
6. **Síntese dos Líderes** - Apresentação da síntese integrada à turma
7. **Síntese Final** - Construção coletiva da resposta consensual
8. **Aprofundamento Teórico** - Consulta a fontes da literatura e fundamentação final

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18.3.1** - Biblioteca para interfaces de usuário
- **TypeScript 5.5.3** - Superset tipado do JavaScript
- **Vite 5.4.1** - Build tool e dev server
- **Tailwind CSS 3.4.11** - Framework CSS utilitário

### UI Components
- **shadcn/ui** - Componentes de interface modernos
- **Radix UI** - Primitivos de UI acessíveis
- **Lucide React** - Ícones SVG

### Funcionalidades
- **jsPDF** - Geração de documentos PDF
- **React Router DOM** - Roteamento SPA
- **Sonner** - Sistema de notificações
- **React Query** - Gerenciamento de estado servidor

## 📦 Instalação e Uso

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/sdi-project.git

# Entre no diretório
cd sdi-project

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview

# Linting
npm run lint
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
# Instale a CLI da Vercel
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
npm run build

# Upload da pasta dist/
```

### GitHub Pages
```bash
# Configure o base no vite.config.ts
base: '/nome-do-repositorio/'

# Build e deploy
npm run build
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes de UI (shadcn)
│   ├── ErrorBoundary.tsx
│   ├── PlanejamentoPhase.tsx
│   ├── IndividualPhase.tsx
│   ├── GroupPhase.tsx
│   ├── LeadersPhase.tsx
│   ├── FinalSynthesisPhase.tsx
│   ├── TheoreticalPhase.tsx
│   └── CompletionPhase.tsx
├── pages/              # Páginas da aplicação
│   ├── LandingPage.tsx
│   ├── Index.tsx
│   └── NotFound.tsx
├── types/              # Definições TypeScript
│   └── sdi.ts
├── utils/              # Funções utilitárias
│   └── sdiUtils.ts
├── hooks/              # Custom hooks
└── lib/                # Configurações e utilitários
```

## 🎨 Customização

### Cores e Tema
As cores podem ser customizadas no arquivo `src/index.css` através das variáveis CSS:

```css
:root {
  --primary: 220 90% 56%;
  --secondary: 220 14.3% 95.9%;
  /* ... outras variáveis */
}
```

### Algoritmo de Grupos
O algoritmo de formação de grupos pode ser ajustado em `src/utils/sdiUtils.ts`:

```typescript
export function grupos4e5(n: number): number[] {
  // Lógica personalizada aqui
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Massaro Victor**
- GitHub: [@massarovictor](https://github.com/massarovictor)
- Email: victormassaro00@gmail.com

## 📚 Metodologia SDI

A metodologia SDI foi desenvolvida por **Maria Marly de Oliveira** e se baseia em uma abordagem dialógico-hermenêutica que promove:

- 🎯 **Construção coletiva do conhecimento**
- 🤝 **Aprendizagem colaborativa**
- 💭 **Desenvolvimento do pensamento crítico**
- 🗣️ **Habilidades de comunicação e argumentação**
- 🔄 **Processo democrático de tomada de decisões**

## ⚠️ Nota Importante

Esta aplicação é uma ferramenta de apoio à metodologia SDI e deve ser utilizada em conjunto com o conhecimento pedagógico adequado sobre a sequência didática interativa.

---

Desenvolvido com ❤️ para a Educação Brasileira
