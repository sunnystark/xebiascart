import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductListingContainer from '../ProductListingContainer';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const storeState = {
  product_list:['product_1', 'product_2'],
  filterable_product_list:{
    filterable_products:{
      product_1:{
        brand: "peter england pe",
        colour: {color: "#00AF33", title: "Green"},
        color: "#00AF33",
        title: "Green",
        discount: 0,
        id: "product_1",
        image: "image.jpg",
        price: {final_price: 2399},
        final_price: 2399,
        rating: 3.8,
        title: "Running Shoes For Men"
      },
      product_2:{
        brand: "peter england pe",
        colour: {color: "#00AF33", title: "Green"},
        color: "#00AF33",
        title: "Green",
        discount: 0,
        id: "product_2",
        image: "image2.jpg",
        price: {final_price: 2399},
        final_price: 4000,
        rating: 3.8,
        title: "Running Shoes For Men"
      }
    },
    products_searchable_criteria:{}
  },
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
      <ProductListingContainer />
    </Provider>);
  })

  it('should render with two product', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('ProductCard').length).toBe(2);
  })
});