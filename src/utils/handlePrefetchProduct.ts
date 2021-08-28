import { getProduct } from '../hooks/useProducts'
import { queryClient } from '../services/queryClient'

export async function handlePrefetchProduct(slug: string) {
  await queryClient.prefetchQuery(['product', slug], async () => getProduct(slug), {
    staleTime: 1000 * 60 * 60 // 60 minutes
  })
}
