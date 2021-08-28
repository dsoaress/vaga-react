import { Button, Flex, Text } from '@chakra-ui/react'

import { formatPrice } from '../utils/formatPrice'

type ProductPriceProps = {
  price: number
}

export function ProductPrice({ price }: ProductPriceProps) {
  return (
    <Flex align="center" justify="space-between" px={4}>
      <Text>{formatPrice(price)}</Text>
      <Button colorScheme="blue" size="xs" borderRadius="full">
        Comprar
      </Button>
    </Flex>
  )
}
