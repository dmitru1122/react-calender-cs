import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useGetRequestData } from '../GetListRequests';
import { initialState, headerData, rowData } from '../../redux/mockData';

const storeWithItem = { ...initialState, requestData: { ...initialState.requestData } };
storeWithItem.requestData.headerData = headerData;
storeWithItem.requestData.rowData = rowData;

function HookWrapper(props) {
  const { hook } = props;
  const data = hook();
  return <div hook={data} />;
}
HookWrapper.propTypes = {
  hook: PropTypes.func,
};
HookWrapper.defaultProps = {
  hook: null,
};

const setUp = (store, props) =>
  mount(
    <Provider store={store}>
      <HookWrapper {...props} />
    </Provider>,
  );

describe('useGetRequestData', () => {
  const mockStore = configureStore();
  const store = mockStore(storeWithItem);
  const emptyStore = mockStore(initialState);

  it('should dispatch LOAD_DATA', () => {
    const spy = jest.spyOn(emptyStore, 'dispatch');
    setUp(emptyStore, { hook: () => useGetRequestData() });
    expect(spy).toHaveBeenCalled();
  });

  it('should return value', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const wrapper = setUp(store, { hook: () => useGetRequestData() });
    const { hook } = wrapper.find('div').props();
    expect(spy).not.toHaveBeenCalled();
    expect(hook.headerData).toEqual(headerData);
    expect(hook.rowData).toEqual(rowData);
  });
});
