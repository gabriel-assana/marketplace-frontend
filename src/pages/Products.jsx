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
  Tbody,
  Tr,
  Td,
  TableContainer,
  Avatar,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from '@chakra-ui/react'
import { ArrowBackIcon, StarIcon, PhoneIcon, EmailIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons'
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getProductById, deleteProduct } from '../services/productService'
import { useAuth } from '../contexts/AuthContext'

function Products() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { user, isAuthenticated } = useAuth()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const cancelRef = useRef()

  // Verifica se o usuário é o dono do produto
  const isOwner = isAuthenticated && user && product && product.seller.id === user.id

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true)
      try {
        const result = await getProductById(id)
        
        if (result.success) {
          setProduct(result.product)
        } else {
          setProduct(null)
        }
      } catch (error) {
        console.error('Erro ao carregar produto:', error)
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
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

  const handleEdit = () => {
    navigate(`/products/${id}/edit`)
  }

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteProduct(id)
      
      if (result.success) {
        toast({
          title: 'Produto excluído',
          description: 'Seu anúncio foi removido com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate('/')
      } else {
        toast({
          title: 'Erro ao excluir',
          description: result.error || 'Não foi possível excluir o produto.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro inesperado.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsDeleting(false)
      setIsDeleteDialogOpen(false)
    }
  }

  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false)
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
            borderColor='border'
            bg='cardBg'
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

            {/* Botões de Ação */}
            {isOwner ? (
              <VStack spacing={3} w='full'>
                <HStack spacing={3} w='full'>
                  <Button
                    leftIcon={<EditIcon />}
                    colorScheme='blue'
                    size='lg'
                    flex={1}
                    onClick={handleEdit}
                  >
                    Editar
                  </Button>
                  <Button
                    leftIcon={<DeleteIcon />}
                    colorScheme='red'
                    size='lg'
                    flex={1}
                    onClick={handleDeleteClick}
                  >
                    Excluir
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Button
                colorScheme='purple'
                size='lg'
                w='full'
                onClick={handleContact}
              >
                Entrar em Contato
              </Button>
            )}
          </VStack>
        </GridItem>
      </Grid>

      {/* Especificações Técnicas */}
      {product.specifications && (
        <Box
          bg='cardBg'
          p={6}
          borderRadius='lg'
          borderWidth='1px'
          borderColor='border'
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
          bg='cardBg'
          p={6}
          borderRadius='lg'
          borderWidth='1px'
          borderColor='border'
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

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={handleDeleteCancel}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir Produto
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir este produto? Esta ação não pode ser desfeita.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={handleDeleteCancel}>
                Cancelar
              </Button>
              <Button
                colorScheme='red'
                onClick={handleDeleteConfirm}
                ml={3}
                isLoading={isDeleting}
                loadingText='Excluindo...'
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Container>
  )
}

export default Products

// Made with Bob
