import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    body: '"Baloo 2", sans-serif',
    heading: 'Rubik, serif'
  },
  styles: {
    global: {
      body: {
        bg: 'white',
        color: 'gray.900'
      }
    }
  }
})
