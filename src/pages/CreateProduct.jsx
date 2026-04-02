import React, { useState } from 'react'
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
  useToast
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { createProduct } from '../services/productService'
import { useAuth } from '../contexts/AuthContext'

function CreateProduct() {
  const navigate = useNavigate()
  const toast = useToast()
  const { isAuthenticated } = useAuth()

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
  const [loading, setLoading] = useState(false)
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpa erro ao digitar
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

    if (!isAuthenticated) {
      setError('Você precisa estar logado para criar um produto')
      return
    }

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 1
      }

      const result = await createProduct(productData)

      if (result.success) {
        toast({
          title: 'Produto criado com sucesso!',
          description: 'Seu anúncio foi publicado.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        // Redireciona para a página do produto
        navigate(`/products/${result.product.id}`)
      } else {
        setError(result.error || 'Erro ao criar produto')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
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
              Criar Novo Anúncio
            </Heading>
            <Text color='text'>
              Preencha as informações do produto que deseja anunciar
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
                  placeholder='Ex: iPhone 13 Pro 128GB'
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
                  placeholder='Descreva o produto, suas características, estado de conservação, etc.'
                  rows={5}
                  size='lg'
                  focusBorderColor='brand.500'
                />
                <FormHelperText>
                  Seja detalhado para atrair mais compradores
                </FormHelperText>
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
                  <NumberInputField placeholder='0.00' />
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
                  placeholder='Selecione uma categoria'
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
                  placeholder='https://exemplo.com/imagem.jpg'
                  size='lg'
                  focusBorderColor='brand.500'
                />
                <FormHelperText>
                  Deixe em branco para usar uma imagem padrão
                </FormHelperText>
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
                  placeholder='Ex: São Paulo, SP'
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
                  isLoading={loading}
                  loadingText='Criando anúncio...'
                >
                  Publicar Anúncio
                </Button>
                <Button
                  variant='outline'
                  size='lg'
                  w='full'
                  onClick={() => navigate('/')}
                  isDisabled={loading}
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

export default CreateProduct

// Made with Bob
