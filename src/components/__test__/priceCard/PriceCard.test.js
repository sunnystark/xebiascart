import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import PriceCard from '../../priceCard/PriceCard';



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
  handleChange: jest.fn(),
  selectedMinMax:[-1, -1]
}

describe('Price card', () => { 
  it('should render', () => {
    const wrapper = shallow(<PriceCard {...props} />)
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').contains('Price')).toBe(true);
    expect(wrapper.find('PriceSelectionComponent').length).toBe(2);
  })
})