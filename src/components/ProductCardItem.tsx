import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'

import { formatPrice } from '../utils/formatPrice'

type Product = {
  name: string
  description: string
  image: string
  price: number
}

type ProductCardItemProps = {
  product: Product
}

export function ProductCardItem({ product }: ProductCardItemProps) {
  return (
    <Stack justify="space-between" py={4} shadow="md" borderRadius="lg" bg="white">
      <Box px={4}>
        <Heading as="h2" fontSize="lg">
          {product.name}
        </Heading>
        <Text noOfLines={2}>{product.description}</Text>
      </Box>

      <Flex align="center" justify="space-between" px={4}>
        <Text>{formatPrice(product.price)}</Text>
        <Button colorScheme="blue" size="xs">
          Comprar
        </Button>
      </Flex>
    </Stack>
  )
}
