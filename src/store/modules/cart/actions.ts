import { ProductType } from '../../../types/Product'

export function addProductToCart(product: ProductType) {
  return {
    type: 'ADD_PRODUCT_TO_CART',
    payload: {
      product
    }
  }
}
