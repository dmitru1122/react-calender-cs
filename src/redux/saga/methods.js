import * as mockData from '../mockData';

const rowData = () => (localStorage?.rowData ? JSON.parse(localStorage?.rowData) : mockData.rowData);
const headerData = () => (localStorage?.headerData ? JSON.parse(localStorage?.headerData) : mockData.headerData);
const fullHeaderData = () =>
  localStorage?.fullHeader ? JSON.parse(localStorage?.fullHeader) : mockData.fullHeaderData;

export function filter(data, checkCompare) {
  const interalArray = [];
  let internalObject = {};

  data.forEach((item) => {
    checkCompare.forEach((checkVal) => {
      internalObject[checkVal.key] = item[checkVal.key];
    });
    internalObject.id = item.id;
    interalArray.push(internalObject);
    internalObject = {};
  });
  return interalArray;
}
export const getDBFull = () => {
  const resultWithFilter = filter(rowData(), headerData());
  return { rowData: resultWithFilter, headerData: headerData() };
};

export function returnOne(data, id) {
  const internalArr = data.filter((item) => (+item.id === +id ? item : null));
  return internalArr;
}

export const getOne = (id) => {
  const result = returnOne(rowData(), id);
  return { rowData: result, headerData: fullHeaderData() };
};

export const deleteOne = (id) => {
  const result = rowData().filter((item) => (+item.id !== +id ? item : null));
  localStorage.setItem('rowData', JSON.stringify(result));
};

export function editOne(data, id) {
  const resArr = rowData().map((item) => (+item.id === +id ? data : item));
  localStorage.setItem('rowData', JSON.stringify(resArr));
  //   return resArr;
}

export function addOne(data) {
  const lastIdNumber = rowData().length > 0 ? +rowData()[rowData().length - 1]?.id : 1;
  const internalData = { ...data, id: (+lastIdNumber + +1).toString() };
  const resArr = rowData();
  resArr.push(internalData);
  localStorage.setItem('rowData', JSON.stringify(resArr));
}
