import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import PriceSelectionComponent from '../../priceCard/PriceSelectionComponent';

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
  handleChange: jest.fn()
}


describe('Price Component', () => {
  it('should render as per provided props', () => {
    const wrapper = shallow(<PriceSelectionComponent {...props} />);
    expect(wrapper.exists()).toBe(true);


  })

  it('should call handler function on price change', () => {
    const wrapper = shallow(<PriceSelectionComponent {...props} />);
    expect(wrapper.find('option').length).toBe(8)

    const select = wrapper.find('select');
    const eventObject = { target:{value:'1000'} }
    select.simulate('change', eventObject)
    expect(props.handleChange).toHaveBeenCalled();
    expect(props.handleChange).toHaveBeenCalledWith(eventObject);

  })
})