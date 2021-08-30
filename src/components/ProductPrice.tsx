import { Button, Flex, Text, useToast } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'

import { addProductToCart } from '../store/modules/cart/actions'
import { ProductType } from '../types/Product'
import { formatPrice } from '../utils/formatPrice'

type ProductPriceProps = {
  product: ProductType
}

export function ProductPrice({ product }: ProductPriceProps) {
  const dispatch = useDispatch()
  const toast = useToast()

  function handleAddProductToCart() {
    dispatch(addProductToCart(product))

    toast({
      title: 'Item adicionado com sucesso',
      description: `${product.name} foi adicionado ao seu carrinho de compras`,
      status: 'success',
      duration: 6000
    })
  }

  return (
    <Flex align="center" justify="space-between" px={4}>
      <Text>{formatPrice(product.price)}</Text>
      <Button onClick={handleAddProductToCart} colorScheme="blue" size="xs" borderRadius="full">
        Comprar
      </Button>
    </Flex>
  )
}
