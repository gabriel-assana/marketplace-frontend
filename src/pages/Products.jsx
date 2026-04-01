import {
  Container,
  Box,
  Image,
  Heading,
  Text,
  Button,
  Badge,
  Flex,
  VStack,
  HStack,
  Divider,
  Grid,
  GridItem,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Avatar,
  useToast
} from '@chakra-ui/react'
import { ArrowBackIcon, StarIcon, PhoneIcon, EmailIcon } from '@chakra-ui/icons'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import mockData from '../data/mockProducts.json'

function Products() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento
    setLoading(true)
    const foundProduct = mockData.products.find(p => p.id === parseInt(id))
    
    setTimeout(() => {
      setProduct(foundProduct)
      setLoading(false)
    }, 300)
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const handleContact = () => {
    toast({
      title: 'Contato do vendedor',
      description: `Entre em contato com ${product?.seller?.name}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    })
  }

  if (loading) {
    return (
      <Container maxW='container.xl' py={8}>
        <Text>Carregando...</Text>
      </Container>
    )
  }

  if (!product) {
    return (
      <Container maxW='container.xl' py={8}>
        <VStack spacing={4}>
          <Heading>Produto não encontrado</Heading>
          <Button leftIcon={<ArrowBackIcon />} onClick={() => navigate('/')}>
            Voltar para Home
          </Button>
        </VStack>
      </Container>
    )
  }

  return (
    <Container maxW='container.xl' py={8}>
      {/* Breadcrumb */}
      <Breadcrumb mb={6} fontSize='sm' color='text'>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => navigate('/')} cursor='pointer'>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink>{product.category}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>{product.title}</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      {/* Botão Voltar */}
      <Button
        leftIcon={<ArrowBackIcon />}
        variant='ghost'
        mb={6}
        onClick={() => navigate('/')}
      >
        Voltar para produtos
      </Button>

      {/* Grid Principal */}
      <Grid
        templateColumns={{ base: '1fr', lg: '1fr 1fr' }}
        gap={8}
        mb={8}
      >
        {/* Coluna Esquerda - Imagem */}
        <GridItem>
          <Box
            borderRadius='lg'
            overflow='hidden'
            borderWidth='1px'
            borderColor='gray.200'
            bg='white'
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              w='100%'
              h={{ base: '300px', md: '500px' }}
              objectFit='cover'
              fallbackSrc='https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=250&fit=crop'
            />
          </Box>
        </GridItem>

        {/* Coluna Direita - Informações */}
        <GridItem>
          <VStack align='stretch' spacing={4}>
            {/* Categoria e Condição */}
            <HStack>
              <Badge colorScheme='purple' fontSize='md' px={3} py={1}>
                {product.category}
              </Badge>
              {product.condition && (
                <Badge colorScheme='green' fontSize='md' px={3} py={1}>
                  {product.condition}
                </Badge>
              )}
            </HStack>

            {/* Título */}
            <Heading size='xl' color='heading'>
              {product.title}
            </Heading>

            {/* Preço */}
            <Text fontSize='4xl' fontWeight='bold' color='brand.500'>
              {formatPrice(product.price)}
            </Text>

            {/* Estoque e Localização */}
            <HStack spacing={4} color='text'>
              {product.stock !== undefined && (
                <Text fontSize='sm'>
                  <Text as='span' fontWeight='semibold'>Estoque:</Text> {product.stock} unidades
                </Text>
              )}
              {product.location && (
                <Text fontSize='sm'>
                  <Text as='span' fontWeight='semibold'>Localização:</Text> {product.location}
                </Text>
              )}
            </HStack>

            <Divider />

            {/* Descrição */}
            <Box>
              <Heading size='md' mb={2} color='heading'>
                Descrição
              </Heading>
              <Text color='text' lineHeight='tall'>
                {product.description}
              </Text>
            </Box>

            {/* Botão de Contato */}
            <Button
              colorScheme='purple'
              size='lg'
              w='full'
              onClick={handleContact}
            >
              Entrar em Contato
            </Button>
          </VStack>
        </GridItem>
      </Grid>

      {/* Especificações Técnicas */}
      {product.specifications && (
        <Box
          bg='white'
          p={6}
          borderRadius='lg'
          borderWidth='1px'
          borderColor='gray.200'
          mb={8}
        >
          <Heading size='lg' mb={4} color='heading'>
            Especificações Técnicas
          </Heading>
          <TableContainer>
            <Table variant='simple'>
              <Tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <Tr key={key}>
                    <Td fontWeight='semibold' color='heading' w='30%'>
                      {key}
                    </Td>
                    <Td color='text'>{value}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}

      {/* Informações do Vendedor */}
      {product.seller && (
        <Box
          bg='white'
          p={6}
          borderRadius='lg'
          borderWidth='1px'
          borderColor='gray.200'
        >
          <Heading size='lg' mb={4} color='heading'>
            Informações do Vendedor
          </Heading>
          <Flex align='center' gap={4}>
            <Avatar
              name={product.seller.name}
              size='xl'
              bg='brand.500'
              color='white'
            />
            <VStack align='start' spacing={2} flex={1}>
              <Heading size='md' color='heading'>
                {product.seller.name}
              </Heading>
              
              {product.seller.rating && (
                <HStack>
                  <Icon as={StarIcon} color='yellow.400' />
                  <Text fontWeight='semibold' color='text'>
                    {product.seller.rating} / 5.0
                  </Text>
                  {product.seller.totalSales && (
                    <Text color='gray.500' fontSize='sm'>
                      ({product.seller.totalSales} vendas)
                    </Text>
                  )}
                </HStack>
              )}

              {product.seller.email && (
                <HStack color='text'>
                  <Icon as={EmailIcon} />
                  <Text fontSize='sm'>{product.seller.email}</Text>
                </HStack>
              )}

              {product.seller.phone && (
                <HStack color='text'>
                  <Icon as={PhoneIcon} />
                  <Text fontSize='sm'>{product.seller.phone}</Text>
                </HStack>
              )}
            </VStack>
          </Flex>
        </Box>
      )}
    </Container>
  )
}

export default Products

// Made with Bob
