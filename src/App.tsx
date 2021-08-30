import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider as ReduxProvider } from 'react-redux'

import { UserProvider } from './contexts/UserContext'
import { Routes } from './Routes'
import { queryClient } from './services/queryClient'
import { store } from './store'
import { theme } from './styles/theme'

export function App() {
  return (
    <ReduxProvider store={store}>
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider theme={theme}>
            <Routes />
          </ChakraProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </UserProvider>
    </ReduxProvider>
  )
}
