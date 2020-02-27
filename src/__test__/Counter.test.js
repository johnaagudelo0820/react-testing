import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Counter from '../components/Counter';

describe('<Counter />', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation((init) => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<Counter />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render without errors', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
  })

  it('calls setCount with count + 1', () => {
    const autocomplete = wrapper.find('button[aria-label="Open"]');
    console.log(autocomplete.debug());
    autocomplete.simulate('click', { target: { name: 'tags', value: 'Toy Story' }});
    wrapper.update();
    console.log(wrapper.debug());
    // expect(wrapper.find('p').text()).toBe("1");
  });
});