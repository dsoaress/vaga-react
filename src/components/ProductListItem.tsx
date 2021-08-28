import { Flex, Image, Stack } from '@chakra-ui/react'

import { ProductType } from '../types/Product'
import { ProductDescription } from './ProductDescription'
import { ProductPrice } from './ProductPrice'

type ProductListItemProps = {
  product: ProductType
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <Flex align="center" py={4} shadow="md" borderRadius="lg" bg="white">
      <Image src={product.image} alt={product.name} width={52} />
      <Stack justify="space-between">
        <ProductDescription name={product.name} description={product.description} />
        <ProductPrice price={product.price} />
      </Stack>
    </Flex>
  )
}
