import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Spinner from '../../../spinner-cs/Spinner';
import Table from '../../../table/Table';
import Request from '../Request';
import ReturnToListButton from '../../../buttons/LinkButton';
import { initialState, loadOneRequestMock } from '../../../../redux/mockData';
import { useGetOneRequest } from '../../../../cusom-hooks/GetOneRequest';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '2' }),
}));

jest.mock('../../../../cusom-hooks/GetOneRequest');

const setUp = (store) =>
  mount(
    <Provider store={store}>
      <Request />
    </Provider>,
  );

const fullRequestInfo = loadOneRequestMock;

describe('Reqest Page', () => {
  const mockStore = configureStore();
  const store = mockStore(initialState);
  let component;

  describe('loading', () => {
    beforeEach(() => {
      component = setUp(store);
    });

    it('should render cases Reqest page', () => {
      expect(component).toMatchSnapshot();
    });

    it('should render request without crashing', () => {
      expect(component).toBeTruthy();
    });

    it('should render ReturnToListButton', () => {
      const element = <ReturnToListButton />;
      expect(component.contains(element)).toBeTruthy();
    });

    it('should render spinner', () => {
      const element = <Spinner />;
      expect(component.contains(element)).toBeTruthy();
    });
  });

  it('should render Table', () => {
    const element = <Table headerData={fullRequestInfo.data.headerData} rowData={fullRequestInfo.data.rowData} />;

    useGetOneRequest.mockReturnValue({
      headerData: fullRequestInfo.data.headerData,
      rowData: fullRequestInfo.data.rowData,
    });
    const wrapper = setUp(store);
    expect(wrapper.contains(element)).toBeTruthy();
  });
});
