import { Button, Flex, Text } from '@chakra-ui/react'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { addProductToCart } from '../store/modules/cart/actions'
import { ProductType } from '../types/Product'
import { formatPrice } from '../utils/formatPrice'

type ProductPriceProps = {
  product: ProductType
}

export function ProductPrice({ product }: ProductPriceProps) {
  const dispatch = useDispatch()

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCart(product))
  }, [dispatch, product])

  return (
    <Flex align="center" justify="space-between" px={4}>
      <Text>{formatPrice(product.price)}</Text>
      <Button onClick={handleAddProductToCart} colorScheme="blue" size="xs" borderRadius="full">
        Comprar
      </Button>
    </Flex>
  )
}
