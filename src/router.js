import  React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom';

import Products from './routes/Products';

const RouterConfig = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/products">Products</Link></li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
      <Route path="/Products" component={Products} />
    </div>
  </Router>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default RouterConfig;