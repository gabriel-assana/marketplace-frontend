// API Configuration
// Centraliza configurações de comunicação com o backend

// Obtém a URL base da API das variáveis de ambiente
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

// Define se deve usar dados mockados ou API real
export const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

// Configurações da aplicação
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || 'MVP Marketplace',
  version: import.meta.env.VITE_APP_VERSION || '1.0.0'
}

// Endpoints da API
export const API_ENDPOINTS = {
  // Autenticação
  auth: {
    login: `${API_BASE_URL}/auth/login/`,
    signup: `${API_BASE_URL}/auth/signup/`,
    logout: `${API_BASE_URL}/auth/logout/`,
    verify: `${API_BASE_URL}/auth/verify/`,
    refresh: `${API_BASE_URL}/auth/refresh/`
  },
  
  // Usuários
  users: {
    list: `${API_BASE_URL}/usuarios/`,
    detail: (id) => `${API_BASE_URL}/usuarios/${id}/`,
    me: `${API_BASE_URL}/usuarios/me/`
  },
  
  // Produtos
  products: {
    list: `${API_BASE_URL}/produto/listar-produtos/`,
    detail: (id) => `${API_BASE_URL}/produto/${id}/`,
    create: `${API_BASE_URL}/produto/cadastrar-produto/`,
    update: (id) => `${API_BASE_URL}/produto/${id}/`,
    delete: (id) => `${API_BASE_URL}/produto/${id}/`,
    byUser: (userId) => `${API_BASE_URL}/produto/listar-produtos/?usuario=${userId}`
  },
  
  // Categorias
  categories: {
    list: `${API_BASE_URL}/categoria/listar-categorias/`,
    detail: (id) => `${API_BASE_URL}/categoria/${id}/`
  },
  
  // Usuários
  users: {
    list: `${API_BASE_URL}/usuario/listar-usuarios/`,
    create: `${API_BASE_URL}/usuario/cadastrar-usuario/`,
    detail: (id) => `${API_BASE_URL}/usuario/${id}/`
  }
}

// Helper para criar headers com autenticação
export const getAuthHeaders = (token) => {
  const headers = {
    'Content-Type': 'application/json'
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

// Helper para fazer requisições à API
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })
    
    // Verifica se a resposta é JSON
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json()
      
      if (!response.ok) {
        return {
          success: false,
          error: data.detail || data.message || 'Erro na requisição',
          status: response.status
        }
      }
      
      return {
        success: true,
        data,
        status: response.status
      }
    }
    
    // Se não for JSON, retorna status
    if (!response.ok) {
      return {
        success: false,
        error: 'Erro na requisição',
        status: response.status
      }
    }
    
    return {
      success: true,
      status: response.status
    }
  } catch (error) {
    console.error('Erro na requisição:', error)
    return {
      success: false,
      error: error.message || 'Erro de conexão com o servidor'
    }
  }
}
