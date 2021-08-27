import { Box, HStack, SimpleGrid, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'

import { api } from '../services/api'
import { ProductCardItem } from './ProductCardItem'
import { ProductListItem } from './ProductListItem'

type Product = {
  id: number
  name: string
  description: string
  image: string
  price: number
  categories: string[]
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [viewOptions, setViewOptions] = useState<'cards' | 'list'>('cards')

  useEffect(() => {
    api.get('/products').then(response => {
      setProducts(response.data)
    })
  }, [])

  console.log(products)

  return (
    <Box maxW="container.lg" px={8} mx="auto">
      <HStack color="gray.500" py={8}>
        <button>
          <HiOutlineViewGrid onClick={() => setViewOptions('cards')} />
        </button>
        <button>
          <HiOutlineViewList onClick={() => setViewOptions('list')} />
        </button>
      </HStack>

      {viewOptions === 'cards' ? (
        <SimpleGrid columns={[1, 2, 2, 4]} gap={8}>
          {products.map(product => (
            <ProductCardItem key={product.id} product={product} />
          ))}
        </SimpleGrid>
      ) : (
        <Stack spacing={8}>
          {products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </Stack>
      )}
    </Box>
  )
}
