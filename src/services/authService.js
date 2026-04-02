// Service de autenticação
// Camada de abstração entre componentes e API/Mock

import {
  mockLogin,
  mockSignup,
  mockLogout,
  mockVerifyToken
} from '../mocks/mockAuth'

// Flag para alternar entre mock e API real
// Quando a API estiver pronta, mude para false
const USE_MOCK = true

// Chaves do localStorage
const TOKEN_KEY = 'marketplace_token'
const USER_KEY = 'marketplace_user'

export const login = async (email, password) => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockLogin(email, password)
    } else {
      // TODO: Implementar chamada à API real
      // const res = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    if (response.success) {
      // Salva token e usuário no localStorage
      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    }

    return response
  } catch (error) {
    console.error('Erro no login:', error)
    return {
      success: false,
      error: 'Erro ao realizar login. Tente novamente.'
    }
  }
}

export const signup = async (name, email, password) => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockSignup(name, email, password)
    } else {
      // TODO: Implementar chamada à API real
      // const res = await fetch('/api/auth/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, password })
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    if (response.success) {
      // Salva token e usuário no localStorage
      localStorage.setItem(TOKEN_KEY, response.token)
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    }

    return response
  } catch (error) {
    console.error('Erro no cadastro:', error)
    return {
      success: false,
      error: 'Erro ao realizar cadastro. Tente novamente.'
    }
  }
}

export const logout = async () => {
  try {
    if (USE_MOCK) {
      await mockLogout()
    } else {
      // TODO: Implementar chamada à API real (se necessário)
    }

    // Remove dados do localStorage
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)

    return { success: true }
  } catch (error) {
    console.error('Erro no logout:', error)
    return { success: false }
  }
}

export const isAuthenticated = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  return !!token
}

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY)
}

export const getCurrentUser = () => {
  const userStr = localStorage.getItem(USER_KEY)
  if (!userStr) return null

  try {
    return JSON.parse(userStr)
  } catch (error) {
    console.error('Erro ao parsear usuário:', error)
    return null
  }
}

export const verifyToken = async () => {
  try {
    const token = getToken()

    if (!token) {
      return {
        success: false,
        error: 'Token não encontrado'
      }
    }

    let response

    if (USE_MOCK) {
      response = await mockVerifyToken(token)
    } else {
      // TODO: Implementar chamada à API real
      // const res = await fetch('/api/auth/verify', {
      //   headers: { 'Authorization': `Bearer ${token}` }
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    if (response.success) {
      // Atualiza dados do usuário no localStorage
      localStorage.setItem(USER_KEY, JSON.stringify(response.user))
    } else {
      // Token inválido, remove do localStorage
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem(USER_KEY)
    }

    return response
  } catch (error) {
    console.error('Erro ao verificar token:', error)
    return {
      success: false,
      error: 'Erro ao verificar autenticação'
    }
  }
}

export const updateCurrentUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

// Made with Bob
