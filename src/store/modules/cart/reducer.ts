import produce from 'immer'
import { Reducer } from 'redux'

import { CartState } from '../../../types/Cart'

const INITIAL_STATE: CartState = {
  items: []
}

export const cart: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_PRODUCT_TO_CART': {
        const { product } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++
        } else {
          draft.items.push({
            product,
            quantity: 1
          })
        }

        break
      }

      case 'CHANGE_PRODUCT_QUANTITY': {
        const { product, quantity } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        draft.items[productInCartIndex].quantity = quantity

        break
      }

      case 'REMOVE_PRODUCT_FROM_CART': {
        const { product } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        draft.items.splice(productInCartIndex, 1)

        break
      }

      default: {
        return draft
      }
    }
  })
}
