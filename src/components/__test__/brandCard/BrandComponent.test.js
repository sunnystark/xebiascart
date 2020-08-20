import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import BrandComponent from '../../brandCard/BrandComponent';

const props = {
  handleChange: jest.fn(),
  value:'1 Can',
  selected: false,
  title:'1 Can'
}

describe('Brand Component', () => {
  it('should render as per provided props', () => {
    const wrapper = shallow(<BrandComponent {...props} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(props.title)).toEqual(true);
    let input = wrapper.find('input')
    expect(input.props().id).toEqual(props.value);
    input.simulate('change', {
      target: {value: !props.selected} 
    })

    expect(props.handleChange).toHaveBeenCalled();
    expect(props.handleChange).toHaveBeenCalledWith({target:{value:true}})
  })
})