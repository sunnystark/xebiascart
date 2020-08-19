import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';
import ProductListingPage from './pages/ProductListingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/'>
          <ProductListingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
