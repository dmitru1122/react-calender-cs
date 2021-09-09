import PropTypes from 'prop-types';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { useGetOneRequest } from '../GetOneRequest';
import { initialState, loadOneRequestMock } from '../../redux/mockData';

const storeWithItem = { ...initialState, fullRequestInfo: { [loadOneRequestMock.id]: { ...loadOneRequestMock.data } } };

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

  it('should dispatch LOAD_ONE_REQUEST', () => {
    const spy = jest.spyOn(emptyStore, 'dispatch');
    setUp(emptyStore, { hook: () => useGetOneRequest() });
    expect(spy).toHaveBeenCalled();
  });

  it('should return value', () => {
    const spy = jest.spyOn(store, 'dispatch');
    const wrapper = setUp(store, { hook: () => useGetOneRequest(2) });
    const { hook } = wrapper.find('div').props();
    expect(spy).not.toHaveBeenCalled();
    expect(hook).toEqual(loadOneRequestMock.data);
  });
});
