import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  LinkBox,
  LinkOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'

import { useUser } from '../contexts/UserContext'
import { changeProductQuantity, removeProductFromCart } from '../store/modules/cart/actions'
import { CartState } from '../types/Cart'
import { ProductType } from '../types/Product'
import { State } from '../types/State'
import { formatPrice } from '../utils/formatPrice'
import { handlePrefetchProduct } from '../utils/handlePrefetchProduct'
import { Container } from './Container'
import { EmptyCart } from './EmptyCart'

export function Cart() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useUser()
  const { items } = useSelector<State, CartState>(state => state.cart)

  const handleChangeProductQuantity = (product: ProductType, quantity: number) => {
    dispatch(changeProductQuantity(product, quantity))
  }

  const handleRemoveProductFromCart = (product: ProductType) => {
    dispatch(removeProductFromCart(product))
  }

  const totalPrice = formatPrice(
    items.reduce((sumTotal, item) => {
      return sumTotal + item.product.price * item.quantity
    }, 0)
  )

  return (
    <Container>
      {items.length ? (
        <>
          <HStack justify="space-between" spacing={8} mb={10}>
            <Heading as="h2" fontSize={['2xl', null, '5xl']}>
              Seu carrinho
            </Heading>

            {user ? (
              <Button
                onClick={() => history.push('/checkout')}
                colorScheme="blue"
                borderRadius="full"
              >
                Finalizar compra
              </Button>
            ) : (
              <Button onClick={() => history.push('/auth')} colorScheme="blue" borderRadius="full">
                Fazer login
              </Button>
            )}
          </HStack>

          <Stack spacing={6}>
            {items.map(item => {
              const subtotal = item.product.price * item.quantity

              return (
                <HStack
                  justify="space-between"
                  shadow="md"
                  borderRadius="lg"
                  p={4}
                  key={item.product.id}
                >
                  <LinkBox as={HStack} spacing={6}>
                    <img src={item.product.image} alt={item.product.name} width={40} />

                    <LinkOverlay
                      as={Link}
                      to={item.product.slug}
                      onMouseEnter={() => handlePrefetchProduct(item.product.slug)}
                    >
                      <Text>{item.product.name}</Text>
                    </LinkOverlay>
                  </LinkBox>
                  <HStack spacing={6}>
                    <NumberInput
                      defaultValue={item.quantity}
                      onChange={quantity =>
                        handleChangeProductQuantity(item.product, Number(quantity))
                      }
                      min={1}
                      max={10}
                      width={20}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Box width={32}>
                      <Text>{formatPrice(subtotal)}</Text>
                    </Box>

                    <IconButton
                      onClick={() => handleRemoveProductFromCart(item.product)}
                      aria-label="Remover item"
                      colorScheme="red"
                      icon={<BsTrash />}
                    />
                  </HStack>
                </HStack>
              )
            })}

            <Box>
              <Text textAlign="right">
                <strong>Total:</strong> {totalPrice}
              </Text>
            </Box>
          </Stack>
        </>
      ) : (
        <EmptyCart />
      )}
    </Container>
  )
}
