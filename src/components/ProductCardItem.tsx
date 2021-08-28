import { Image, LinkBox, LinkOverlay, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import { ProductType } from '../types/Product'
import { ProductDescription } from './ProductDescription'
import { ProductPrice } from './ProductPrice'

type ProductCardItemProps = {
  product: ProductType
}

export function ProductCardItem({ product }: ProductCardItemProps) {
  return (
    <LinkBox as={Stack} justify="space-between" py={4} shadow="md" borderRadius="lg" bg="white">
      <LinkOverlay as={Link} to={product.slug}>
        <ProductDescription name={product.name} description={product.description} noOfLines={2} />
      </LinkOverlay>
      <Image src={product.image} alt={product.name} />
      <ProductPrice price={product.price} />
    </LinkBox>
  )
}
