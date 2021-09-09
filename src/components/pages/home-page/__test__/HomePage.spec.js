import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import HomePage from '../HomePage';
import Spinner from '../../../spinner-cs/Spinner';
import Table from '../../../table/Table';
import { useGetRequestData } from '../../../../cusom-hooks/GetListRequests';
import { headerData, rowData } from '../../../../redux/mockData';

jest.mock('../../../../cusom-hooks/GetListRequests');

const setUp = (store) =>
  mount(
    <Provider store={store}>
      <HomePage />
    </Provider>,
  );

describe('HomePage', () => {
  const initialState = { output: 10 };
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let component;

  describe('loading', () => {
    beforeEach(() => {
      component = setUp(store);
    });

    it('should render component without crashing', () => {
      expect(component).toMatchSnapshot();
    });
    it('should render spinner ', () => {
      const element = <Spinner />;
      expect(component.contains(element)).toEqual(true);
    });
  });
  it('should render Table ', () => {
    useGetRequestData.mockReturnValue({ headerData, rowData });
    const wrapper = mount(
      <Provider store={store}>
        <HomePage />
      </Provider>,
    );

    const element = <Table headerData={headerData} rowData={rowData} />;
    expect(wrapper.contains(element)).toEqual(true);
  });
});
