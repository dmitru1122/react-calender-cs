export const initialState = {
  error: null,
  lastUpdate: 0,
  requestData: { headerData: null, rowData: null },
  deleteRequestStatus: 'waiting',
  fullRequestInfo: {},
  placeholderData: null,
};

export const rowData = [{ firstName: 'Vit', gender: 'male', id: '2', lastName: 'vab', purpose: 'Job proposition' }];
export const rowDataAfterFilter = [{ firstName: 'Vit', id: '2', purpose: 'Job proposition' }];
export const headerData = [
  { key: 'purpose', header: 'Purpose' },
  { key: 'firstName', header: 'First Name' },
];
export const fullHeaderData = [
  { key: 'purpose', header: 'Purpose' },
  { key: 'firstName', header: 'First Name' },
  { key: 'lastName', header: 'Last Name' },
  { key: 'gender', header: 'Purpose' },
];

export const failureMock = {
  data: {
    headerData,
    rowData: rowDataAfterFilter,
  },
  id: '2',
};

export const loadDataMock = {
  data: {
    headerData,
    rowData,
  },
  id: '2',
};
export const loadOneRequestMock = {
  data: {
    headerData: fullHeaderData,
    rowData,
  },
  id: '2',
};
export const loadSecondOneRequestMock = {
  data: {
    headerData: fullHeaderData,
    rowData: [{ firstName: 'Dima', gender: 'male', id: '3', lastName: 'Pashkevich', purpose: 'Job proposition' }],
  },
  id: '3',
};

export const addOneRequestDataMock = rowData;
//  {
//   firstName: 'Inna',
//   gender: 'male',
//   id: '',
//   lastName: 'test',
//   purpose: 'Job proposition',
// };

export const editOneRequestMock = {
  data: rowData,
  id: '2',
};
