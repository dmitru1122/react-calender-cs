import reducer from '../allReducer';
import { loadDataMock, initialState, loadOneRequestMock, loadSecondOneRequestMock } from '../../mockData';
import * as actions from '../../actions/index';

describe('REDUCER', () => {
  it('should return the initial state', () => {
    const newState = reducer(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it('should handle "FAILURE" action', () => {
    const mockData = {
      error: 'test error',
      lastUpdate: 0,
      requestData: { headerData: null, rowData: null },
      deleteRequestStatus: 'waiting',
      fullRequestInfo: {},
      placeholderData: null,
      sendDataSuccess: undefined,
    };
    const action = actions.failure('test error');
    const newState = reducer(initialState, action);
    expect(newState).toEqual(mockData);
  });

  it('should handle "LOAD_DATA_SUCCESS" action', () => {
    const mockData = { headerData: loadDataMock.data.headerData, rowData: loadDataMock.data.rowData };
    const action = actions.loadDataSuccess(loadDataMock.data, loadDataMock.id);
    const newState = reducer(initialState, action);
    expect(newState.requestData).toEqual(mockData);
  });

  it('should handle "LOAD_ONE_REQUEST_SUCCESS" action', () => {
    const mockData = {
      fullRequestInfo: {
        [loadOneRequestMock.id]: {
          headerData: loadOneRequestMock.data.headerData,
          rowData: loadOneRequestMock.data.rowData,
        },
      },
    };
    const action = actions.loadOneRequestSuccess(loadOneRequestMock.data, loadOneRequestMock.id);
    const newState = reducer(initialState, action);
    expect(newState.fullRequestInfo).toEqual(mockData.fullRequestInfo);
  });

  it('should handle "LOAD_ONE_REQUEST_SUCCESS" action second time', () => {
    const mockData = {
      fullRequestInfo: {
        [loadOneRequestMock.id]: {
          headerData: loadOneRequestMock.data.headerData,
          rowData: loadOneRequestMock.data.rowData,
        },
        [loadSecondOneRequestMock.id]: {
          headerData: loadSecondOneRequestMock.data.headerData,
          rowData: loadSecondOneRequestMock.data.rowData,
        },
      },
    };
    const action = actions.loadOneRequestSuccess(loadOneRequestMock.data, loadOneRequestMock.id);
    const secondAction = actions.loadOneRequestSuccess(loadSecondOneRequestMock.data, loadSecondOneRequestMock.id);
    const stateFirstAction = reducer(initialState, action);
    const stateSecondAction = reducer(stateFirstAction, secondAction);
    expect(stateSecondAction.fullRequestInfo).toEqual(mockData.fullRequestInfo);
  });

  it('should handle "DELETE_ONE_REQUEST_SUCCESS" action', () => {
    const mockData = {
      deleteRequestStatus: 'resolve',
    };
    const action = actions.deleteOneRequestSuccess();
    const newState = reducer(initialState, action);
    expect(newState.deleteRequestStatus).toEqual(mockData.deleteRequestStatus);
  });

  it('should handle "DELETE_ONE_REQUEST_FAIL" action', () => {
    const mockData = {
      deleteRequestStatus: 'reject',
    };
    const action = actions.deleteOneRequestFail();
    const newState = reducer(initialState, action);
    expect(newState.deleteRequestStatus).toEqual(mockData.deleteRequestStatus);
  });

  it('should handle "DELETE_ONE_REQUEST_RESET" action', () => {
    const mockData = {
      deleteRequestStatus: 'waiting',
    };
    const action = actions.deleteOneRequestReset();
    const newState = reducer(initialState, action);
    expect(newState.deleteRequestStatus).toEqual(mockData.deleteRequestStatus);
  });
});
