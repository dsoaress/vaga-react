import { useQuery } from 'react-query'

import { api } from '../services/api'
import { ProductType } from '../types/Product'

async function getProducts() {
  const { data: products } = await api.get<ProductType[]>('products')
  return products
}

export async function getProduct(slug: string) {
  const { data } = await api.get<ProductType[]>('products', {
    params: {
      slug
    }
  })

  const product = data[0]

  const { data: reviews } = await api.get('/reviews', {
    params: {
      productsId: product.id,
      _expand: 'users'
    }
  })

  return { product, reviews }
}

export function useProducts() {
  return useQuery(['products'], () => getProducts(), {
    staleTime: 1000 * 60 * 60 // 60 minutes
  })
}

export function useProduct(slug: string) {
  return useQuery(['product', slug], () => getProduct(slug), {
    staleTime: 1000 * 60 * 60 // 60 minutes
  })
}
