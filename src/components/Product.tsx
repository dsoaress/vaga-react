import { Box, Button, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'

import { useProduct } from '../hooks/useProducts'
import { formatPrice } from '../utils/formatPrice'
import { Reviews } from './Reviews'

export function Product() {
  const { productSlug }: { productSlug: string } = useParams()
  const { data } = useProduct(productSlug)

  if (!data) return <p>loading...</p>

  return (
    <Box maxW="container.lg" px={8} py={12} mx="auto">
      <SimpleGrid columns={[null, null, 2]} alignItems="center" mb={16}>
        <Stack spacing={6}>
          <Heading as="h2" fontSize={['2xl', null, '5xl']}>
            {data?.product.name}
          </Heading>
          <Text fontSize={[null, null, 'xl']}>{data?.product?.description}</Text>

          <Flex align="center" justify="space-between">
            <Text>{formatPrice(data?.product.price)}</Text>

            <Button colorScheme="blue" borderRadius="full">
              Comprar
            </Button>
          </Flex>
        </Stack>
        <Image src={data?.product.image} alt={data?.product.name} />
      </SimpleGrid>
      <Reviews reviews={data?.reviews} />
    </Box>
  )
}
