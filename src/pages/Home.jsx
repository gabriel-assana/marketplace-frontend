import React, { useState, useEffect, useMemo } from 'react'
import {
  Container,
  Heading,
  Text,
  Box,
  Input,
  Button,
  Select,
  SimpleGrid,
  Flex,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
  Badge,
  Center,
  Icon,
  IconButton
} from '@chakra-ui/react'
import { SearchIcon, CloseIcon, ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import ProductCard from '../components/ProductCard'
import { getProducts } from '../services/productService'

function Home() {
  const [products, setProducts] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortOrder, setSortOrder] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const productsPerPage = 8

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true)
      try {
        const result = await getProducts()
        if (result.success) {
          setProducts(result.products)
        }
      } catch (error) {
        console.error('Erro ao carregar produtos:', error)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  // Extrair categorias únicas dos produtos
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))]
    return uniqueCategories.sort()
  }, [products])

  // Filtrar e ordenar produtos
  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filtro por busca (título ou descrição)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      result = result.filter(product => 
        product.title.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      )
    }

    // Filtro por categoria
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory)
    }

    // Ordenação por preço
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price)
    }

    return result
  }, [products, searchQuery, selectedCategory, sortOrder])

  // Cálculos de paginação
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Resetar para página 1 quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, sortOrder])

  // Limpar todos os filtros
  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSortOrder('')
    setCurrentPage(1)
  }

  // Verificar se há filtros ativos
  const hasActiveFilters = searchQuery || selectedCategory || sortOrder

  // Funções de navegação de página
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Gerar números de página para exibir (versão refatorada)
  const getPageNumbers = () => {
    const maxPagesToShow = 5
    
    // Se tiver poucas páginas, mostra todas
    if (totalPages <= maxPagesToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    
    // Início: [1, 2, 3, 4, ..., totalPages]
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages]
    }
    
    // Fim: [1, ..., totalPages-3, totalPages-2, totalPages-1, totalPages]
    if (currentPage >= totalPages - 2) {
      return [1, '...', ...Array.from({ length: 4 }, (_, i) => totalPages - 3 + i)]
    }
    
    // Meio: [1, ..., currentPage-1, currentPage, currentPage+1, ..., totalPages]
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
  }

  return (
    <Container maxW='container.xl' py={8}>
      {/* Seção de Boas-vindas */}
      <VStack spacing={4} align='stretch' mb={8}>
        <Heading size='2xl' color='heading' textAlign='center'>
          Bem-vindo ao Marketplace
        </Heading>
        <Text fontSize='lg' color='text' textAlign='center'>
          Encontre os melhores produtos com os melhores preços
        </Text>
      </VStack>

      {/* Seção de Filtros */}
      <Box
        bg='cardBg'
        p={6}
        borderRadius='lg'
        shadow='md'
        mb={8}
        borderWidth='1px'
        borderColor='border'
      >
        <VStack spacing={4} align='stretch'>
          {/* Linha 1: Busca */}
          <Box>
            <Text fontSize='sm' fontWeight='semibold' color='heading' mb={2}>
              Buscar Produtos
            </Text>
            <InputGroup size='lg'>
              <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.400' />
              </InputLeftElement>
              <Input
                placeholder='Digite o nome do produto...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                focusBorderColor='brand.500'
              />
            </InputGroup>
          </Box>

          {/* Linha 2: Filtros e Ordenação */}
          <Flex 
            direction={{ base: 'column', md: 'row' }} 
            gap={4}
          >
            {/* Filtro por Categoria */}
            <Box flex={1}>
              <Text fontSize='sm' fontWeight='semibold' color='heading' mb={2}>
                Categoria
              </Text>
              <Select
                placeholder='Todas as categorias'
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                size='lg'
                focusBorderColor='brand.500'
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </Box>

            {/* Ordenação por Preço */}
            <Box flex={1}>
              <Text fontSize='sm' fontWeight='semibold' color='heading' mb={2}>
                Ordenar por Preço
              </Text>
              <Select
                placeholder='Sem ordenação'
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                size='lg'
                focusBorderColor='brand.500'
              >
                <option value='asc'>Menor preço</option>
                <option value='desc'>Maior preço</option>
              </Select>
            </Box>
          </Flex>

          {/* Botão Limpar Filtros */}
          {hasActiveFilters && (
            <Flex justify='space-between' align='center' pt={2}>
              <HStack spacing={2}>
                <Text fontSize='sm' color='text'>
                  Filtros ativos:
                </Text>
                {searchQuery && (
                  <Badge colorScheme='purple' fontSize='0.8em'>
                    Busca: "{searchQuery}"
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge colorScheme='purple' fontSize='0.8em'>
                    {selectedCategory}
                  </Badge>
                )}
                {sortOrder && (
                  <Badge colorScheme='purple' fontSize='0.8em'>
                    {sortOrder === 'asc' ? 'Menor preço' : 'Maior preço'}
                  </Badge>
                )}
              </HStack>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme='red'
                variant='outline'
                size='sm'
                onClick={handleClearFilters}
              >
                Limpar Filtros
              </Button>
            </Flex>
          )}
        </VStack>
      </Box>

      {/* Contador de Resultados e Informações de Paginação */}
      {!loading && (
        <Flex justify='space-between' align='center' mb={6} flexWrap='wrap' gap={2}>
          <Text fontSize='lg' color='text' fontWeight='semibold'>
            {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
          </Text>
          {totalPages > 1 && (
            <Text fontSize='sm' color='gray.600'>
              Página {currentPage} de {totalPages}
            </Text>
          )}
        </Flex>
      )}

      {/* Conteúdo principal */}
      {loading ? (
        <Center py={20}>
          <VStack spacing={4}>
            <Text color='text' fontSize='lg'>
              Carregando produtos...
            </Text>
          </VStack>
        </Center>
      ) : filteredProducts.length > 0 ? (
        <>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={6}
            mb={8}
          >
            {currentProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </SimpleGrid>

          {/* Componente de Paginação */}
          {totalPages > 1 && (
            <Flex justify='center' align='center' gap={2} mt={8} mb={4}>
              {/* Botão Anterior */}
              <IconButton
                icon={<ChevronLeftIcon />}
                onClick={goToPreviousPage}
                isDisabled={currentPage === 1}
                aria-label='Página anterior'
                colorScheme='purple'
                variant='outline'
              />

              {/* Números de Página */}
              <HStack spacing={2}>
                {getPageNumbers().map((page, index) => (
                  page === '...' ? (
                    <Text key={`ellipsis-${index}`} px={2} color='gray.500'>
                      ...
                    </Text>
                  ) : (
                    <Button
                      key={page}
                      onClick={() => goToPage(page)}
                      colorScheme={currentPage === page ? 'purple' : 'gray'}
                      variant={currentPage === page ? 'solid' : 'outline'}
                      size='md'
                      minW='40px'
                    >
                      {page}
                    </Button>
                  )
                ))}
              </HStack>

              {/* Botão Próximo */}
              <IconButton
                icon={<ChevronRightIcon />}
                onClick={goToNextPage}
                isDisabled={currentPage === totalPages}
                aria-label='Próxima página'
                colorScheme='purple'
                variant='outline'
              />
            </Flex>
          )}
        </>
      ) : (
        /* Estado Vazio */
        <Center py={20}>
          <VStack spacing={4}>
            <Icon
              as={SearchIcon}
              boxSize={16}
              color='gray.300'
            />
            <Heading size='lg' color='gray.500'>
              Nenhum produto encontrado
            </Heading>
            <Text color='text' textAlign='center'>
              Tente ajustar seus filtros ou fazer uma nova busca
            </Text>
            {hasActiveFilters && (
              <Button
                colorScheme='purple'
                onClick={handleClearFilters}
                mt={4}
              >
                Limpar Filtros
              </Button>
            )}
          </VStack>
        </Center>
      )}
    </Container>
  )
}

export default Home


