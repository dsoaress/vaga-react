import { ChakraProvider, Heading } from '@chakra-ui/react'

import { makeServer } from './services/mirage'
import { theme } from './styles/theme'

makeServer()

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Heading>Hello</Heading>
    </ChakraProvider>
  )
}
