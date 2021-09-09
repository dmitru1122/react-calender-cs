import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { headerData, rowData, initialState } from '../../../redux/mockData';
import Table from '../Table';

const setUp = (store, props) =>
  mount(
    <Provider store={store}>
      <Table {...props} />
    </Provider>,
  );

const props = {
  headerData,
  rowData,
};

describe('Table ', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let component;

  describe('loading', () => {
    beforeEach(() => {
      component = setUp(store, props).find('TableRequests');
    });

    it('should render Table', () => {
      expect(component).toMatchSnapshot();
    });

    it('should render Table without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('should get props', () => {
      expect(component.prop('headerData')).toBe(props.headerData);
      expect(component.prop('rowData')).toBe(props.rowData);
    });

    it('should render Modal', () => {
      expect(component.find('Modal')).toBeTruthy();
    });
  });
});
