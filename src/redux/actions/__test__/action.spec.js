import * as actions from '../index';
import actionTypes from '../actionTypes';
import { addOneRequestDataMock, editOneRequestMock, loadDataMock, loadOneRequestMock } from '../../mockData';

describe('ACTIONS', () => {
  it('creates LOAD_DATA', () => {
    const expectedAction = {
      type: actionTypes.LOAD_DATA,
    };
    expect(actions.loadData()).toEqual(expectedAction);
  });

  it('creates LOAD_DATA_SUCCESS', () => {
    const expectedAction = {
      type: actionTypes.LOAD_DATA_SUCCESS,
      data: loadDataMock.data,
      id: loadDataMock.id,
    };
    expect(actions.loadDataSuccess(loadDataMock.data, loadDataMock.id)).toEqual(expectedAction);
  });

  it('creates FAILURE', () => {
    const expectedAction = {
      type: actionTypes.FAILURE,
      error: 'Error',
    };
    expect(actions.failure('Error')).toEqual(expectedAction);
  });

  it('creates ADD_ONE_REQUEST', () => {
    const expectedAction = {
      type: actionTypes.ADD_ONE_REQUEST,
      data: addOneRequestDataMock,
    };
    expect(actions.addOneRequest(addOneRequestDataMock)).toEqual(expectedAction);
  });

  it('creates LOAD_ONE_REQUEST', () => {
    const expectedAction = {
      type: actionTypes.LOAD_ONE_REQUEST,
      id: '100',
    };
    expect(actions.loadOneRequest('100')).toEqual(expectedAction);
  });

  it('creates LOAD_ONE_REQUEST_SUCCESS', () => {
    const expectedAction = {
      type: actionTypes.LOAD_ONE_REQUEST_SUCCESS,
      data: loadOneRequestMock.data,
      id: loadOneRequestMock.id,
    };
    expect(actions.loadOneRequestSuccess(loadOneRequestMock.data, loadOneRequestMock.id)).toEqual(expectedAction);
  });

  it('creates DELETE_ONE_REQUEST', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ONE_REQUEST,
      id: '100',
    };
    expect(actions.deleteOneRequest('100')).toEqual(expectedAction);
  });

  it('creates DELETE_ONE_REQUEST_RESET', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ONE_REQUEST_RESET,
    };
    expect(actions.deleteOneRequestReset()).toEqual(expectedAction);
  });

  it('creates DELETE_ONE_REQUEST_SUCCESS', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ONE_REQUEST_SUCCESS,
      id: '100',
    };
    expect(actions.deleteOneRequestSuccess('100')).toEqual(expectedAction);
  });

  it('creates DELETE_ONE_REQUEST_FAIL', () => {
    const expectedAction = {
      type: actionTypes.DELETE_ONE_REQUEST_FAIL,
    };
    expect(actions.deleteOneRequestFail()).toEqual(expectedAction);
  });

  it('creates EDIT_ONE_REQUEST', () => {
    const expectedAction = {
      type: actionTypes.EDIT_ONE_REQUEST,
      data: editOneRequestMock.data,
      id: editOneRequestMock.id,
    };
    expect(actions.editOneRequest(editOneRequestMock.data, editOneRequestMock.id)).toEqual(expectedAction);
  });
});
