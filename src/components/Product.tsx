import { Button, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useProduct } from '../hooks/useProducts'
import { addProductToCart } from '../store/modules/cart/actions'
import { formatPrice } from '../utils/formatPrice'
import { Container } from './Container'
import { Reviews } from './Reviews'
import { Spinner } from './Spinner'

export function Product() {
  const dispatch = useDispatch()
  const { productSlug }: { productSlug: string } = useParams()
  const { data } = useProduct(productSlug)

  if (!data) {
    return <Spinner />
  }

  const { product, reviews } = data

  const handleAddProductToCart = () => {
    dispatch(addProductToCart(product))
  }

  return (
    <Container>
      <SimpleGrid columns={[null, null, 2]} alignItems="center" mb={16}>
        <Stack spacing={6}>
          <Heading as="h2" fontSize={['2xl', null, '5xl']}>
            {product.name}
          </Heading>
          <Text fontSize={[null, null, 'xl']}>{product?.description}</Text>

          <Flex align="center" justify="space-between">
            <Text>{formatPrice(product.price)}</Text>

            <Button onClick={handleAddProductToCart} colorScheme="blue" borderRadius="full">
              Comprar
            </Button>
          </Flex>
        </Stack>
        <Image src={product.image} alt={product.name} />
      </SimpleGrid>
      <Reviews reviews={reviews} />
    </Container>
  )
}
