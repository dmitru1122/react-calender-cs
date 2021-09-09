import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('renders component without crashing', () => {
    shallow(<Header />);
  });
  it('render correct title', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('.header__title').text()).toBe('Admin panel');
  });
});
