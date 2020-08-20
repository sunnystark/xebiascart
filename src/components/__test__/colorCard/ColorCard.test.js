import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import ColorCard from '../../colorCard/ColorCard';

const props = {
  values:[
    {color:'#00ff00', title:'color1'},
    {color:'#00ffff', title:'color2'},
    {color:'#ffff00', title:'color3'},
    {color:'#ffffff', title:'color4'},
    {color:'#ff0000', title:'color5'}
  ],
  handleAddColor: jest.fn(),
  handleRemoveColor: jest.fn(),
  selectedColors:['#00ffff']
}

describe('Brand card', () => { 
  it('should render', () => {
    const wrapper = shallow(<ColorCard {...props} />)
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('h3').contains('Color')).toBe(true);
    
    expect(wrapper.find('ColorComponent').length).toBe(5);

    expect(wrapper.find('ColorComponent').get(0).props.selected).toBe(false);
    expect(wrapper.find('ColorComponent').get(1).props.selected).toBe(true);
  })
})