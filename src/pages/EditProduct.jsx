import React, { useState, useEffect } from 'react'
import {
  Container,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormHelperText,
  useToast,
  Spinner,
  Center
} from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductById, updateProduct } from '../services/productService'
import { useAuth } from '../contexts/AuthContext'

function EditProduct() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const { isAuthenticated, user } = useAuth()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    condition: 'Novo',
    stock: 1,
    location: ''
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Categorias disponíveis
  const categories = [
    'Eletrônicos',
    'Moda',
    'Casa e Decoração',
    'Esportes',
    'Livros',
    'Brinquedos',
    'Automotivo',
    'Outros'
  ]

  // Carrega dados do produto
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const result = await getProductById(id)

        if (result.success) {
          const product = result.product

          // Verifica se o usuário é o dono do produto
          if (!user || product.seller.id !== user.id) {
            toast({
              title: 'Acesso negado',
              description: 'Você não tem permissão para editar este produto',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            navigate('/')
            return
          }

          // Preenche o formulário com os dados do produto
          setFormData({
            title: product.title,
            description: product.description,
            price: product.price.toString(),
            imageUrl: product.imageUrl || '',
            category: product.category,
            condition: product.condition || 'Novo',
            stock: product.stock || 1,
            location: product.location || ''
          })
        } else {
          setError(result.error || 'Produto não encontrado')
          setTimeout(() => navigate('/'), 2000)
        }
      } catch (err) {
        setError('Erro ao carregar produto')
        setTimeout(() => navigate('/'), 2000)
      } finally {
        setLoading(false)
      }
    }

    if (isAuthenticated && user) {
      loadProduct()
    } else {
      toast({
        title: 'Autenticação necessária',
        description: 'Você precisa estar logado para editar produtos',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      })
      navigate('/login')
    }
  }, [id, isAuthenticated, user, navigate, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (error) setError('')
  }

  const handlePriceChange = (valueString) => {
    setFormData(prev => ({
      ...prev,
      price: valueString
    }))
    if (error) setError('')
  }

  const handleStockChange = (valueString) => {
    setFormData(prev => ({
      ...prev,
      stock: valueString
    }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Título é obrigatório')
      return false
    }

    if (!formData.description.trim()) {
      setError('Descrição é obrigatória')
      return false
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Preço deve ser maior que zero')
      return false
    }

    if (!formData.category) {
      setError('Categoria é obrigatória')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setSubmitting(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 1
      }

      const result = await updateProduct(id, productData)

      if (result.success) {
        toast({
          title: 'Produto atualizado!',
          description: 'As alterações foram salvas com sucesso.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        navigate(`/products/${id}`)
      } else {
        setError(result.error || 'Erro ao atualizar produto')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <Container maxW='container.md' py={8}>
        <Center py={20}>
          <VStack spacing={4}>
            <Spinner size='xl' color='brand.500' thickness='4px' />
            <Text color='text'>Carregando produto...</Text>
          </VStack>
        </Center>
      </Container>
    )
  }

  return (
    <Container maxW='container.md' py={8}>
      <Box
        bg='cardBg'
        p={8}
        borderRadius='lg'
        borderWidth='1px'
        borderColor='border'
        shadow='md'
      >
        <VStack spacing={6} align='stretch'>
          {/* Cabeçalho */}
          <Box>
            <Heading size='xl' color='heading' mb={2}>
              Editar Anúncio
            </Heading>
            <Text color='text'>
              Atualize as informações do seu produto
            </Text>
          </Box>

          {/* Mensagem de erro */}
          {error && (
            <Alert status='error' borderRadius='md'>
              <AlertIcon />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              {/* Título */}
              <FormControl isRequired>
                <FormLabel color='heading'>Título do Produto</FormLabel>
                <Input
                  type='text'
                  name='title'
                  value={formData.title}
                  onChange={handleChange}
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Descrição */}
              <FormControl isRequired>
                <FormLabel color='heading'>Descrição</FormLabel>
                <Textarea
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Preço */}
              <FormControl isRequired>
                <FormLabel color='heading'>Preço (R$)</FormLabel>
                <NumberInput
                  value={formData.price}
                  onChange={handlePriceChange}
                  min={0}
                  precision={2}
                  step={0.01}
                  size='lg'
                  focusBorderColor='brand.500'
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/* Categoria */}
              <FormControl isRequired>
                <FormLabel color='heading'>Categoria</FormLabel>
                <Select
                  name='category'
                  value={formData.category}
                  onChange={handleChange}
                  size='lg'
                  focusBorderColor='brand.500'
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {/* Condição */}
              <FormControl>
                <FormLabel color='heading'>Condição</FormLabel>
                <Select
                  name='condition'
                  value={formData.condition}
                  onChange={handleChange}
                  size='lg'
                  focusBorderColor='brand.500'
                >
                  <option value='Novo'>Novo</option>
                  <option value='Usado - Como novo'>Usado - Como novo</option>
                  <option value='Usado - Bom estado'>Usado - Bom estado</option>
                  <option value='Usado - Estado regular'>Usado - Estado regular</option>
                </Select>
              </FormControl>

              {/* URL da Imagem */}
              <FormControl>
                <FormLabel color='heading'>URL da Imagem</FormLabel>
                <Input
                  type='url'
                  name='imageUrl'
                  value={formData.imageUrl}
                  onChange={handleChange}
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Estoque */}
              <FormControl>
                <FormLabel color='heading'>Quantidade em Estoque</FormLabel>
                <NumberInput
                  value={formData.stock}
                  onChange={handleStockChange}
                  min={1}
                  max={999}
                  size='lg'
                  focusBorderColor='brand.500'
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              {/* Localização */}
              <FormControl>
                <FormLabel color='heading'>Localização</FormLabel>
                <Input
                  type='text'
                  name='location'
                  value={formData.location}
                  onChange={handleChange}
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Botões */}
              <VStack spacing={3} w='full' pt={4}>
                <Button
                  type='submit'
                  colorScheme='purple'
                  size='lg'
                  w='full'
                  isLoading={submitting}
                  loadingText='Salvando alterações...'
                >
                  Salvar Alterações
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  w='full'
                  onClick={() => navigate(`/products/${id}`)}
                  isDisabled={submitting}
                >
                  Cancelar
                </Button>
              </VStack>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  )
}

export default EditProduct