import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import BrandCard from '../../brandCard/BrandCard';



const props = {
  values:[
    {title: "GKM Trend", value: "gkm trend"},
    {title: "Glamour", value: "glamour"},
    {title: "GLISTEN", value: "glisten"},
    {title: "Glow", value: "glow"},
    {title: "GO", value: "go"}
  ],
  handleChange: jest.fn(),
  selectedBrands:['glamour']
}

describe('Brand card', () => { 
  it('should render', () => {
    const wrapper = shallow(<BrandCard {...props} />)
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').contains('Brand')).toBe(true);
    expect(wrapper.find('BrandComponent').length).toBe(5);

    expect(wrapper.find('BrandComponent').get(0).props.selected).toBe(false);
    expect(wrapper.find('BrandComponent').get(1).props.selected).toBe(true);
  })
})