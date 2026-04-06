# Configuração da API - Marketplace Frontend

## Visão Geral

Este documento explica como o frontend está configurado para se comunicar com o backend Django em `http://localhost:8000/api/docs/`.

## Arquivos Criados

### 1. `.env` (Variáveis de Ambiente)
Arquivo com as configurações do ambiente de desenvolvimento:
```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK=false
VITE_APP_NAME=MVP Marketplace
VITE_APP_VERSION=1.0.0
```

**Importante:** Este arquivo não deve ser commitado no Git (já está no `.gitignore`).

### 2. `.env.example` (Template)
Template das variáveis de ambiente para outros desenvolvedores:
- Copie este arquivo para `.env` e ajuste conforme necessário
- Este arquivo deve ser commitado no Git

### 3. `src/config/api.js` (Configuração Centralizada)
Arquivo central com todas as configurações da API:
- **API_BASE_URL**: URL base da API
- **USE_MOCK**: Flag para alternar entre mock e API real
- **API_ENDPOINTS**: Todos os endpoints organizados por recurso
- **getAuthHeaders()**: Helper para criar headers com autenticação
- **apiRequest()**: Helper para fazer requisições HTTP

### 4. `vite.config.js` (Atualizado)
Configurado com:
- Porta do servidor de desenvolvimento: 3000
- Proxy para `/api` apontando para `http://localhost:8000`

## Como Usar

### Alternar entre Mock e API Real

No arquivo `.env`, altere a variável:
```env
# Para usar dados mockados (desenvolvimento sem backend)
VITE_USE_MOCK=true

# Para usar a API real do Django
VITE_USE_MOCK=false
```

### Endpoints Disponíveis

#### Autenticação
- `POST /api/auth/login/` - Login
- `POST /api/auth/signup/` - Cadastro
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/verify/` - Verificar token
- `POST /api/auth/refresh/` - Refresh token

#### Usuários
- `GET /api/usuarios/` - Listar usuários
- `GET /api/usuarios/{id}/` - Detalhes do usuário
- `GET /api/usuarios/me/` - Usuário atual

#### Produtos
- `GET /api/produtos/` - Listar produtos
- `GET /api/produtos/{id}/` - Detalhes do produto
- `POST /api/produtos/` - Criar produto
- `PUT /api/produtos/{id}/` - Atualizar produto
- `DELETE /api/produtos/{id}/` - Deletar produto
- `GET /api/produtos/?usuario={userId}` - Produtos por usuário

#### Categorias
- `GET /api/categorias/` - Listar categorias
- `GET /api/categorias/{id}/` - Detalhes da categoria

## Serviços Atualizados

### `authService.js`
Atualizado para usar a configuração centralizada:
- Importa `USE_MOCK`, `API_ENDPOINTS`, `apiRequest`, `getAuthHeaders`
- Implementa chamadas reais à API quando `USE_MOCK=false`
- Mantém compatibilidade com dados mockados

### `productService.js`
Atualizado para usar a configuração centralizada:
- Importa `USE_MOCK`, `API_ENDPOINTS`, `apiRequest`, `getAuthHeaders`
- Implementa chamadas reais à API quando `USE_MOCK=false`
- Mantém compatibilidade com dados mockados

## Testando a Integração

### 1. Certifique-se que o backend está rodando
```bash
cd marketplace-backend/mkbackend
python manage.py runserver
```

### 2. Configure o frontend para usar a API real
No arquivo `.env`:
```env
VITE_USE_MOCK=false
```

### 3. Inicie o frontend
```bash
cd marketplace-frontend
npm run dev
```

### 4. Acesse a aplicação
- Frontend: http://localhost:3000
- Backend API Docs: http://localhost:8000/api/docs/

## Estrutura de Resposta da API

### Sucesso
```javascript
{
  success: true,
  data: { /* dados da resposta */ },
  status: 200
}
```

### Erro
```javascript
{
  success: false,
  error: "Mensagem de erro",
  status: 400
}
```

## Autenticação

O sistema usa tokens JWT (JSON Web Tokens):
1. Login/Signup retorna um token
2. Token é salvo no localStorage
3. Requisições autenticadas incluem header: `Authorization: Bearer {token}`

## Troubleshooting

### CORS Errors
Se encontrar erros de CORS, verifique se o backend Django tem o CORS configurado corretamente:
```python
# settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
]
```

### Proxy não funciona
Se o proxy do Vite não funcionar, você pode usar a URL completa:
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

### Variáveis de ambiente não carregam
- Reinicie o servidor de desenvolvimento após alterar `.env`
- Variáveis devem começar com `VITE_` para serem expostas ao cliente

## Próximos Passos

1. Ajustar os endpoints conforme a API real do Django
2. Implementar tratamento de erros específicos
3. Adicionar interceptors para refresh token automático
4. Implementar cache de requisições
5. Adicionar loading states globais

---
