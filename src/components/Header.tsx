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
import { useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import logo from '../assets/logo.svg'
import { useUser } from '../contexts/UserContext'
import { CartState } from '../types/Cart'
import { State } from '../types/State'

export function Header() {
  const history = useHistory()
  const { user, signOut } = useUser()
  const { items } = useSelector<State, CartState>(state => state.cart)

  return (
    <Box as="header" shadow="md">
      <Flex align="center" justify="space-between" maxW="container.lg" px={8} height={16} mx="auto">
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
            {items.length > 0 && (
              <Circle
                position="absolute"
                bottom={1}
                right={1}
                size={4}
                bg="red.500"
                color="white"
                fontSize="xs"
              >
                {items.length}
              </Circle>
            )}
          </Box>

          {user ? (
            <Menu>
              <MenuButton>
                <Avatar bg="gray.400" color="white" size="sm" src={user.avatar} name={user.name} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => history.push('/profile')}>Edite seu perfil</MenuItem>
                <MenuItem onClick={signOut}>Sair</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Link to="/auth">
              <Avatar bg="gray.400" color="white" size="sm" />
            </Link>
          )}
        </HStack>
      </Flex>
    </Box>
  )
}
