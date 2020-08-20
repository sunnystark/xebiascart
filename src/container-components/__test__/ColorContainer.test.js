import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

import * as FilterActions from '../../actions/filterActions';
import * as ProductActions from '../../actions/productActions'

jest.mock('../../actions/filterActions');
jest.mock('../../actions/productActions');

import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ColorContainer from '../ColorContainer';

Enzyme.configure({adapter: new Adapter()});

const mockStore = configureStore([]);

const storeState = {
  filter:{
    applied_filters: {
      color:['puma']
    }
  }
}

const props = {
  values:[
    {color:'#00ff00', title:'color1'},
    {color:'#00ffff', title:'color2'},
    {color:'#ffff00', title:'color3'},
    {color:'#ffffff', title:'color4'},
    {color:'#ff0000', title:'color5'}
  ],
}

describe('Color container', () => {
  let store, wrapper, colorCard, handleAddColor, handleRemoveColor;
  beforeEach(() =>{
    store = mockStore(storeState);
    store.dispatch = jest.fn();

    wrapper = mount(<Provider store={store}>
      <ColorContainer {...props} />
    </Provider>);
    colorCard = wrapper.find('ColorCard');
    handleAddColor = colorCard.props().handleAddColor;
    handleRemoveColor = colorCard.props().handleRemoveColor;
  })
  it('should render with props', () => {
    expect(wrapper.exists()).toBe(true);
  })

  it('should dispatch action for add color to filter', () => {
    let color = '#00ff00'
    handleAddColor(color);

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.addColorToFilter).toHaveBeenCalled();
    expect(FilterActions.addColorToFilter).toHaveBeenCalledWith(color);
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should dispatch action for remove color from filter', () => {
    let color = '#00ff00'
    handleRemoveColor(color);

    expect(store.dispatch).toHaveBeenCalled();
    expect(FilterActions.removeColorFromFilter).toHaveBeenCalled();
    expect(FilterActions.removeColorFromFilter).toHaveBeenCalledWith(color);
    expect(ProductActions.filterProductList).toHaveBeenCalled();
  })

  it('should render without color filter applied', () => {
    const storeWithoutFilters = {
      filter:{
        applied_filters: {}
      }
    }
    store = mockStore(storeWithoutFilters);
    const component = shallow(<Provider store={store}>
      <ColorContainer {...props} />
    </Provider>)
    expect(component.exists()).toBe(true);
  })
})
