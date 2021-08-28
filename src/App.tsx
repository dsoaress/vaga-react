import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'

import { HomePage } from './pages/Home'
import { ProductPage } from './pages/Product'
import { queryClient } from './services/queryClient'
import { theme } from './styles/theme'
import { ScrollToTop } from './utils/scrollToTop'

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Router>
          <div>
            <Link to="/">Home</Link>
          </div>
          <ScrollToTop />
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/:productSlug" component={ProductPage} />
          </Switch>
        </Router>
      </ChakraProvider>
    </QueryClientProvider>
  )
}
