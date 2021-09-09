import fakeDB from './db.json';

const headerData = [
  {
    key: 'purpose',
    header: 'Purpose',
  },
  {
    key: 'firstName',
    header: 'First Name',
  },
];

const fullHeaderData = [
  {
    key: 'purpose',
    header: 'Purpose',
  },
  {
    key: 'firstName',
    header: 'First Name',
  },
  {
    key: 'lastName',
    header: 'Last Name',
  },
  {
    key: 'gender',
    header: 'Purpose',
  },
];
export default function createLoacalStorage() {
  const checkRowData = localStorage.getItem('rowData') ? null : localStorage.setItem('rowData', JSON.stringify(fakeDB));
  const checkHeaderData = localStorage.getItem('headerData')
    ? null
    : localStorage.setItem('headerData', JSON.stringify(headerData));
  const checkFullHeaderData = localStorage.getItem('fullHeader')
    ? null
    : localStorage.setItem('fullHeader', JSON.stringify(fullHeaderData));
  return { checkRowData, checkHeaderData, checkFullHeaderData };
}
