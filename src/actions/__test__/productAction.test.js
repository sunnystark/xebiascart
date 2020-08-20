
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
  PRODUCT_LIST_FETCHING,
  PRODUCT_LIST_RECEIVED,
  PRODUCT_LIST_FETCH_ERROR,
  loadProducts, 
  filterProductList,
  FILTER_PRODUCT_LIST
} from '../productActions';

jest.mock('../../services/productService');

import { fetchProductListFromServer } from '../../services/productService';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Product action', () => {
  it('should dispatch actions for loading list successfully', async () => {
    const spy = fetchProductListFromServer.mockReturnValue(Promise.resolve([]));
    spy.mockClear();

    const store = mockStore({
      filter: {applied_filters: {}},
      filterable_product_list:{}
    });

    await store.dispatch(loadProducts());
    expect(spy).toHaveBeenCalled();

    const expectedActions = [
      {type:PRODUCT_LIST_FETCHING},
      {type:PRODUCT_LIST_RECEIVED, payload:[]},
      {type:FILTER_PRODUCT_LIST, payload:{applied_filters:{}, filterable_product_list:{}}}
    ]
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  })

  it('should dispatch actions for loading list fail', async () => {
    const spy = fetchProductListFromServer.mockReturnValue(Promise.reject({error:''}));
    spy.mockClear();
    
    const store = mockStore({});

    await store.dispatch(loadProducts());
    expect(spy).toHaveBeenCalled();

    const expectedActions = [
      {type:PRODUCT_LIST_FETCHING},
      {type:PRODUCT_LIST_FETCH_ERROR, payload:{error:''}}
    ]
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  })

  it('should dispatch action for filtering product list to display', () => {
    const storeState = {
      filter:{ applied_filters:[] },
      filterable_product_list: {}
    }
    const store = mockStore(storeState);
    store.dispatch(filterProductList())

    const expectedActions = [
      {type:FILTER_PRODUCT_LIST, payload: {
        applied_filters: [],
        filterable_product_list: {}
      }}
    ]
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  })
})