import React from 'react'
import { 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Box,
  Icon,
  useColorModeValue
} from '@chakra-ui/react'
import { WarningIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()
  const bgGradient = useColorModeValue(
    'linear(to-br, purple.50, pink.50)',
    'linear(to-br, purple.900, pink.900)'
  )

  return (
    <Container maxW='container.xl' py={20}>
      <Box
        minH='60vh'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <VStack spacing={8} textAlign='center'>
          <Box
            position='relative'
            display='inline-block'
          >
            <Icon
              as={WarningIcon}
              boxSize={{ base: '80px', md: '120px' }}
              color='brand.500'
              animation='pulse 2s ease-in-out infinite'
            />
          </Box>

          <Heading
            size='4xl'
            bgGradient={bgGradient}
            bgClip='text'
            fontWeight='extrabold'
            letterSpacing='tight'
          >
            404
          </Heading>

          <Heading
            size='xl'
            color='heading'
            fontWeight='bold'
          >
            Página Não Encontrada
          </Heading>

          <Text
            fontSize='lg'
            color='text'
            maxW='md'
            lineHeight='tall'
          >
            Ops! A página que você está procurando não existe ou foi movida.
            Que tal voltar para a página inicial?
          </Text>

          <VStack spacing={4} pt={4}>
            <Button
              colorScheme='purple'
              size='lg'
              onClick={() => navigate('/')}
              px={8}
              _hover={{
                transform: 'translateY(-2px)',
                shadow: 'lg'
              }}
              transition='all 0.3s'
            >
              Voltar para Home
            </Button>

            <Button
              variant='ghost'
              colorScheme='purple'
              size='md'
              onClick={() => navigate(-1)}
            >
              Voltar para página anterior
            </Button>
          </VStack>

          <Box
            position='absolute'
            top='50%'
            left='50%'
            transform='translate(-50%, -50%)'
            opacity={0.05}
            fontSize='300px'
            fontWeight='bold'
            color='brand.500'
            zIndex={-1}
            display={{ base: 'none', md: 'block' }}
          >
            404
          </Box>
        </VStack>
      </Box>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.1);
              opacity: 0.8;
            }
          }
        `}
      </style>
    </Container>
  )
}

export default NotFound
