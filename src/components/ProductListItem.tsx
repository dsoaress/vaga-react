import { Box, Button, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'

import { formatPrice } from '../utils/formatPrice'

type Product = {
  name: string
  description: string
  image: string
  price: number
}

type ProductListItemProps = {
  product: Product
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Flex align="center" py={4} shadow="md" borderRadius="lg" bg="white">
      <Image src={product.image} alt={product.name} width={52} />

      <Stack justify="space-between">
        <Box px={4}>
          <Heading as="h2" fontSize="xl" mb={4}>
            {product.name}
          </Heading>
          <Text>{product.description}</Text>
        </Box>

        <Flex align="center" justify="space-between" px={4}>
          <Text>{formatPrice(product.price)}</Text>
          <Button colorScheme="blue" size="xs">
            Comprar
          </Button>
        </Flex>
      </Stack>
    </Flex>
  )
}
