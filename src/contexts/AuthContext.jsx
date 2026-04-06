import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  login as loginService,
  signup as signupService,
  logout as logoutService,
  getCurrentUser,
  isAuthenticated as checkAuth,
  verifyToken
} from '../services/authService'

// Cria o contexto
const AuthContext = createContext({})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verifica autenticação ao carregar a aplicação
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        if (checkAuth()) {
          const currentUser = getCurrentUser()
          
          if (currentUser) {
            // Verifica se o token ainda é válido
            const result = await verifyToken()
            
            if (result.success) {
              setUser(result.user)
              setIsAuthenticated(true)
            } else {
              // Token inválido, limpa estado
              setUser(null)
              setIsAuthenticated(false)
            }
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuthentication()
  }, [])

  const login = async (email, password) => {
    try {
      const result = await loginService(email, password)

      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
      }

      return result
    } catch (error) {
      console.error('Erro no login:', error)
      return {
        success: false,
        error: 'Erro ao realizar login'
      }
    }
  }

  const signup = async (name, email, password) => {
    try {
      const result = await signupService(name, email, password)

      if (result.success) {
        setUser(result.user)
        setIsAuthenticated(true)
      }

      return result
    } catch (error) {
      console.error('Erro no cadastro:', error)
      return {
        success: false,
        error: 'Erro ao realizar cadastro'
      }
    }
  }

  const logout = async () => {
    try {
      await logoutService()
      setUser(null)
      setIsAuthenticated(false)
      return { success: true }
    } catch (error) {
      console.error('Erro no logout:', error)
      return { success: false }
    }
  }

  const updateUser = (updatedUser) => {
    setUser(updatedUser)
  }

  // Valor do contexto
  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
    updateUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }

  return context
}

export default AuthContext
