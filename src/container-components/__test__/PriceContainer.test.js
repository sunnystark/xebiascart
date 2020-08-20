import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as FilterActions from '../../actions/filterActions';
import * as ProductActions from '../../actions/productActions'

jest.mock('../../actions/filterActions');
jest.mock('../../actions/productActions');

import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import PriceContainer from '../PriceContainer';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const storeState = {
  filter:{
    applied_filters: {
      price:[-1, -1]
    }
  }
}

const props = {
  values:[
    {displayValue: "Min", key: "Min"},
    {displayValue: "₹500", key: "500"},
    {displayValue: "₹1000", key: "1000"},
    {displayValue: "₹1500", key: "1500"},
    {displayValue: "₹2000", key: "2000"},
    {displayValue: "₹3000", key: "3000"},
    {displayValue: "₹4000", key: "4000"},
    {displayValue: "₹4000+", key: "Max"}
  ],
}

describe('Color container', () => {
  let store, wrapper, priceCard, handleMinChange, handleMaxChange;
  beforeEach(() =>{
    store = mockStore(storeState);
    store.dispatch = jest.fn();

    wrapper = mount(<Provider store={store}>
      <PriceContainer {...props} />
    </Provider>);
    priceCard = wrapper.find('PriceCard');
    handleMinChange = priceCard.props().handleMinChange;
    handleMaxChange = priceCard.props().handleMaxChange;
  });

  it('should render with props', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('should dispatch action for add minimum price to filter', () => {
    handleMinChange({target:{value:'1000'}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.addMinPriceToFilter).toHaveBeenCalled();
    expect(FilterActions.addMinPriceToFilter).toHaveBeenCalledWith(1000);
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  });

  it('should dispatch action for remove minimum price from filter', () => {
    handleMinChange({target:{value:'min'}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.removeMinPriceFromFilter).toHaveBeenCalled();
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  });

  it('should dispatch action for add maximum price to filter', () => {
    handleMaxChange({target:{value:'1000'}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.addMaxPriceToFilter).toHaveBeenCalled();
    expect(FilterActions.addMaxPriceToFilter).toHaveBeenCalledWith(1000);
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should dispatch action for remove maximum price from filter', () => {
    handleMaxChange({target:{value:'min'}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.removeMaxPriceFromFilter).toHaveBeenCalled();
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should render without price filter applied', () => {
    const storeWithoutFilters = {
      filter:{
        applied_filters: {}
      }
    }
    store = mockStore(storeWithoutFilters);
    const component = shallow(<Provider store={store}>
      <PriceContainer {...props} />
    </Provider>)
    expect(component.exists()).toBe(true);
  })
})
