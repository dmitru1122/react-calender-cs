import React from 'react';
import { shallow } from 'enzyme';
import App from '../../views/App';
import Root from '../Root';
import createReduxStore from '../../redux/store/index';

describe('Root', () => {
  const store = createReduxStore;
  const wrapper = shallow(<Root store={store} />);

  describe('renders', () => {
    it('App', () => {
      const element = <App />;
      expect(wrapper.contains(element)).toEqual(true);
    });
  });

  describe('properties', () => {
    it('store', () => expect(wrapper.props().store).toEqual(store));
  });
});
