import React from 'react'
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Badge,
  Flex,
  Box
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { formatPrice } from '../utils/formatters'

function ProductCard({ product }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/products/${product.id}`)
  }

  return (
    <Card
      maxW='sm'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{
        transform: 'translateY(-8px)',
        shadow: 'xl',
        borderColor: 'brand.500'
      }}
      cursor='pointer'
      borderWidth='1px'
      borderColor='border'
      bg='cardBg'
      onClick={handleClick}
    >
      <Image
        src={product.imageUrl}
        alt={product.title}
        objectFit='cover'
        h='250px'
        w='100%'
        fallbackSrc='https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&h=250&fit=crop'
      />

      <CardBody>
        <Stack spacing='3'>
          <Flex justify='space-between' align='center'>
            <Badge colorScheme='purple' fontSize='0.8em' px={2} py={1}>
              {product.category}
            </Badge>
          </Flex>

          <Heading size='md' color='heading' noOfLines={2}>
            {product.title}
          </Heading>

          <Text color='text' fontSize='sm' noOfLines={2}>
            {product.description}
          </Text>

          <Flex justify='space-between' align='center' mt={2}>
            <Box>
              <Text fontSize='2xl' color='brand.500' fontWeight='bold'>
                {formatPrice(product.price)}
              </Text>
            </Box>
          </Flex>

          <Flex align='center' mt={2}>
            <Text fontSize='sm' color='gray.600'>
              Vendedor: <Text as='span' fontWeight='semibold' color='text'>
                {product.seller.name}
              </Text>
            </Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  )
}

export default ProductCard
