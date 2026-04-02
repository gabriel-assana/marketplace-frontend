// Mock de autenticação - Simula comportamento da API
// Quando a API real estiver pronta, apenas trocar no authService.js

// Simula delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Usuários mockados para teste
const MOCK_USERS = [
  {
    id: 1,
    name: 'João Silva',
    email: 'joao@email.com',
    password: '123456' // Em produção, senhas seriam hasheadas
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@email.com',
    password: '123456'
  }
]

export const mockLogin = async (email, password) => {
  await delay(500) // Simula latência de rede

  // Validação básica
  if (!email || !password) {
    return {
      success: false,
      error: 'Email e senha são obrigatórios'
    }
  }

  // Busca usuário
  const user = MOCK_USERS.find(u => u.email === email)

  if (!user) {
    return {
      success: false,
      error: 'Usuário não encontrado'
    }
  }

  if (user.password !== password) {
    return {
      success: false,
      error: 'Senha incorreta'
    }
  }

  // Gera token mock (JWT simulado)
  const token = `mock-jwt-token-${user.id}-${Date.now()}`

  // Remove senha do retorno
  const { password: _, ...userWithoutPassword } = user

  return {
    success: true,
    token,
    user: userWithoutPassword
  }
}

export const mockSignup = async (name, email, password) => {
  await delay(500)

  // Validações
  if (!name || !email || !password) {
    return {
      success: false,
      error: 'Todos os campos são obrigatórios'
    }
  }

  if (password.length < 6) {
    return {
      success: false,
      error: 'A senha deve ter no mínimo 6 caracteres'
    }
  }

  // Verifica se email já existe
  const existingUser = MOCK_USERS.find(u => u.email === email)
  if (existingUser) {
    return {
      success: false,
      error: 'Este email já está cadastrado'
    }
  }

  // Cria novo usuário
  const newUser = {
    id: MOCK_USERS.length + 1,
    name,
    email,
    password
  }

  // Adiciona à lista (em memória)
  MOCK_USERS.push(newUser)

  // Gera token
  const token = `mock-jwt-token-${newUser.id}-${Date.now()}`

  // Remove senha do retorno
  const { password: _, ...userWithoutPassword } = newUser

  return {
    success: true,
    token,
    user: userWithoutPassword
  }
}

export const mockLogout = async () => {
  await delay(200)
  return { success: true }
}

export const mockVerifyToken = async (token) => {
  await delay(300)

  if (!token || !token.startsWith('mock-jwt-token-')) {
    return {
      success: false,
      error: 'Token inválido'
    }
  }

  // Extrai ID do token mock
  const parts = token.split('-')
  const userId = parseInt(parts[3])

  const user = MOCK_USERS.find(u => u.id === userId)

  if (!user) {
    return {
      success: false,
      error: 'Usuário não encontrado'
    }
  }

  const { password: _, ...userWithoutPassword } = user

  return {
    success: true,
    user: userWithoutPassword
  }
}

// Made with Bob
