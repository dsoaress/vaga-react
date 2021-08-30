import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { SignInPage } from './pages/Auth/SignIn'
import { SignUpPage } from './pages/Auth/SignUp'
import { CartPage } from './pages/Cart'
import { CheckoutPage } from './pages/Checkout'
import { HomePage } from './pages/Home'
import { ProductPage } from './pages/Product'
import { ProfilePage } from './pages/Profile'
import { ScrollToTop } from './utils/scrollToTop'

export function Routes() {
  return (
    <Router>
      <Header />
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/cart" component={CartPage} />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/auth" component={SignInPage} />
        <Route exact path="/auth/sign-up" component={SignUpPage} />
        <Route path="/:productSlug" component={ProductPage} />
      </Switch>
      <Footer />
    </Router>
  )
}
