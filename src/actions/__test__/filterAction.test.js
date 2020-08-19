
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { 
  FILTERS_LOADING,
  FILTERS_RECEIVED,
  FILTERS_FETCH_ERROR,
  loadFilters,
  ADD_COLOR_TO_FILTER,
  addColorToFilter,
  removeColorFromFilter,
  REMOVE_COLOR_FROM_FILTER,
  ADD_BRAND_TO_FILTER,
  addBrandToFilter,
  REMOVE_BRAND_FROM_FILTER,
  removeBrandFromFilter,
  addMinPriceToFilter,
  ADD_MIN_PRICE_TO_FILTER,
  REMOVE_MIN_PRICE_FROM_FILTER,
  removeMinPriceFromFilter,
  ADD_MAX_PRICE_TO_FILTER,
  addMaxPriceToFilter,
  REMOVE_MAX_PRICE_FROM_FILTER,
  removeMaxPriceFromFilter
} from '../filterActions';

jest.mock('../../services/filterService');

import { fetchFiltersFromServer } from '../../services/filterService';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Filter action', () => {
  it('should dispatch actions for loading filters list successfully', async () => {
    const spy = fetchFiltersFromServer.mockReturnValue(Promise.resolve([]));
    spy.mockClear();

    const store = mockStore({});

    await store.dispatch(loadFilters());
    expect(spy).toHaveBeenCalled();

    const expectedActions = [
      {type:FILTERS_LOADING},
      {type:FILTERS_RECEIVED, payload:[]}
    ]
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch actions for loading filters list fail', async () => {
    const spy = fetchFiltersFromServer.mockReturnValue(Promise.reject({error:''}));
    spy.mockClear();
    
    const store = mockStore({});

    await store.dispatch(loadFilters());
    expect(spy).toHaveBeenCalled();

    const expectedActions = [
      {type:FILTERS_LOADING},
      {type:FILTERS_FETCH_ERROR, payload:{error:''}}
    ]
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on color selection', () => {
    const color = '#ffffff'
    const store = mockStore({});
    store.dispatch(addColorToFilter(color));
    const expectedActions = [
      {type:ADD_COLOR_TO_FILTER, payload:color}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on color deselection', () => {
    const color = '#ffffff'
    const store = mockStore({});
    store.dispatch(removeColorFromFilter(color));
    const expectedActions = [
      {type:REMOVE_COLOR_FROM_FILTER, payload:color}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on brand selection', () => {
    const brand = 'raymond'
    const store = mockStore({});
    store.dispatch(addBrandToFilter(brand));
    const expectedActions = [
      {type:ADD_BRAND_TO_FILTER, payload:brand}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on brand deselection', () => {
    const brand = 'raymond'
    const store = mockStore({});
    store.dispatch(removeBrandFromFilter(brand));
    const expectedActions = [
      {type:REMOVE_BRAND_FROM_FILTER, payload:brand}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on price min selection', () => {
    const min = 1000
    const store = mockStore({});
    store.dispatch(addMinPriceToFilter(min));
    const expectedActions = [
      {type:ADD_MIN_PRICE_TO_FILTER, payload:min}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on price min deselection', () => {
    const min = 1000
    const store = mockStore({});
    store.dispatch(removeMinPriceFromFilter(min));
    const expectedActions = [
      {type:REMOVE_MIN_PRICE_FROM_FILTER, payload:min}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on price max selection', () => {
    const max = 3000
    const store = mockStore({});
    store.dispatch(addMaxPriceToFilter(max));
    const expectedActions = [
      {type:ADD_MAX_PRICE_TO_FILTER, payload:max}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
  it('should dispatch action for filter update on price max deselection', () => {
    const max = 3000
    const store = mockStore({});
    store.dispatch(removeMaxPriceFromFilter(max));
    const expectedActions = [
      {type:REMOVE_MAX_PRICE_FROM_FILTER, payload:max}
    ];
    const storeActions = store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
})
