import { ProductType } from '../../../types/Product'

export function addProductToCart(product: ProductType) {
  return {
    type: 'ADD_PRODUCT_TO_CART',
    payload: {
      product
    }
  }
}

export function changeProductQuantity(product: ProductType, quantity: number) {
  return {
    type: 'CHANGE_PRODUCT_QUANTITY',
    payload: {
      product,
      quantity
    }
  }
}

export function removeProductFromCart(product: ProductType) {
  return {
    type: 'REMOVE_PRODUCT_FROM_CART',
    payload: {
      product
    }
  }
}

export function cleanCartState() {
  return {
    type: 'CLEAN_CART_STATE'
  }
}
