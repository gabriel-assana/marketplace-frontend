// Service de produtos
// Camada de abstração entre componentes e API/Mock

import {
  mockGetProducts,
  mockGetProductById,
  mockCreateProduct,
  mockUpdateProduct,
  mockDeleteProduct,
  mockGetProductsByUser
} from '../mocks/mockProducts'
import { getCurrentUser, getToken } from './authService'

// Flag para alternar entre mock e API real
// Quando a API estiver pronta, mude para false
const USE_MOCK = true

export const getProducts = async (searchQuery = '') => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockGetProducts(searchQuery)
    } else {
      // TODO: Implementar chamada à API real
      // const url = searchQuery 
      //   ? `/api/products?name=${encodeURIComponent(searchQuery)}`
      //   : '/api/products'
      // const res = await fetch(url)
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao buscar produtos:', error)
    return {
      success: false,
      error: 'Erro ao buscar produtos. Tente novamente.'
    }
  }
}

export const getProductById = async (id) => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockGetProductById(id)
    } else {
      // TODO: Implementar chamada à API real
      // const res = await fetch(`/api/products/${id}`)
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao buscar produto:', error)
    return {
      success: false,
      error: 'Erro ao buscar produto. Tente novamente.'
    }
  }
}

export const createProduct = async (productData) => {
  try {
    const user = getCurrentUser()

    if (!user) {
      return {
        success: false,
        error: 'Você precisa estar logado para criar um produto'
      }
    }

    let response

    if (USE_MOCK) {
      response = await mockCreateProduct(productData, user)
    } else {
      // TODO: Implementar chamada à API real
      // const token = getToken()
      // const res = await fetch('/api/products', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(productData)
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao criar produto:', error)
    return {
      success: false,
      error: 'Erro ao criar produto. Tente novamente.'
    }
  }
}

export const updateProduct = async (id, productData) => {
  try {
    const user = getCurrentUser()

    if (!user) {
      return {
        success: false,
        error: 'Você precisa estar logado para editar um produto'
      }
    }

    let response

    if (USE_MOCK) {
      response = await mockUpdateProduct(id, productData, user)
    } else {
      // TODO: Implementar chamada à API real
      // const token = getToken()
      // const res = await fetch(`/api/products/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`
      //   },
      //   body: JSON.stringify(productData)
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao atualizar produto:', error)
    return {
      success: false,
      error: 'Erro ao atualizar produto. Tente novamente.'
    }
  }
}

export const deleteProduct = async (id) => {
  try {
    const user = getCurrentUser()

    if (!user) {
      return {
        success: false,
        error: 'Você precisa estar logado para excluir um produto'
      }
    }

    let response

    if (USE_MOCK) {
      response = await mockDeleteProduct(id, user)
    } else {
      // TODO: Implementar chamada à API real
      // const token = getToken()
      // const res = await fetch(`/api/products/${id}`, {
      //   method: 'DELETE',
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // })
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao excluir produto:', error)
    return {
      success: false,
      error: 'Erro ao excluir produto. Tente novamente.'
    }
  }
}

export const getProductsByUser = async (userId) => {
  try {
    let response

    if (USE_MOCK) {
      response = await mockGetProductsByUser(userId)
    } else {
      // TODO: Implementar chamada à API real
      // const res = await fetch(`/api/products?userId=${userId}`)
      // response = await res.json()
      throw new Error('API real ainda não implementada')
    }

    return response
  } catch (error) {
    console.error('Erro ao buscar produtos do usuário:', error)
    return {
      success: false,
      error: 'Erro ao buscar produtos. Tente novamente.'
    }
  }
}

export const getMyProducts = async () => {
  const user = getCurrentUser()

  if (!user) {
    return {
      success: false,
      error: 'Você precisa estar logado'
    }
  }

  return getProductsByUser(user.id)
}

// Made with Bob
