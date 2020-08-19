import { combineReducers } from 'redux';
import filterableProductListReducer from './filterableProductListReducer';
import productListReducer from './productListReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
  filterable_product_list:filterableProductListReducer,
  product_list:productListReducer,
  filter:filterReducer
})

export default rootReducer;
