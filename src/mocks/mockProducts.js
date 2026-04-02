// Mock de produtos - Simula comportamento da API
// Quando a API real estiver pronta, apenas trocar no productService.js

import mockData from '../data/mockProducts.json'

// Simula delay de rede
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Armazena produtos em memória (simula banco de dados)
let productsInMemory = [...mockData.products]

export const mockGetProducts = async (searchQuery = '') => {
  await delay(300)

  let products = [...productsInMemory]

  // Filtro por busca
  if (searchQuery) {
    const query = searchQuery.toLowerCase()
    products = products.filter(p => 
      p.title.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    )
  }

  return {
    success: true,
    products
  }
}

export const mockGetProductById = async (id) => {
  await delay(300)

  const product = productsInMemory.find(p => p.id === parseInt(id))

  if (!product) {
    return {
      success: false,
      error: 'Produto não encontrado'
    }
  }

  return {
    success: true,
    product
  }
}

export const mockCreateProduct = async (productData, user) => {
  await delay(500)

  // Validações
  if (!productData.title || !productData.description || !productData.price) {
    return {
      success: false,
      error: 'Título, descrição e preço são obrigatórios'
    }
  }

  if (productData.price <= 0) {
    return {
      success: false,
      error: 'O preço deve ser maior que zero'
    }
  }

  if (!user) {
    return {
      success: false,
      error: 'Usuário não autenticado'
    }
  }

  // Cria novo produto
  const newProduct = {
    id: Math.max(...productsInMemory.map(p => p.id), 0) + 1,
    title: productData.title,
    description: productData.description,
    price: parseFloat(productData.price),
    imageUrl: productData.imageUrl || 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=250&fit=crop',
    category: productData.category || 'Outros',
    seller: {
      id: user.id,
      name: user.name,
      email: user.email,
      rating: 5.0,
      totalSales: 0
    },
    condition: productData.condition || 'Novo',
    stock: productData.stock || 1,
    location: productData.location || 'São Paulo, SP',
    specifications: productData.specifications || {},
    createdAt: new Date().toISOString()
  }

  // Adiciona à lista
  productsInMemory.push(newProduct)

  return {
    success: true,
    product: newProduct
  }
}

export const mockUpdateProduct = async (id, productData, user) => {
  await delay(500)

  const productIndex = productsInMemory.findIndex(p => p.id === parseInt(id))

  if (productIndex === -1) {
    return {
      success: false,
      error: 'Produto não encontrado'
    }
  }

  const product = productsInMemory[productIndex]

  // Verifica se o usuário é o dono do produto
  if (product.seller.id !== user.id) {
    return {
      success: false,
      error: 'Você não tem permissão para editar este produto'
    }
  }

  // Validações
  if (productData.price && productData.price <= 0) {
    return {
      success: false,
      error: 'O preço deve ser maior que zero'
    }
  }

  // Atualiza produto
  const updatedProduct = {
    ...product,
    ...productData,
    id: product.id, // Mantém ID original
    seller: product.seller, // Mantém vendedor original
    updatedAt: new Date().toISOString()
  }

  productsInMemory[productIndex] = updatedProduct

  return {
    success: true,
    product: updatedProduct
  }
}

export const mockDeleteProduct = async (id, user) => {
  await delay(500)

  const productIndex = productsInMemory.findIndex(p => p.id === parseInt(id))

  if (productIndex === -1) {
    return {
      success: false,
      error: 'Produto não encontrado'
    }
  }

  const product = productsInMemory[productIndex]

  // Verifica se o usuário é o dono do produto
  if (product.seller.id !== user.id) {
    return {
      success: false,
      error: 'Você não tem permissão para excluir este produto'
    }
  }

  // Remove produto
  productsInMemory.splice(productIndex, 1)

  return {
    success: true
  }
}

export const mockGetProductsByUser = async (userId) => {
  await delay(300)

  const products = productsInMemory.filter(p => p.seller.id === userId)

  return {
    success: true,
    products
  }
}

export const mockResetProducts = () => {
  productsInMemory = [...mockData.products]
}

// Made with Bob
