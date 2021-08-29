import {
  Box,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Stack
} from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'

import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts'
import { ProductCardItem } from './ProductCardItem'
import { ProductListItem } from './ProductListItem'

export function Products() {
  const [category, setCategory] = useState<number | 'all'>('all')
  const [viewOptions, setViewOptions] = useState<'cards' | 'list'>('cards')

  const { data: products } = useProducts()
  const { data: categories } = useCategories()

  return (
    <Box maxW="container.lg" px={8} pb={12} mx="auto">
      <Flex color="gray.500" justify="space-between" py={8}>
        <Menu>
          <MenuButton>Categorias</MenuButton>
          <MenuList>
            <MenuItem onClick={() => setCategory('all')}>Todos os produtos</MenuItem>
            {categories?.map(category => (
              <MenuItem key={category.id} onClick={() => setCategory(category.id)}>
                {category.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        <HStack spacing={2}>
          <button>
            <HiOutlineViewGrid onClick={() => setViewOptions('cards')} />
          </button>
          <button>
            <HiOutlineViewList onClick={() => setViewOptions('list')} />
          </button>
        </HStack>
      </Flex>

      {viewOptions === 'cards' ? (
        <SimpleGrid columns={[1, 2, 2, 4]} gap={8}>
          {products?.map(product => {
            if (category !== 'all' && !product.categories.includes(category)) {
              return null
            }

            return <ProductCardItem key={product.id} product={product} />
          })}
        </SimpleGrid>
      ) : (
        <Stack spacing={8}>
          {products?.map(product => {
            if (category !== 'all' && !product.categories.includes(category)) {
              return null
            }

            return <ProductListItem key={product.id} product={product} />
          })}
        </Stack>
      )}
    </Box>
  )
}
