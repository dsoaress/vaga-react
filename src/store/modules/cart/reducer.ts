import produce from 'immer'
import { Reducer } from 'redux'

import { CartState } from '../../../types/Cart'

const storagedCart = localStorage.getItem('cart')
let parsedStoragedCart: CartState | null = null
let INITIAL_STATE: CartState = {
  items: []
}

if (storagedCart) {
  parsedStoragedCart = JSON.parse(storagedCart)
}

if (parsedStoragedCart) {
  INITIAL_STATE = parsedStoragedCart
  console.log(parsedStoragedCart)
}

export const cart: Reducer<CartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'ADD_PRODUCT_TO_CART': {
        const { product } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity++
          localStorage.setItem('cart', JSON.stringify(draft))
        } else {
          draft.items.push({
            product,
            quantity: 1
          })

          localStorage.setItem('cart', JSON.stringify(draft))
        }

        break
      }

      case 'CHANGE_PRODUCT_QUANTITY': {
        const { product, quantity } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        draft.items[productInCartIndex].quantity = quantity
        localStorage.setItem('cart', JSON.stringify(draft))

        break
      }

      case 'REMOVE_PRODUCT_FROM_CART': {
        const { product } = action.payload

        const productInCartIndex = draft.items.findIndex(item => item.product.id === product.id)

        draft.items.splice(productInCartIndex, 1)
        localStorage.setItem('cart', JSON.stringify(draft))

        break
      }

      case 'CLEAN_CART_STATE': {
        draft.items = []
        localStorage.removeItem('cart')

        break
      }

      default: {
        return draft
      }
    }
  })
}
