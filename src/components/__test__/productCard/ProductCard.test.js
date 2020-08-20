import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

import ProductCard from '../../productCard/ProductCard';

const props = {
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
}


describe('Product Component', () => {
  it('should render as per provided props', () => {
    const wrapper = shallow(<ProductCard {...props} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.contains(props.price.final_price)).toBe(true);
    expect(wrapper.contains(props.title)).toBe(true);
    expect(wrapper.contains(props.brand)).toBe(true);
    expect(wrapper.find('ColorComponent')).toBeTruthy();
  })
})