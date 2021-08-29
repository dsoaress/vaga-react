import { ChakraProvider } from '@chakra-ui/react'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { CartPage } from './pages/Cart'
import { HomePage } from './pages/Home'
import { ProductPage } from './pages/Product'
import { ProfilePage } from './pages/Profile'
import { queryClient } from './services/queryClient'
import { store } from './store'
import { theme } from './styles/theme'
import { ScrollToTop } from './utils/scrollToTop'

export function App() {
  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <Router>
            <Header />
            <ScrollToTop />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/cart" component={CartPage} />
              <Route exact path="/profile" component={ProfilePage} />
              <Route path="/:productSlug" component={ProductPage} />
            </Switch>
            <Footer />
          </Router>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ReduxProvider>
  )
}
