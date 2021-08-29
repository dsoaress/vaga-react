import {
  Avatar,
  Box,
  Circle,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList
} from '@chakra-ui/react'
import { CgShoppingCart } from 'react-icons/cg'
import { Link, useHistory } from 'react-router-dom'

import logo from '../assets/logo.svg'

export function Header() {
  const history = useHistory()

  return (
    <Box as="header" shadow="md">
      <Flex align="center" justify="space-between" maxW="container.lg" px={8} py={4} mx="auto">
        <Link to="/">
          <img src={logo} alt="Techno Store" width={116} height={40} />
        </Link>
        <HStack spacing={6}>
          <Box position="relative">
            <IconButton
              variant="unstyled"
              aria-label="Carrinho de compras"
              icon={<CgShoppingCart size={20} />}
              onClick={() => history.push('/cart')}
            />
            <Circle
              position="absolute"
              bottom={1}
              right={1}
              size={4}
              bg="red.500"
              color="white"
              fontSize="xs"
            >
              5
            </Circle>
          </Box>

          <Menu>
            <MenuButton>
              <Avatar src="https://github.com/dsoaress.png" name="Daniel Soares" />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => history.push('/profile')}>Edite seu perfil</MenuItem>
              <MenuItem>Sair</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>
    </Box>
  )
}
