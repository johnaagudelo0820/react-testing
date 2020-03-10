import React from 'react';
import { mount } from 'enzyme';
import Counter from '../components/Counter';

describe('<Counter />', () => {
  it('shoult update component', () => {
    const wrapper = mount(<Counter />);
    const autocomplete = wrapper.find('input');
    console.log(autocomplete.debug());
    autocomplete.simulate('change', { target: { value: 'The Shawshank Redemption' }});
    wrapper.update();
    expect(wrapper.find('p').text()).toEqual('The Shawshank Redemption');
  });
});