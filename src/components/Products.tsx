import {
  Button,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Tooltip
} from '@chakra-ui/react'
import { useState } from 'react'
import { HiOutlineViewGrid, HiOutlineViewList } from 'react-icons/hi'

import { useCategories } from '../hooks/useCategories'
import { useProducts } from '../hooks/useProducts'
import { Container } from './Container'
import { ProductCardItem } from './ProductCardItem'
import { ProductListItem } from './ProductListItem'
import { Spinner } from './Spinner'

export function Products() {
  const [category, setCategory] = useState<number | 'all'>('all')
  const [isCardView, setIsCardView] = useState(true)

  const { data: products } = useProducts()
  const { data: categories } = useCategories()

  if (!products) {
    return <Spinner />
  }

  return (
    <Container>
      <Flex color="gray.500" align="center" justify="space-between" pb={8}>
        <Menu>
          <MenuButton as={Button}>Categorias</MenuButton>
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
          <Tooltip hasArrow label="Visualização por cards" borderRadius="md">
            <IconButton
              aria-label="Visualização por cards"
              onClick={() => setIsCardView(true)}
              icon={<HiOutlineViewGrid />}
            />
          </Tooltip>

          <Tooltip hasArrow label="Visualização por lista" borderRadius="md">
            <IconButton
              aria-label="Visualização por lista"
              onClick={() => setIsCardView(false)}
              icon={<HiOutlineViewList />}
            />
          </Tooltip>
        </HStack>
      </Flex>

      <SimpleGrid {...(isCardView && { columns: [1, 2, 2, 4] })} gap={8}>
        {products?.map(product => {
          if (category !== 'all' && !product.categories.includes(category)) {
            return null
          }

          if (isCardView) {
            return <ProductCardItem key={product.id} product={product} />
          } else {
            return <ProductListItem key={product.id} product={product} />
          }
        })}
      </SimpleGrid>
    </Container>
  )
}
