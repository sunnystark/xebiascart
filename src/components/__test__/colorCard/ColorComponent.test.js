import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import ColorComponent from '../../colorCard/ColorComponent';


const props = {
  handleRemoveColor: jest.fn(),
  handleAddColor: jest.fn(),
  color:'#00ff00',
  selected: false,
  title:'green'
}

describe('Color Component', () => {
  it('should render as per provided props', () => {
    const wrapper = shallow(<ColorComponent {...props} />);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(props.title)).toEqual(true);
  })

  it('should not call add or remove color method if no event require', () => {
    let customProps = {...props, noEvent:true};
    const wrapper = shallow(<ColorComponent {...customProps} />);

    let button = wrapper.find('button')
    button.simulate('click')
    expect(props.handleAddColor).not.toHaveBeenCalled();
    expect(props.handleRemoveColor).not.toHaveBeenCalled();
  })

  it('should call add color method', () => {
    const wrapper = shallow(<ColorComponent {...props} />);

    let button = wrapper.find('button')
    button.simulate('click')
    expect(props.handleAddColor).toHaveBeenCalled();
    expect(props.handleAddColor).toHaveBeenCalledWith(props.color)
  });

  it('should call remove color method if color already selected', () => {
    props.selected = true;
    const wrapper = shallow(<ColorComponent {...props} />);

    let button = wrapper.find('button')
    button.simulate('click')
    expect(props.handleRemoveColor).toHaveBeenCalled();
    expect(props.handleRemoveColor).toHaveBeenCalledWith(props.color)
  })
})