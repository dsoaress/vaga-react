import { createServer } from 'miragejs'

import { products } from './products'
import { reviews } from './reviews'
import { stock } from './stock'
import { users } from './users'

export function makeServer() {
  const server = createServer({
    routes() {
      this.namespace = 'api'

      this.get('/products', () => {
        return products
      })

      this.get('/reviews', () => {
        return reviews
      })

      this.post('/reviews', (_schema, request) => {
        let newId = 65
        const attrs = JSON.parse(request.requestBody)
        attrs.id = newId++
        return { reviews: attrs }
      })

      this.get('/stock', () => {
        return stock
      })

      this.get('/users', () => {
        return users
      })

      this.post('/users', (_schema, request) => {
        let newId = 9
        const attrs = JSON.parse(request.requestBody)
        attrs.id = newId++
        return { users: attrs }
      })
    }
  })

  return server
}
