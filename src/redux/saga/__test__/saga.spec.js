import { put } from 'redux-saga/effects';
import { getDBFull, getOne, addOne, deleteOne, editOne } from '../methods';
import {
  // failure,
  loadDataSuccess,
  loadOneRequestSuccess,
  deleteOneRequestSuccess,
  // deleteOneRequestFail,
} from '../../actions/index';
import { loadDataMock, loadOneRequestMock, addOneRequestDataMock, editOneRequestMock } from '../../mockData';
import rootSaga, {
  reloadDB,
  loadDataSaga,
  loadOneRequest,
  addOneRequest,
  deleteOneRequest,
  editOneRequest,
} from '../saga';

describe('SAGAS', () => {
  it('rootSaga has ALL type dispatch action', () => {
    const generator = rootSaga();
    expect(generator.next().value.type).toBe('ALL');
    generator.next();
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('success triggers reloadDB function" ', () => {
    const generator = reloadDB();
    const { data } = loadDataMock;
    expect(generator.next().value).toEqual(getDBFull());
    expect(generator.next(data).value).toEqual(put(loadDataSuccess(data)));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('success triggers loadDataSaga', () => {
    const generator = loadDataSaga();
    expect(generator.next().done).toBeFalsy();
    expect(generator.next().value).toEqual(reloadDB());
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  // loadDataSaga can't fail
  // it('failure triggers loadDataSaga', () => {\
  //   // loadDataSaga can't fail
  //   const generator = loadDataSaga();
  //   const err = 'Test err';
  //   expect(generator.next().done).toBeFalsy();
  //   expect(generator.next(err)).toEqual(put(failure(err)));
  //   expect(generator.next()).toEqual({ done: true, value: undefined });
  // });

  it('success triggers loadOneRequest', () => {
    const { id } = loadOneRequestMock;
    const { data } = loadOneRequestMock;
    const generator = loadOneRequest({ id });
    expect(generator.next().done).toBeFalsy();
    expect(generator.next(id).value).toEqual(getOne(id));
    expect(generator.next(data, id).value).toEqual(put(loadOneRequestSuccess(data, id)));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('success triggers addOneRequest', () => {
    const data = addOneRequestDataMock;
    const generator = addOneRequest({ data });
    expect(generator.next().done).toBeFalsy();
    expect(generator.next(data).value).toEqual(addOne(data));
    expect(generator.next().value).toEqual(reloadDB());
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('success triggers deleteOneRequest', () => {
    const data = addOneRequestDataMock;
    const deleteId = '2';
    const generator = deleteOneRequest({ deleteId });
    expect(generator.next().done).toBeFalsy();
    expect(generator.next(data).value).toEqual(deleteOne(deleteId));
    expect(generator.next().value).toEqual(reloadDB());
    expect(generator.next().value).toEqual(put(deleteOneRequestSuccess()));
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });

  it('success triggers editOneRequest', () => {
    const { id } = editOneRequestMock;
    const { data } = editOneRequestMock;
    const dataResponse = loadOneRequestMock.data;
    const generator = editOneRequest(editOneRequestMock);
    expect(generator.next().done).toBeFalsy();
    expect(generator.next(data, id).value).toEqual(editOne(data, id));
    expect(generator.next(dataResponse).value).toEqual(getOne(id));
    expect(generator.next(dataResponse, id).value).toEqual(put(loadOneRequestSuccess(dataResponse, id)));
    expect(generator.next().value).toEqual(reloadDB());
    expect(generator.next()).toEqual({ done: true, value: undefined });
  });
});
