// Service de autenticação
// Camada de abstração entre componentes e API/Mock

import {
  mockLogin,
  mockSignup,
  mockLogout,
  mockVerifyToken
} from '../mocks/mockAuth'
import { USE_MOCK, API_ENDPOINTS, apiRequest, getAuthHeaders } from '../config/api'

// Chaves do localStorage
const TOKEN_KEY = 'marketplace_token'
const USER_KEY = 'marketplace_user'

export const login = async (email, password) => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockLogin(email, password)
    } else {
      // Chamada à API real
      const result = await apiRequest(API_ENDPOINTS.auth.login, {
        method: 'POST',
        body: JSON.stringify({ email, password })
      })
      
      if (result.success) {
        response = {
          success: true,
          token: result.data.token || result.data.access,
          user: result.data.user || result.data
        }
      } else {
        response = {
          success: false,
          error: result.error
        }
      }
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
      // Chamada à API real
      const result = await apiRequest(API_ENDPOINTS.auth.signup, {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })
      
      if (result.success) {
        response = {
          success: true,
          token: result.data.token || result.data.access,
          user: result.data.user || result.data
        }
      } else {
        response = {
          success: false,
          error: result.error
        }
      }
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
      // Chamada à API real (opcional)
      const token = getToken()
      if (token) {
        await apiRequest(API_ENDPOINTS.auth.logout, {
          method: 'POST',
          headers: getAuthHeaders(token)
        })
      }
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
      // Chamada à API real
      const result = await apiRequest(API_ENDPOINTS.auth.verify, {
        method: 'GET',
        headers: getAuthHeaders(token)
      })
      
      if (result.success) {
        response = {
          success: true,
          user: result.data.user || result.data
        }
      } else {
        response = {
          success: false,
          error: result.error
        }
      }
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
