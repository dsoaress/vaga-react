import { ProductType } from './Product'

type Item = {
  product: ProductType
  quantity: number
}

export type CartState = {
  items: Item[]
}
