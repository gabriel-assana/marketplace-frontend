// Service de produtos
// Camada de abstração entre componentes e API

import { getCurrentUser, getToken } from './authService'
import { API_ENDPOINTS, apiRequest, getAuthHeaders } from '../config/api'

// Helper para transformar dados do backend para o formato do frontend
const transformProduct = (product) => {
  return {
    id: product.id,
    title: product.titulo,
    description: product.descricao,
    price: parseFloat(product.preço || product.preco || 0),
    imageUrl: product.urlImagem || 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=250&fit=crop',
    category: product.categoria || 'Sem categoria',
    seller: {
      id: product.usuario_id || 0,
      name: product.usuario || 'Vendedor'
    }
  }
}

export const getProducts = async (searchQuery = '') => {
  try {
    const url = searchQuery
      ? `${API_ENDPOINTS.products.list}?nome=${encodeURIComponent(searchQuery)}`
      : API_ENDPOINTS.products.list
    
    const result = await apiRequest(url, {
      method: 'GET'
    })
    
    if (result.success) {
      // A API retorna { total: number, produtos: array }
      const rawProducts = result.data.produtos || result.data.results || result.data
      const products = Array.isArray(rawProducts)
        ? rawProducts.map(transformProduct)
        : []
      
      return {
        success: true,
        products,
        total: result.data.total || products.length
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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
    const result = await apiRequest(API_ENDPOINTS.products.detail(id), {
      method: 'GET'
    })
    
    if (result.success) {
      return {
        success: true,
        product: transformProduct(result.data)
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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

    // Transformar dados do frontend para o formato do backend
    const backendData = {
      titulo: productData.title,
      descricao: productData.description,
      preco: productData.price,
      url_imagem: productData.imageUrl,
      usuario: productData.userId || user.id,
      categoria: productData.categoryId
    }

    const token = getToken()
    const result = await apiRequest(API_ENDPOINTS.products.create, {
      method: 'POST',
      headers: getAuthHeaders(token),
      body: JSON.stringify(backendData)
    })
    
    if (result.success) {
      return {
        success: true,
        product: transformProduct(result.data)
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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

    // Transformar dados do frontend para o formato do backend
    const backendData = {
      titulo: productData.title,
      descricao: productData.description,
      preco: productData.price,
      url_imagem: productData.imageUrl,
      usuario: productData.userId || user.id,
      categoria: productData.categoryId
    }

    const token = getToken()
    const result = await apiRequest(API_ENDPOINTS.products.update(id), {
      method: 'PUT',
      headers: getAuthHeaders(token),
      body: JSON.stringify(backendData)
    })
    
    if (result.success) {
      return {
        success: true,
        product: transformProduct(result.data)
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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

    const token = getToken()
    const result = await apiRequest(API_ENDPOINTS.products.delete(id), {
      method: 'DELETE',
      headers: getAuthHeaders(token)
    })
    
    if (result.success) {
      return {
        success: true
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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
    const result = await apiRequest(API_ENDPOINTS.products.byUser(userId), {
      method: 'GET'
    })
    
    if (result.success) {
      // A API retorna { total: number, produtos: array }
      const rawProducts = result.data.produtos || result.data.results || result.data
      const products = Array.isArray(rawProducts)
        ? rawProducts.map(transformProduct)
        : []
      
      return {
        success: true,
        products,
        total: result.data.total || products.length
      }
    } else {
      return {
        success: false,
        error: result.error
      }
    }
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
