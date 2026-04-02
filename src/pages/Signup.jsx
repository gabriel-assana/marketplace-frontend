import React, { useState } from 'react'
import {
  Container,
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Link,
  Alert,
  AlertIcon,
  AlertDescription,
  InputGroup,
  InputRightElement,
  IconButton,
  FormHelperText
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Signup() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Limpa erro ao digitar
    if (error) setError('')
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Nome é obrigatório')
      return false
    }

    if (!formData.email.trim()) {
      setError('Email é obrigatório')
      return false
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres')
      return false
    }

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem')
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

    setLoading(true)

    try {
      const result = await signup(
        formData.name,
        formData.email,
        formData.password
      )

      if (result.success) {
        // Redireciona para home após cadastro bem-sucedido
        navigate('/')
      } else {
        setError(result.error || 'Erro ao realizar cadastro')
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Container maxW='container.sm' py={12}>
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
          <Box textAlign='center'>
            <Heading size='xl' color='heading' mb={2}>
              Criar Conta
            </Heading>
            <Text color='text'>
              Preencha os dados para se cadastrar
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
            <VStack spacing={4}>
              {/* Nome */}
              <FormControl isRequired>
                <FormLabel color='heading'>Nome Completo</FormLabel>
                <Input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  placeholder='João Silva'
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Email */}
              <FormControl isRequired>
                <FormLabel color='heading'>Email</FormLabel>
                <Input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='seu@email.com'
                  size='lg'
                  focusBorderColor='brand.500'
                />
              </FormControl>

              {/* Senha */}
              <FormControl isRequired>
                <FormLabel color='heading'>Senha</FormLabel>
                <InputGroup size='lg'>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Mínimo 6 caracteres'
                    focusBorderColor='brand.500'
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={togglePasswordVisibility}
                      variant='ghost'
                      aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      size='sm'
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  A senha deve ter no mínimo 6 caracteres
                </FormHelperText>
              </FormControl>

              {/* Confirmar Senha */}
              <FormControl isRequired>
                <FormLabel color='heading'>Confirmar Senha</FormLabel>
                <InputGroup size='lg'>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Digite a senha novamente'
                    focusBorderColor='brand.500'
                  />
                  <InputRightElement>
                    <IconButton
                      icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={toggleConfirmPasswordVisibility}
                      variant='ghost'
                      aria-label={showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'}
                      size='sm'
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              {/* Botão de Cadastro */}
              <Button
                type='submit'
                colorScheme='purple'
                size='lg'
                w='full'
                isLoading={loading}
                loadingText='Cadastrando...'
              >
                Cadastrar
              </Button>
            </VStack>
          </form>

          {/* Link para login */}
          <Box textAlign='center' pt={4}>
            <Text color='text'>
              Já tem uma conta?{' '}
              <Link
                as={RouterLink}
                to='/login'
                color='brand.500'
                fontWeight='semibold'
                _hover={{ color: 'brand.600' }}
              >
                Faça login
              </Link>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

export default Signup

// Made with Bob
