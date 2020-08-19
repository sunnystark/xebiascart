import {processRequest} from './baseService.js';

export const fetchProductListFromServer = () => {
  let options = {
    method:'GET'
  }
  return processRequest('/products', options)
}