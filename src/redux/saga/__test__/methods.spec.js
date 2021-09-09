import { filter, getDBFull, returnOne, getOne } from '../methods';
import { rowData, rowDataAfterFilter, headerData, fullHeaderData } from '../../mockData';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;
describe('methods', () => {
  it('check filter function, should return the filtered data', () => {
    expect(filter(rowData, headerData)).toEqual(rowDataAfterFilter);
  });

  it('should return filtered data from dataBase - getDBFull', () => {
    const expectedData = { rowData: rowDataAfterFilter, headerData };
    expect(getDBFull()).toEqual(expectedData);
  });

  it('should filter array compare id - returnOne', () => {
    expect(returnOne(rowData, '2')).toEqual(rowData);
  });
  it('should return oneRequest from dataBase - getOne', () => {
    expect(getOne('2')).toEqual({ rowData, headerData: fullHeaderData });
  });
});
