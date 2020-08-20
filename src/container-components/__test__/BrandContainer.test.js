import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as FilterActions from '../../actions/filterActions';
import * as ProductActions from '../../actions/productActions'

jest.mock('../../actions/filterActions');
jest.mock('../../actions/productActions');

import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import BrandContainer from '../BrandContainer';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const storeState = {
  filter:{
    applied_filters: {
      brand:['puma']
    }
  }
}

const props = {
  values:[
    {title: "GKM Trend", value: "gkm trend"},
    {title: "Glamour", value: "glamour"},
    {title: "GLISTEN", value: "glisten"},
    {title: "Glow", value: "glow"},
    {title: "GO", value: "go"}
  ],
}

describe('Brand container', () => {
  let store, wrapper, brandCard, handleChange;

  beforeEach(() =>{
    store = mockStore(storeState);
    store.dispatch = jest.fn();

    wrapper = mount(<Provider store={store}>
      <BrandContainer {...props} />
    </Provider>);
    brandCard = wrapper.find('BrandCard');
    handleChange = brandCard.props().handleChange;
  })

  it('should render with props', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('should dispatch action for add brand to filter', () => {
    handleChange({target:{id:'go', checked:true}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.addBrandToFilter).toHaveBeenCalled();
    expect(FilterActions.addBrandToFilter).toHaveBeenCalledWith('go');
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should dispatch action for remove brand from filter', () => {
    handleChange({target:{id:'go', checked:false}});

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.removeBrandFromFilter).toHaveBeenCalled();
    expect(FilterActions.removeBrandFromFilter).toHaveBeenCalledWith('go');
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should render without brand filter applied', () => {
    const storeWithoutFilters = {
      filter:{
        applied_filters: {}
      }
    }
    store = mockStore(storeWithoutFilters);
    const component = shallow(<Provider store={store}>
      <BrandContainer {...props} />
    </Provider>)
    expect(component.exists()).toBe(true);
  })
})
