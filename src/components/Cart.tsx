import {
  Heading,
  HStack,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Text
} from '@chakra-ui/react'
import { BsTrash } from 'react-icons/bs'
import { useSelector } from 'react-redux'

import { CartState } from '../types/Cart'
import { State } from '../types/State'
import { formatPrice } from '../utils/formatPrice'
import { Container } from './Container'
import { EmptyCart } from './EmptyCart'

export function Cart() {
  const { items } = useSelector<State, CartState>(state => state.cart)

  return (
    <Container>
      {items.length ? (
        <>
          <Heading as="h2" fontSize={['2xl', null, '5xl']}>
            Seu carrinho
          </Heading>

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
                  <HStack spacing={6}>
                    <img src={item.product.image} alt={item.product.name} width={40} />
                    <Text>{item.product.name}</Text>
                  </HStack>

                  <HStack spacing={6}>
                    <NumberInput defaultValue={item.quantity} min={1} width={20}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>

                    <Text>{formatPrice(subtotal)}</Text>

                    <IconButton aria-label="Remover item" colorScheme="red" icon={<BsTrash />} />
                  </HStack>
                </HStack>
              )
            })}
          </Stack>
        </>
      ) : (
        <EmptyCart />
      )}
    </Container>
  )
}
