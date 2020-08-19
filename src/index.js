import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import App from './App';
import store from './store/configureStore';
import * as serviceWorker from './serviceWorker';

import './index.css';
import { loadProducts } from './actions/productActions';
import { loadFilters } from './actions/filterActions';

store.dispatch(loadProducts());
store.dispatch(loadFilters());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
