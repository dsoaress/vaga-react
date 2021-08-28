import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { HomePage } from './pages/Home'
import { ProductPage } from './pages/Product'
import { theme } from './styles/theme'

export function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/:productSlug" component={ProductPage} />
        </Switch>
      </Router>
    </ChakraProvider>
  )
}
