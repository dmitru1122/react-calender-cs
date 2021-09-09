import React from 'react';
import { shallow } from 'enzyme';
import Spinner from './Spinner';

const wrapped = shallow(<Spinner />);
describe('Spinner', () => {
  it('should contain .spinner-border', () => {
    expect(wrapped.find('.spinner-border').length).toBe(1);
  });
  it('should have hidden text', () => {
    expect(wrapped.find('.visually-hidden').text()).toEqual('Loading...');
  });
});
