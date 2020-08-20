import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as FilterActions from '../../actions/filterActions';
import * as ProductActions from '../../actions/productActions'

jest.mock('../../actions/filterActions');
jest.mock('../../actions/productActions');

import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import FiltersListingContainer from '../FiltersListingContainer';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const storeState = {
  filter:{
    filter_list: [
      {type:'BRAND', values:[]},
      {type:'COLOUR', values:[]},
      {type:'PRICE', values:[]}
    ],
    applied_filters: {}
  }
}

describe('Filter listing Container', () => {
  let store, wrapper;
  beforeEach(() => {
    store = mockStore(storeState);
    store.dispatch = jest.fn();

    wrapper = mount(<Provider store={store}>
      <FiltersListingContainer />
    </Provider>);
  })

  it('should render with props', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('should dispatch action for rest all filters', () => {
    const button = wrapper.find('button');
    button.simulate('click');
    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.resetAppliedFilter).toHaveBeenCalled();
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })
})