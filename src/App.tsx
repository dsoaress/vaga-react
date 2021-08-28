import { ChakraProvider } from '@chakra-ui/react'

import { HomePage } from './pages/Home'
import { makeServer } from './services/mirage'
import { theme } from './styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <HomePage />
    </ChakraProvider>
  )
}
