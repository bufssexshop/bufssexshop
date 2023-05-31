import './app.css';
import {
  Route, Router,
  Switch, Redirect,
} from 'react-router-dom';
import Content from './pages/Content';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Products from './pages/Products';
import { history } from './utils/history';
import Promotions from './pages/Promotions';
import LandingPage from './pages/LandingPage';
import ViewProduct from './pages/ViewProduct';

function PrivateRoute({children, ...rest}) {
  const token = localStorage.getItem('token-bufs')
  return (
    <Route {...rest} render={() => {
      return token ? children : <Redirect to="/home" />
    }} />
  )
}

function App() {
  return(
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/home">
          <LandingPage />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/promotions">
          <Promotions />
        </Route>
        <Route exact path="/content">
          <Content />
        </Route>
        <Route exact path="/contact">
          <Contact />
        </Route>
        <Route exact path="/view-product/:_id">
          <ViewProduct />
        </Route>
        <PrivateRoute exact path="/profile">
          <Profile />
        </PrivateRoute>
        {/* <PrivateRoute exact path="/editProduct">
          <Profile />
        </PrivateRoute> */}
      </Switch>
    </Router>
  )
}

export default App;
