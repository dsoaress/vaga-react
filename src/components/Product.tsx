import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { api } from '../services/api'
import { ProductType } from '../types/Product'

export function Product() {
  const { productSlug }: { productSlug: string } = useParams()
  const [product, setProduct] = useState<ProductType>()

  useEffect(() => {
    api.get(`/products?slug=${productSlug}`).then(response => {
      setProduct(response.data[0])
    })
  }, [productSlug])

  return (
    <Box maxW="container.lg" px={8} py={12} mx="auto">
      {product?.name}
    </Box>
  )
}
