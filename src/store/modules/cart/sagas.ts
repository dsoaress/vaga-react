import { all } from 'redux-saga/effects'

export const cart = all([
  'ADD_PRODUCT_TO_CART',
  'CHANGE_PRODUCT_QUANTITY',
  'REMOVE_PRODUCT_FROM_CART',
  'CLEAN_CART_STATE'
])
