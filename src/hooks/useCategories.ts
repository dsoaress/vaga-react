import { useQuery } from 'react-query'

import { api } from '../services/api'
import { CategoryType } from '../types/Category'

async function getCategories() {
  const { data: categories } = await api.get<CategoryType[]>('categories')
  return categories
}

export function useCategories() {
  return useQuery(['categories'], () => getCategories(), {
    staleTime: 1000 * 60 * 60 // 60 minutes
  })
}
