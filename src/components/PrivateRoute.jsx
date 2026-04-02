import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Center, Spinner, VStack, Text } from '@chakra-ui/react'

/**
 * Componente para proteger rotas que requerem autenticação
 * Redireciona para login se o usuário não estiver autenticado
 */
function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Mostra loading enquanto verifica autenticação
  if (loading) {
    return (
      <Center h='100vh'>
        <VStack spacing={4}>
          <Spinner size='xl' color='brand.500' thickness='4px' />
          <Text color='text'>Verificando autenticação...</Text>
        </VStack>
      </Center>
    )
  }

  // Se não estiver autenticado, redireciona para login
  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  // Se estiver autenticado, renderiza o componente filho
  return children
}

export default PrivateRoute

// Made with Bob
