import { Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

import { CartState } from '../types/Cart'
import { State } from '../types/State'
import { formatPrice } from '../utils/formatPrice'

export function CartPage() {
  const { items } = useSelector<State, CartState>(state => state.cart)

  return (
    <div>
      <h1>Cart</h1>

      {items.map(item => {
        return (
          <div key={item.product.id}>
            <Text>
              {item.product.name} - {item.quantity} -{' '}
              {formatPrice(item.product.price * item.quantity)}
            </Text>
          </div>
        )
      })}
    </div>
  )
}
