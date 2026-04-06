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
  IconButton
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await login(formData.email, formData.password)

      if (result.success) {
        // Redireciona para home após login bem-sucedido
        navigate('/')
      } else {
        setError(result.error || 'Erro ao realizar login')
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
              Bem-vindo de volta!
            </Heading>
            <Text color='text'>
              Entre com suas credenciais para continuar
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
                    placeholder='Sua senha'
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
              </FormControl>

              {/* Botão de Login */}
              <Button
                type='submit'
                colorScheme='purple'
                size='lg'
                w='full'
                isLoading={loading}
                loadingText='Entrando...'
              >
                Entrar
              </Button>
            </VStack>
          </form>

          {/* Link para cadastro */}
          <Box textAlign='center' pt={4}>
            <Text color='text'>
              Não tem uma conta?{' '}
              <Link
                as={RouterLink}
                to='/signup'
                color='brand.500'
                fontWeight='semibold'
                _hover={{ color: 'brand.600' }}
              >
                Cadastre-se
              </Link>
            </Text>
          </Box>

          {/* Dica para teste */}
          <Box
            bg='purple.50'
            p={4}
            borderRadius='md'
            borderWidth='1px'
            borderColor='purple.200'
          >
            <Text fontSize='sm' color='purple.700' fontWeight='semibold' mb={2}>
              💡 Para testar (dados mockados):
            </Text>
            <Text fontSize='sm' color='purple.600'>
              Email: <strong>joao@email.com</strong>
              <br />
              Senha: <strong>123456</strong>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  )
}

export default Login

