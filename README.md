# MVP Marketplace

Marketplace desenvolvido com React + Vite, utilizando Chakra UI para interface e React Router para navegação.

## 🚀 Tecnologias

- **React 19** - Biblioteca para construção de interfaces
- **Vite 8** - Build tool e dev server
- **Chakra UI 2** - Sistema de componentes UI
- **React Router DOM 6** - Roteamento
- **Framer Motion 12** - Animações
- **ESLint** - Linting de código

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior recomendada)
- npm ou yarn

## 🔧 Instalação e Configuração

### 1. Clone o repositório
```bash
git clone <https://github.com/gabriel-assana/marketplace-frontend>
cd marketplace-frontend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Execute o projeto em modo desenvolvimento
```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:5173`

## 📜 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera build de produção na pasta `dist/` |
| `npm run preview` | Visualiza o build de produção localmente |
| `npm run lint` | Executa verificação de código com ESLint |

## 📁 Estrutura do Projeto

```
marketplace-frontend/
├── docs/              # Documentação técnica
├── public/            # Arquivos estáticos
├── src/
│   ├── api/          # Configurações de API
│   ├── components/   # Componentes reutilizáveis
│   ├── contexts/     # Contextos React
│   ├── data/         # Dados mockados
│   ├── mocks/        # Funções mock
│   ├── pages/        # Páginas da aplicação
│   ├── services/     # Serviços e lógica de negócio
│   └── utils/        # Funções utilitárias
└── package.json
```

## 📚 Documentação Adicional

Para mais detalhes sobre requisitos, arquitetura e planejamento, consulte:
- [Requisitos](docs/01-requisitos.md)
- [Arquitetura](docs/02-arquitetura.md)
- [Planejamento](docs/03-planejamento.md)
