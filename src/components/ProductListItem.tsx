import { Flex, Image, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ProductType } from '../types/Product'
import { handlePrefetchProduct } from '../utils/handlePrefetchProduct'
import { ProductDescription } from './ProductDescription'
import { ProductPrice } from './ProductPrice'

type ProductListItemProps = {
  product: ProductType
}

export function ProductListItem({ product }: ProductListItemProps) {
  return (
    <LinkBox as={Flex} align="center" py={4} shadow="md" borderRadius="lg">
      <Image src={product.image} alt={product.name} width={52} />
      <Stack justify="space-between">
        <LinkOverlay
          as={Link}
          to={product.slug}
          onMouseEnter={() => handlePrefetchProduct(product.slug)}
        >
          <ProductDescription name={product.name} description={product.description} />
        </LinkOverlay>
        <ProductPrice product={product} />
      </Stack>
    </LinkBox>
  )
}
